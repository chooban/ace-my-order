import type { GatsbyConfig } from "gatsby"
import 'dotenv/config'
// require('dotenv').config()

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'My Ace Order',
    description: 'Find things to order from Previews at Ace',
    url: 'https://ace-my-order.netlify.app',
    twitterUsername: 'choobanicus',
    titleTemplate: 'Ace My Order',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        fileName: './typings/autogen/index.d.ts',
        codegenConfig: {
          namingConvention: 'keep',
          maybeValue: 'T | undefined'
        }
      }
    },
    'gatsby-plugin-material-ui',
    'gatsby-plugin-why-did-you-render',
    {
      resolve: 'gatsby-source-previews',
      options: {
        savepath: `${__dirname}/data/previews/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/`,
        ignore: ['**/*.html'],
      },
    },
    {
      resolve: 'gatsby-transformer-csv',
      options: {
        typeName: () => 'AceItem',
        noheader: true,
        headers: [
          'previewsCode',
          'title',
          'IGNORE',
          'price',
          'IGNORE',
          'IGNORE',
          'publisher',
        ],
        ignoreColumns: /IGNORE/,
      },
    },
    {
      resolve: 'gatsby-plugin-auth0',
      options: {
        domain: process.env.GATSBY_AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        useRefreshTokens: true,
        cacheLocation: 'localstorage',
        scope: 'openid profile email update:current_user_metadata read:current_user',
        audience: `https://${process.env.GATSBY_AUTH0_DOMAIN}/api/v2/`
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'catalogue',
        engine: 'flexsearch',
        // engineOptions: 'speed',
        query: `
          {
            allAceItem {
              nodes {
                id
                title
                previewsCode
                catalogueId
                price
                publisher
                slug
                previews {
                  id
                  creators
                  coverThumbnail
                  isMature
                  isOfferedAgain
                  title
                }
              }
            }
          }
        `,
        ref: 'catalogueId',
        index: ['title', 'publisher', 'creators'],
        normalizer: ({ data }) => {
          return data.allAceItem.nodes.map((node) => {
            return {
              title: node.title,
              previewsCode: node.previewsCode,
              catalogueId: node.catalogueId,
              publisher: node.publisher,
              slug: node.slug,
              creators: node.previews && node.previews.creators,
            }
          })
        },
      }
    },
    {
      resolve: 'gatsby-plugin-goatcounter',
      options: {
        code: 'ace-my-order',
        pixel: false
      }
    },
  ],
}

export default config;
