import { titleFormat } from './title-format'
import type { AceItem as AceItemType, LunarItem, PreviewsItem } from '../../typings/autogen'

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

const getLunar = (nodeModel: any, title: string): Promise<LunarItem> => {
  return nodeModel.findOne({
      query: { filter : { title: { eq: title }}},
      type: "LunarItem",
  })
}

const fromPreviews = async (nodeModel: any, previewsCode: string, field: string): Promise<any> => {
  const p = await getPreviews(nodeModel, previewsCode)
  
  // @ts-ignore
  return p && p[field] ? p[field] : undefined
}
 
const fromLunar = async (nodeModel: any, title: string, field: string) => {
  const p = await getLunar(nodeModel, title)
  
  // @ts-ignore
  return p && p[field] ? p[field] : undefined
}

const lunarThenPreviews = async (nodeModel: any, a: AceItemType, field: string): Promise<any> => {
  const l = await fromLunar(nodeModel, a.title, field)
 
  if (l) {
    return l
  }
  
  return fromPreviews(nodeModel, a.previewsCode, field)
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
    resolve: async (source: AceItemType, args: any, context: any) => 
      lunarThenPreviews(context.nodeModel, source, "description")
  },
  isMature: {
    type: 'Boolean',
    resolve: async (source: AceItemType, args: any, context: any) => 
      lunarThenPreviews(context.nodeModel, source, "isMature")
  },
  isOfferedAgain: {
    type: 'Boolean',
    resolve: async (source: AceItemType, args: any, context: any) => 
      lunarThenPreviews(context.nodeModel, source, "isOfferedAgain")
  },
  creators: {
    type: 'String',
    resolve: async (source: AceItemType, args: any, context: any) => 
      lunarThenPreviews(context.nodeModel, source, "creators")
  },
  coverThumbnail: {
    type: 'String',
    resolve: async (source: AceItemType, args: any, context: any) => 
      lunarThenPreviews(context.nodeModel, source, "coverThumbnail")
  },
  previews: {
    type: 'PreviewsItem',
    resolve: async (source: any, args: any, context: any, info: any) => 
      getPreviews(context.nodeModel, source.previewsCode)
  },
  lunar: {
    type: 'LunarItem',
    resolve: async (source: any, args: any, context: any, info: any) => 
      getLunar(context.nodeModel, source.title)
  }
}
