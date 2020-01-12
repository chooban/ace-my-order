const firstLowerCaseLetter = /(^|[^a-zA-Z\u00C0-\u017F'])([a-zA-Z\u00C0-\u017F])/g
const capitalize = (s) => s.toLowerCase().replace(firstLowerCaseLetter, (m) => m.toUpperCase())
const titleFormat = (title) => (
  capitalize(title)
    .replace(/Dc /, 'DC ')
    .replace(/Idw /, 'IDW ')
    .replace(/ Tp ?/, ' TP ')
    .replace(/ Hc ?/, ' HC ')
    .replace(/Fcbd /, 'FCBD ')
    .replace(/Mr/, 'MR')
    .replace(/Cvr /, 'Cover ')
)

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
  }
}

module.exports = AceItem
