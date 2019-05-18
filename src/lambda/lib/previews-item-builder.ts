/// <reference path="../../typings/ace-my-order.d.ts" />
import { PreviewsItem } from 'ace-my-order'

function builder(row: string[]): PreviewsItem | null {
  if (!hasMinimumFields(row)) {
    return null
  }

  const price = +row[3].replace(/[^\d.-]/g, '')
  const reducedFrom = row[5] ? +row[5].replace(/[^\d.-]/g, '') : undefined
  return {
    code: row[0],
    title: titleFormat(row[1]),
    price,
    reducedFrom,
    publisher: row[6] ? row[6] : 'UNKNOWN'
  }
}

const firstLowerCaseLetter = /(^|[^a-zA-Z\u00C0-\u017F'])([a-zA-Z\u00C0-\u017F])/g;
const capitalize = (s: string) => s.toLowerCase().replace(firstLowerCaseLetter, (m) => m.toUpperCase())

const titleFormat = (title: string) => (
  capitalize(title)
    .replace(/Dc /, 'DC ')
    .replace(/Idw /, 'IDW ')
    .replace(/ Tp ?/, ' TP ')
    .replace(/ Hc ?/, ' HC ')
    .replace(/Fcbd /, 'FCBD ')
    .replace(/Mr/, 'MR')
    .replace(/Cvr /, 'Cover ')
)
/**
 * Check to see if we have the minimum set of fields:
 *   * code
 *   * price
 *   * title
 */
function hasMinimumFields(rowData: string[]): boolean {
  const requiredFields = [0, 1, 3];
  return requiredFields.reduce((v, idx) => v && !!rowData[idx], Boolean(true));
}

export { builder }
