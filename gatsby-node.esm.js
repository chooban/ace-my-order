import path from 'path'

import { previewsCodeToCatalogueId } from './lib'
import AceItem from './src/resolvers/aceitem'

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type AceItem implements Node {
      previewsCode: String!
      price: Float
      reducedFrom: Float
      publisher: String
      slug: String!
      title: String!
      previews: PreviewsItem @link(from: "previews___NODE")
    }
  `
  createTypes(typeDefs)
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({ AceItem })
}

exports.onCreateNode = ({ node }) => {
  if (node.internal.type === 'AceItem') {
    node.slug = `item/${node.previewsCode.replace('/', '-')}`
    // eslint-disable-next-line
    node.previews___NODE = previewsCodeToCatalogueId(node.previewsCode)
  }
}

exports.createPages = async ({ graphql, actions }) => {
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

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  if (page.path === '/' || page.path === '/search') {
    page.context.layout = 'table'
  } else if (page.path.match(/^\/app/)) {
    page.matchPath = '/app/*'
  } else {
    page.context.layout = 'no-table'
  }
  createPage(page)
}
