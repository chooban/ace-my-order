
/* eslint-disable @typescript-eslint/no-var-requires */
const titleFormat = require('./title-format')
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
  }
}

module.exports = AceItem
