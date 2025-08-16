import { titleFormat } from './title-format'
import type { AceItem as AceItemType } from '../../typings/autogen'

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

const getPreviews = (nodeModel: any, previewsCode: string) => {
  return nodeModel.findOne({
      query: { filter : { catalogueId: { eq: previewsCodeToCatalogueId(previewsCode) }}},
      type: "PreviewsItem",
  })
}

export const AceItem = {
  title: {
    resolve: ({ title }: AceItemType) => titleFormat(title)
  },
  price: {
    resolve: ({ price }: AceItemType) => price ? Number(("" + price).replace(/,/, '')) : undefined
  },
  slug: {
    resolve: ({ previewsCode }: AceItemType) => `item/${previewsCode.replace('/', '-')}`
  },
  catalogueId: {
    resolve: ({ previewsCode }: AceItemType) => previewsCodeToCatalogueId(previewsCode)
  },
  previews: {
    type: 'PreviewsItem',
    resolve(source: any, args: any, context: any, info: any) {
      return getPreviews(context.nodeModel, source.previewsCode)
    },
  }
}
