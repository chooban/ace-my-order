const AceItem = require('./src/resolvers/aceitem')
const path = require('path')

const createSchemaCustomization = ({ actions }) => {
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
      previews: PreviewsItem @link(from: "catalogueId" by:"id")
    }
  `
  createTypes(typeDefs)
}

const createResolvers = ({ createResolvers }) => {
  createResolvers({ AceItem })
}

const createPages = async ({ graphql, actions }) => {
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

const onCreatePage = ({ page, actions }) => {
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

module.exports = {
  onCreatePage,
  createPages,
  createSchemaCustomization,
  createResolvers,
}
