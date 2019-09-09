import { Handler, APIGatewayEvent } from 'aws-lambda'
import fetch from 'node-fetch'
import cheerio from 'cheerio'

const urlPrefix = 'https://www.previewsworld.com'
function previewsCodeToUrl(issue: number, item: string) {
  const MonthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ]
  const epoch = new Date(1988, 8, 1)
  epoch.setMonth(epoch.getMonth() + issue)

  const slug = MonthNames[epoch.getMonth()] + (epoch.getFullYear() - 2000) + item
  return `${urlPrefix}/Catalog/${slug}`
}

/**
 * @param issueNumber Issue number as it appears in a Previews Code
 * @param itemNumber Item number, with leading zeroes.
 */
async function getItemInformation(issueNumber: number, itemNumber: string) {
  return fetch(previewsCodeToUrl(issueNumber, itemNumber))
    .then((response) => {
      if (response.ok) {
        return response
      }
      else if (response.status === 404) {
        throw new Error('Item not found')
      } else {
        throw new Error('Error')
      }
    })
    .then((response) => response.text())
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

      return {
        statusCode: 200,
        url: previewsCodeToUrl(issueNumber, itemNumber),
        description,
        creators,
        coverImage
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
