import { titleFormat } from './title-format'
import type { AceItem as AceItemType, LunarItem } from '../../typings/autogen'

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

const getLunar = (nodeModel: any, title: string): Promise<LunarItem> => {
  return nodeModel.findOne({
      query: { filter : { title: { eq: title }}},
      type: "LunarItem",
  })
}

const fromLunar = async (nodeModel: any, title: string, field: string) => {
  const p = await getLunar(nodeModel, title)
  
  // @ts-ignore
  return p && p[field] ? p[field] : undefined
}

const lunarThenAce = async (nodeModel: any, a: AceItemType, field: string): Promise<any> => {
  const l = await fromLunar(nodeModel, a.title, field)
 
  if (l) {
    return l
  }
  
  // @ts-ignore
  return a[field] ? a[field] : ""
}

export const AceItem = {
  title: {
    resolve: async (source: AceItemType, args: any, context: any) => {
      const title = await lunarThenAce(context.nodeModel, source, "title")
      return title ? titleFormat(title) : titleFormat(source.title)
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
      lunarThenAce(context.nodeModel, source, "description")
  },
  isMature: {
    type: 'Boolean',
    resolve: async (source: AceItemType, args: any, context: any) =>  {
      const title = await lunarThenAce(context.nodeModel, source, "title")
      return title.includes("(MR)")
    }
  },
  isOfferedAgain: {
    type: 'Boolean',
    resolve: async (source: AceItemType, args: any, context: any) => false
      // !!!lunarThenAce(context.nodeModel, source, "isOfferedAgain")
  },
  creators: {
    type: 'String',
    resolve: async (source: AceItemType, args: any, context: any) => 
      lunarThenAce(context.nodeModel, source, "creators")
  },
  coverThumbnail: {
    type: 'String',
    resolve: async (source: AceItemType, args: any, context: any) => ""
      // lunarThenAce(context.nodeModel, source, "coverThumbnail")
  },
  lunar: {
    type: 'LunarItem',
    resolve: async (source: any, args: any, context: any, info: any) => 
      getLunar(context.nodeModel, source.title)
  }
}
