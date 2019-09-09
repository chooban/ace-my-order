import { Handler, APIGatewayEvent } from 'aws-lambda'
import fetch from 'node-fetch'
import cheerio from 'cheerio'
import sharp from 'sharp'

import { previewsCodeToUrl } from './lib/previews-code-to-url'

const cache = new Map<string, string>()

async function getCoverDetails(issueNumber: number, itemNumber: string) {
  const { url, urlPrefix } = previewsCodeToUrl(issueNumber, itemNumber)
  const cacheKey = `${issueNumber}:${itemNumber}`

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  const details = await fetch(url)
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
        return false
      }

      const coverImage = urlPrefix + $('img#MainContentImage').attr('src')
      return {
        coverImage
      }
    })

  if (details === false ) {
    return null
  }
  return fetch(details.coverImage)
    .then(res => res.buffer())
    .then((buffer) => {
      return sharp(buffer)
        .resize(500, 1000, { fit: sharp.fit.outside})
        .webp()
        .toBuffer()
    })
    .then(webpBuffer => "data:image/webp;base64," + webpBuffer.toString('base64'))
    .then(data => {
      cache.set(cacheKey, data)
      return data
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
    const coverDetails = await getCoverDetails(parseInt(issueNumber, 10), itemNumber)

    if (!coverDetails) {
      return {
        statusCode: 404
      }
    }
    return {
      body: JSON.stringify(coverDetails),
      headers: { 'Content-Type': 'image/webp' },
      statusCode: 200
    }

  } catch (e) {
    console.error('Error retrieving cover', { e })
    return {
      body: JSON.stringify(e.description),
      statusCode: 404
    }
  }

}

export { handler }
