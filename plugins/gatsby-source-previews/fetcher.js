/* eslint-disable */
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')
const { promisify } = require('util')
const workerPool = require('workerpool')
const redis = require('async-redis')
/* eslint-enable */

const writeFile = promisify(fs.writeFile)

let client
if (process.env.REDIS_URL) {
  client = redis.createClient(process.env.REDIS_URL)
}

/**
 * Worker thread to return the HTML contents of a given Previews ID.
 * If the information is cached on the filesystem then that's returned,
 * otherwise it's fetched from the site.
 *
 * @param {string} id
 * @param {string} fileName
 */
async function fetchPreviews(id, fileName) {
  // console.log('Fetching', id, fileName)
  const URL_PREFIX = 'https://www.previewsworld.com'
  const fileExists = fs.existsSync(fileName)

  if (fileExists) {
    try {
      // console.log(`Reading ${fileName}`)
      const itemText = fs.readFileSync(fileName, 'utf8')
      if (client) {
        await client.set(id, itemText)
      }
      return { id, itemText }
    } catch (e) {
      console.log(`Error for ${id}`, e)
      throw e
    }
  }

  if (client) {
    const redisDoc = await client.get(id)
    if (redisDoc) {
      await writeFile(fileName, redisDoc)
      return { id, itemText: redisDoc }
    }
  } else {
    console.log('No redis client')
  }

  // console.log(`Fetching ${URL_PREFIX}/Catalog/${id} for ${id}`)
  const contents = await fetch(`${URL_PREFIX}/Catalog/${id}`, { method: 'GET', redirect: 'follow' })
    .then(r => r.text())
    .then(fileContents => {
      const $ = cheerio.load(fileContents)
      return $('#PageContent').html()
    })
    .catch(e => {
      console.log(e)
      throw e
    })

  await writeFile(fileName, contents)
    .then(() => {if (client) {
      client.set(id, contents)}
    })
    .catch(e => {
      console.log(e)
      throw e
    })

  return { id, itemText: contents }
}

workerPool.worker({
  fetchPreviews
})
