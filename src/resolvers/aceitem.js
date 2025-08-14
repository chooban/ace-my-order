
/* eslint-disable @typescript-eslint/no-var-requires */
const titleFormat = require('./title-format')
const previewsCodeToCatalogueId = require('./previews.js')
/* eslint-enable */

const AceItem = {
  title: {
    resolve: ({ title }) => titleFormat(title)
  },
  price: {
    resolve: ({ price }) => Number(price.replace(/,/, ''))
  },
  reducedFrom: {
    resolve: ({ reducedFrom }) => reducedFrom.length > 0 ? Number(reducedFrom) : null
  },
  slug: {
    resolve: ({ previewsCode }) => `item/${previewsCode.replace('/', '-')}`
  },
  catalogueId: {
    resolve: ({ previewsCode }) => previewsCodeToCatalogueId(previewsCode)
  }
}

module.exports = AceItem
