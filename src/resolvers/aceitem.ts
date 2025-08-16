import titleFormat from './title-format'

const previewsCodeToCatalogueId = function (previewsCode: string) {
  const parts = previewsCode.split('/')
  const [issue, item] = [Number(parts[0]), parts[1]]
  const MonthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ]
  const epoch = new Date(1988, 8, 1)
  epoch.setMonth(epoch.getMonth() + issue)

  const catalogueId =  MonthNames[epoch.getMonth()] + (epoch.getFullYear() - 2000) + item

  return catalogueId
}

export const AceItem = {
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
  },
  previews: {
    type: 'PreviewsItem',
    resolve(source, args, context, info) {
      return context.nodeModel.findOne({
        query: { filter : { catalogueId: { eq: previewsCodeToCatalogueId(source.previewsCode) }}},
        type: "PreviewsItem",
      })
    },
  }
}
