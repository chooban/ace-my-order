import { APIGatewayEvent, Handler } from 'aws-lambda'
import cheerio from 'cheerio'
import fetch from 'node-fetch'

import { previewsCodeToUrl } from './lib/previews-code-to-url'

/**
 * @param issueNumber Issue number as it appears in a Previews Code
 * @param itemNumber Item number, with leading zeroes.
 */
async function getItemInformation(issueNumber: number, itemNumber: string) {
  const { url, urlPrefix } = previewsCodeToUrl(issueNumber, itemNumber)
  console.log(`Fetching ${url}`)
  return fetch(url, { method: 'GET', redirect: 'follow' })
    .then((response) => {
      if (response.ok) {
        console.log({ redirected: response.redirected, url: response.url })
        return response.text()
      }

      if (response.status === 404) {
        throw new Error('Item not found')
      } else {
        throw new Error('Error')
      }
    })
    .then((text) => {
      const $ = cheerio.load(text)

      const pageTitle = $('div.pageTitle').text()
      if (pageTitle === 'Item Not Found') {
        return {
          statusCode: 404
        }
      }
      const coverImage = urlPrefix + $('img#MainContentImage').attr('src')

      const node = $('.CatalogFullDetail .Text')
      const children = node.contents().filter((i, el) => (
        el.type === 'text' || (el.type === 'tag' && el.tagName === 'br')
      ))
      const description = children.toString().trim()
      const creators = node.children('.Creators')
        .text()
        .trim()
        .replace(/\s\s+/g, ' ')

      const coverImageURL = coverImage.substr(0, coverImage.lastIndexOf('?'))
      return {
        url: previewsCodeToUrl(issueNumber, itemNumber),
        description,
        creators,
        coverImage: coverImageURL,
        coverThumbnail: coverImageURL.replace('CatalogImage', 'CatalogThumbnail')
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
}

const handler: Handler = async(event: APIGatewayEvent) => {
  if (!(event.queryStringParameters && event.queryStringParameters.code)) {
    return {
      statusCode: 400
    }
  }

  const [ issueNumber, itemNumber ] = event.queryStringParameters.code.split('/')

  try {
    const details = await getItemInformation(parseInt(issueNumber, 10), itemNumber)

    if (details.statusCode === 404) {
      return {
        body: '',
        statusCode: 404
      }
    }
    return {
      body: JSON.stringify(details),
      headers: { 'Content-Type': 'application/json' },
      statusCode: 200
    }
  } catch (e) {
    console.error('Error retrieving Previews info', { e })
    return {
      body: JSON.stringify(e.description),
      statusCode: 404
    }
  }
}

export { handler }
