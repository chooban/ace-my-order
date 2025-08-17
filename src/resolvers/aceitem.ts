import { titleFormat } from './title-format'
import type { AceItem as AceItemType, PreviewsItem } from '../../typings/autogen'

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

const getPreviews = (nodeModel: any, previewsCode: string): Promise<PreviewsItem> => {
  return nodeModel.findOne({
      query: { filter : { catalogueId: { eq: previewsCodeToCatalogueId(previewsCode) }}},
      type: "PreviewsItem",
  })
}

const fromPreviews = async (nodeModel: any, previewsCode: string, field: string): Promise<any> => {
  const p = await getPreviews(nodeModel, previewsCode)
  // @ts-ignore
  return p && p[field] ? p[field] : undefined
}

export const AceItem = {
  title: {
    resolve: async ({ title, previewsCode }: AceItemType, args: any, context: any) => {
      const previewsTitle = await fromPreviews(context.nodeModel, previewsCode, "title")
      return previewsTitle ? titleFormat(previewsTitle) : titleFormat(title)
    }
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
  description: {
    type: 'String',
    resolve: async ({ previewsCode }: AceItemType, args: any, context: any) => 
      fromPreviews(context.nodeModel, previewsCode, "description")
  },
  isMature: {
    type: 'Boolean',
    resolve: async ({ previewsCode }: AceItemType, args: any, context: any) => 
      fromPreviews(context.nodeModel, previewsCode, "isMature")
  },
  isOfferedAgain: {
    type: 'Boolean',
    resolve: async ({ previewsCode }: AceItemType, args: any, context: any) => 
      fromPreviews(context.nodeModel, previewsCode, "isOfferedAgain")
  },
  creators: {
    type: 'String',
    resolve: async ({ previewsCode }: AceItemType, args: any, context: any) => 
      fromPreviews(context.nodeModel, previewsCode, "creators")
  },
  coverThumbnail: {
    type: 'String',
    resolve: async ({ previewsCode }: AceItemType, args: any, context: any) => 
      fromPreviews(context.nodeModel, previewsCode, "coverThumbnail")
  },
  previews: {
    type: 'PreviewsItem',
    resolve: async (source: any, args: any, context: any, info: any) => 
      getPreviews(context.nodeModel, source.previewsCode)
  }
}
