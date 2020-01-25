const path = require('path')
const AceItem = require('./src/resolvers/aceitem')

function previewsCodeToCatalogueId(previewsCode) {
  const parts = previewsCode.split('/')
  const [issue, item] = [Number(parts[0]), parts[1]]
  const MonthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ]
  const epoch = new Date(1988, 8, 1)
  epoch.setMonth(epoch.getMonth() + issue)

  return MonthNames[epoch.getMonth()] + (epoch.getFullYear() - 2000) + item
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type AceItem implements Node {
      previewsCode: String
      price: Float
      reducedFrom: Float
      publisher: String
      slug: String
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
      context:{
        previewsCode: node.previewsCode
      }
    })
  })
}
