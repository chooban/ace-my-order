/// <reference path="../typings/ace-my-order.d.ts" />

import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk'

import { PreviewsItem } from 'ace-my-order'

type S3Object = {
  Key: string | ''
}

require('dotenv').config()

AWS.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'eu-west-1'
})
const s3 = new AWS.S3()
const params = {
  Bucket: 'ace-my-order',
  Delimiter: ''
}

function parseCsv(text: string): any[] {
  const lines = text.split(/\r\n|\n|\r/g);
  const stripSpace = (textToStrip: string) => {
    if (!textToStrip) return null;
    return textToStrip.replace(/^"\s*/, '').replace(/\s*"$/, '');
  };

  return lines.map((rawData) => rawData.split(',').map(stripSpace));
}

function toLineItem(row: string[]): PreviewsItem | null {
  if (!hasMinimumFields(row)) {
    return null
  }

  const price = +row[3].replace(/[^\d.-]/g, '')
  const reducedFrom = row[5] ? +row[5].replace(/[^\d.-]/g, '') : undefined
  return {
    code: row[0],
    title: row[1],
    price,
    reducedFrom,
    publisher: row[6] ? row[6] : 'UNKNOWN'
  }
}

/**
 * Check to see if we have the minimum set of fields:
 *   * code
 *   * price
 *   * title
 */
function hasMinimumFields(rowData: string[]): boolean {
  const requiredFields = [0, 1, 3];
  return requiredFields.reduce((v, idx) => v && !!rowData[idx], true);
}

const sortByIssueNumber = function(a: S3Object, b: S3Object): number {
  const issueA = a.Key.match(/\d+/)
  const issueB = b.Key.match(/\d+/)

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
  .map(toLineItem)
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

    const issues = <S3Object[]> data.Contents.slice()
    issues.sort(sortByIssueNumber)

    const items = await getObject(issues[0].Key || '')

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items)
    }
    return
  } catch (e) {
    console.error(e)
    return {
      statusCode: 500
    }
  }
}

export { handler }
