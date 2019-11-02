import { APIGatewayEvent,Context, Handler } from 'aws-lambda'
import * as AWS from 'aws-sdk'

import { builder as previewsItemBuilder } from './lib/previews-item-builder'
// import { PreviewsItem } from 'ace-my-order'

require('dotenv').config()

AWS.config.update({
  accessKeyId: process.env.MY_AWS_KEY_ID || 'wrong',
  secretAccessKey: process.env.MY_AWS_SECRET_KEY || 'wrong',
  httpOptions: {
    connectTimeout: 5000,
  },
  region: 'eu-west-1'
})
const s3 = new AWS.S3()
const params = {
  Bucket: 'ace-my-order',
  Delimiter: ''
}

function parseCsv(text: string): any[] {
  const lines = text.split(/\r\n|\n|\r/g)
  const stripSpace = (textToStrip: string) => {
    if (!textToStrip) return null
    return textToStrip.replace(/^"\s*/, '').replace(/\s*"$/, '')
  }

  return lines.map((rawData) => rawData.split(',').map(stripSpace))
}


const sortByIssueNumber = function(a: AWS.S3.Object, b: AWS.S3.Object): number {
  const issueA = a.Key!.match(/\d+/)
  const issueB = b.Key!.match(/\d+/)

  if (issueA && issueB) {
    return +issueB[0] - +issueA[0]
  }
  return 0
}

const getObject = async function(key:string): Promise<any> {
  const rawData = await s3.getObject({
    Bucket: 'ace-my-order',
    Key: key
  }).promise()

  const items = parseCsv(rawData.Body!.toString())
    .map(previewsItemBuilder)
    .filter(Boolean)
    .sort((a, b) => {
      const firstCode = +a!.code.split('/')[1]
      const secondCode = +b!.code.split('/')[1]

      return firstCode < secondCode ? -1 : 1
    })
  return items
}

const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  try {
    const data = await s3.listObjects(params).promise()
    if (!data.Contents || data.Contents.length < 1) {
      return { statusCode: 200, body: '' }
    }

    const issues = data.Contents.slice()
    issues.sort(sortByIssueNumber)

    const items = await getObject(issues[0].Key || '')

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items)
    }
  } catch (e) {
    console.error(e)
    return {
      statusCode: 500
    }
  }
}

export { handler }
