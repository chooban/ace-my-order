import * as cheerio from 'cheerio'
import fs from 'fs/promises'
import path from 'path'

async function ensureDirectoryExists(dirname) {
  await fs.mkdir(dirname, { recursive: true })
}

export const sourceNodes = async ({ actions, createContentDigest, createNodeId }, { savepath }) => {
  const { createNode } = actions

  console.log('Source Lunar data')
  await ensureDirectoryExists(savepath)
  
  const fetchAndParse = async (targetUrl) => {
    const pageText = await fetch(targetUrl, { method: 'GET', redirect: 'follow' })
      .then((response) => {
        if (response.ok) {
          return response.text()
        }

        if (response.status === 404) {
          console.log('Failed to fetch', targetUrl)
          throw new Error('Item not found')
        }
        throw new Error('Error')
      })
      
    const $ = cheerio.load(pageText)

    const books = $('.productdetail[data-foc]')
    console.log(`Found ${books.length} books`)
    
    for (let i = 0; i < books.length; i++) {
      const document = $(books[i])
      const id = document.data('code')
      const fileName = path.join(savepath, `${id}.html`)
      await fs.writeFile(fileName, document.parent().html())
      
      const coverImage = document.data("img").replace('hires/', '')
      const title = document.data("title")
      const creators = document.data("creators").trim().replace(/\s\s+/g, ' ')
      const description = document.data("desc")
      const isMature = title.includes('(MR)')
      
      createNode({
          coverThumbnail: coverImage,
          title,
          creators,
          description,
          isMature,
          internal: {
            type: 'LunarItem',
            contentDigest: createContentDigest(description)
          },
          id: createNodeId(`${id}`)
      })
    }
    
    const nextLink = $('.datenav .focdate:not(:has(~ .focdate))')
    const dateParts = nextLink.data('val').split('/')
    const maybeIsoDate = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`
    console.log(`Attempting to parse ${maybeIsoDate}`)
    const nextCutoffDate = new Date(Date.parse(maybeIsoDate))

    return nextCutoffDate
  }
  
  const baseUrl = 'https://www.lunardistribution.com/'
  const parsingCutoffDate = new Date()
  parsingCutoffDate.setDate(parsingCutoffDate.getDate() + 60)

  let nextCutoffDate = await fetchAndParse(baseUrl)
  console.log({ nextCutoffDate, parsingCutoffDate })
  console.log(nextCutoffDate < parsingCutoffDate)

  while (nextCutoffDate < parsingCutoffDate) {
    const url = baseUrl + '?foc=' + nextCutoffDate.toLocaleString("en-US")
    nextCutoffDate = await fetchAndParse(url)
    console.log(`Next cutoff date is ${nextCutoffDate.toLocaleDateString('en-US')}`)
    if (nextCutoffDate < parsingCutoffDate) {
      console.log('I should go on')
    } else {
      console.log(`${nextCutoffDate.toLocaleString('en-US')} > ${parsingCutoffDate.toLocaleDateString('en-US')}`)
    }
  }
  
  console.log('Finished fetching Lunar data')
}
