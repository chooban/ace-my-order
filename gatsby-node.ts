import type { GatsbyNode } from 'gatsby'
import { AceItem } from './src/resolvers/aceitem'
import path from 'path'

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type AceItem implements Node {
      previewsCode: String!
      price: Float
      reducedFrom: Float
      publisher: String
      slug: String!
      title: String!
      catalogueId: String!
    }
      
  `
  createTypes(typeDefs)
}

export const createResolvers: GatsbyNode["createResolvers"] = ({ createResolvers }) => {
  createResolvers({ AceItem })
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query ItemSlugs {
      allAceItem {
        nodes {
          id
          previewsCode
          slug
        }
      }
    }
  `)
  result.data.allAceItem.nodes.forEach((node) => {
    createPage({
      path: node.slug,
      component: path.resolve('./src/templates/item.tsx'),
      context: {
        layout: 'table',
        previewsCode: node.previewsCode
      }
    })
  })
}

export const onCreatePage: GatsbyNode["onCreatePage"] = ({ page, actions }) => {
  const { createPage } = actions

  if (['/', '', '/search'].includes(page.path)) {
    if (page.context) {
      page.context.layout = 'table'
    }
  } else if (page.path.match(/^\/app/)) {
    page.matchPath = '/app/*'
  } else {
    if (page.context) {
      page.context.layout = 'no-table'
    }
  }
  createPage(page)
}
