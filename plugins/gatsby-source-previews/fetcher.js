const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')
const { promisify } = require('util')
const workerPool = require('workerpool')

const writeFilePromise = promisify(fs.writeFile)

/**
 *  Worker thread to return the HTML contents of a given Previews ID.
 * If the information is cached on the filesystem then that's returned,
 * otherwise it's fetched from the site.
 *
 * @param {string} id
 * @param {string} fileName
 */
async function fetchPreviews(id, fileName) {
  const URL_PREFIX = 'https://www.previewsworld.com'
  const exists = fs.existsSync(fileName)

  if (exists) {
    try {
      // console.log(`Reading ${fileName}`)
      const itemText = fs.readFileSync(fileName, 'utf8')
      return { id, itemText }
    } catch (e) {
      console.log(`Error for ${id}`, e)
      throw e
    }
  }

  // console.log(`Fetching for ${id}`)
  const contents = await fetch(`${URL_PREFIX}/Catalog/${id}`, { method: 'GET', redirect: 'follow' } )
    .then(r => r.text())
    .then(fileContents => {
      const $ = cheerio.load(fileContents)
      return $('#PageContent').html()
    })
    .catch(e => {
      console.log(e)
      throw e
    })

  await writeFilePromise(fileName, contents)
    .catch(e => {
      console.log(e)
      throw e
    })

  return { id, itemText: contents }
}

workerPool.worker({
  fetchPreviews
})
