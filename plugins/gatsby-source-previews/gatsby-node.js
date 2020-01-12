const fetch = require('node-fetch')
const sourceUrl = 'https://www.previewsworld.com/Catalog?mode=OrderForm'
const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const asyncFileExists = promisify(fs.exists)
const asyncFileRead = promisify(fs.readFile)
const asyncFileWrite = promisify(fs.writeFile)

const urlPrefix = 'https://www.previewsworld.com'

function ensureDirectoryExists(dirname) {
  console.log(`Checking for ${dirname}`)
  if (fs.existsSync(dirname)) {
    return true
  }
  console.log(`Creating ${dirname}`)
  fs.mkdirSync(dirname, { recursive: true })
}

function parsePreviewsData(itemText) {
  const $ = cheerio.load(itemText)

  const coverImage = urlPrefix + $('img#MainContentImage').attr('src')
  const coverImageURL = coverImage.substr(0, coverImage.lastIndexOf('?'))

  const pageTitle = $('div.pageTitle').text()
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
    coverImageURL,
    title: pageTitle,
    description,
    creators
  }
}

function timerify(fn, skip) {
  return async (args) => {
    if (skip) {
      return fn(args)
    }
    const start = new Date()
    const hrstart = process.hrtime()

    const result = await fn(args)

    const end = new Date() - start
    const hrend = process.hrtime(hrstart)

    console.info('Execution time: %dms', end)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)

    return result
  }
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, { savepath }) => {
  const { createNode } = actions
  ensureDirectoryExists(savepath)
  const parsePreviews = timerify(parsePreviewsData, true)

  return fetch(sourceUrl, { method: 'GET', redirect: 'follow' })
    .then((response) => {
      if (response.ok) {
        return response.text()
      }

      if (response.status === 404) {
        throw new Error('Item not found')
      } else {
        throw new Error('Error')
      }
    })
    .then(async (text) => {
      const $ = cheerio.load(text)

      const ids = $('td.dmdNo').find('a').map(function(i, el) {
        const id = $(this).text()
        return id
      }).toArray()

      return ids.reduce(async (acc, id) => {
        await acc
        const fileName = path.join(savepath, `${id}.html`)
        return asyncFileExists(fileName)
          .then(exists => {
            return exists
              ? asyncFileRead(fileName)
              : fetch(`${urlPrefix}/Catalog/${id}`, { method: 'GET', redirect: 'follow' } )
                .then(r => r.text())
                .then(fileContents => {
                  const $ = cheerio.load(fileContents)
                  const pageContent = $('#PageContent')
                  return asyncFileWrite(fileName, pageContent).then(() => pageContent)
                })
                .catch(e => {
                  console.log(e)
                  throw e
                })
          })
          .then(async (itemText) => {
            const nodeContents = await parsePreviews(itemText)
            createNode({
              id,
              ...nodeContents,
              internal: {
                type: 'PreviewsItem',
                contentDigest: createContentDigest(nodeContents.description)
              }
            })
          })
      }, Promise.resolve())
    })
}

