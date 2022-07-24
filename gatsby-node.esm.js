import AWS from 'aws-sdk'
import { createRemoteFileNode } from 'gatsby-source-filesystem'
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
      catalogueId: String!
      previews: PreviewsItem @link(from: "catalogueId" by:"id")
    }
  `
  createTypes(typeDefs)
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({ AceItem })
}

exports.onCreateNode = async ({ node,
  actions: { createNode },
  store,
  cache,
  reporter,
  createNodeId,
}) => {
  if (node.internal.type === 'S3Object') {
    console.log('Got an S3Object')
    AWS.config.update({
      accessKeyId: process.env.MY_AWS_ACCESS_KEY,
      secretAccessKey: process.env.MY_AWS_SECRET_KEY,
      region: process.env.MY_AWS_REGION,
    })
    const s3 = new AWS.S3()

    const { TagSet } = await s3.getObjectTagging({
      Key: node.Key,
      Bucket: node.Bucket
    }).promise()

    console.log(`Checking ${JSON.stringify(TagSet)} of ${node.Key}`)
    if (TagSet && TagSet.length && TagSet.find(t => t.Key === 'catalogue' && t.Value === 'current')) {
      console.log('Downloading CSV from S3: ' + node.Key)
      const csvFile = await createRemoteFileNode({
        url: node.url,
        parentNodeId: node.id,
        store,
        cache,
        reporter,
        createNode,
        createNodeId,
      })

      if (csvFile) {
        // Add local file to s3 object node
        node.data___NODE = csvFile.id // eslint-disable-line @typescript-eslint/naming-convention
      }
    }
  }
  else if (node.internal.type === 'AceItem') {
    node.slug = `item/${node.previewsCode.replace('/', '-')}`
    // eslint-disable-next-line
    node.catalogueId = previewsCodeToCatalogueId(node.previewsCode)
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
