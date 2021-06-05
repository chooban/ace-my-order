require('dotenv').config()

/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const workerPool = require('workerpool')
/* eslint-enable */

function ensureDirectoryExists(dirname) {
  console.log(`Checking for ${dirname}`)
  if (fs.existsSync(dirname)) {
    return true
  }
  console.log(`Creating ${dirname}`)
  fs.mkdirSync(dirname, { recursive: true })
}

function parsePreviewsData(id, itemText) {
  if (!itemText) {
    console.log(`No data for ${id}`)
    return null
  }
  try {
    const $ = cheerio.load(itemText)

    const urlPrefix = 'https://www.previewsworld.com'
    const coverImage = urlPrefix + $('img#MainContentImage').attr('src')
    const lastParamIndex = coverImage.lastIndexOf('?')
    const coverImageURL = coverImage.substr(0, lastParamIndex < 0 ? coverImage.length : lastParamIndex)
    const pageTitle = $('div.Title').text()
    const node = $('.CatalogFullDetail .Text')
    const children = node.contents().filter((_i, el) => (
      el.type === 'text' || (el.type === 'tag' && el.tagName === 'br')
    ))
    const description = children.toString().trim()
    const creators = node.children('.Creators')
      .text()
      .trim()
      .replace(/\s\s+/g, ' ')

    return {
      id,
      coverThumbnail: coverImageURL.replace('MainImage', 'CatalogThumbnail').replace(/\.[^/.]+$/, ''),
      title: pageTitle,
      description,
      creators
    }
  } catch (e) {
    console.error(`Error parsing document for ${id}`, e)
  }
}

exports.sourceNodes = async ({ actions, createContentDigest }, { savepath, catalogueId }) => {
  ensureDirectoryExists(savepath)

  const { createNode } = actions

  const sourceUrl = `https://www.previewsworld.com/Catalog?mode=OrderForm&batch=${catalogueId}`

  console.log('Downloading', sourceUrl)
  const catalogueIds = await fetch(sourceUrl, { method: 'GET', redirect: 'follow' })
    .then((response) => {
      if (response.ok) {
        return response.text()
      }

      if (response.status === 404) {
        console.log('Failed to fetch', sourceUrl)
        throw new Error('Item not found')
      }
      throw new Error('Error')
    })
    .then(async (text) => {
      const $ = cheerio.load(text)

      return $('td.dmdNo').find('a').map(function () {
        return $(this).text()
      }).toArray()
    })

  const pool = workerPool.pool(__dirname + '/fetcher.js')

  const catalogueFetches = catalogueIds.map(id => {
    const fileName = path.join(savepath, `${id}.html`)
    // console.log('Processing', id, fileName)
    return pool.exec('fetchPreviews', [id, fileName])
  })

  const monitorInterval = setInterval(() => {
    console.log(pool.stats())
  }, 5000)

  let i = 0
  return Promise.all(catalogueFetches)
    .then(datum => {
      datum.forEach(data => {
        const nodeContents = parsePreviewsData(data.id, data.itemText)
        if (nodeContents) {
          createNode({
            ...nodeContents,
            internal: {
              type: 'PreviewsItem',
              contentDigest: createContentDigest(nodeContents.description)
            }
          })
        } else {
          console.log(`No document for ${data.id}`)
        }
      })
    })
    .then(() => {
      clearInterval(monitorInterval)
      pool.terminate()
    })
}

