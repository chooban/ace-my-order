require('dotenv').config()

const titleFormat = require('./src/resolvers/title-format')

module.exports = {
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
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/layout/layout'),
      },
    },
    {
      resolve: 'gatsby-source-previews',
      options: {
        savepath: `${__dirname}/data/previews/`,
        batch: 'JUL22'
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
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
      resolve: '@robinmetral/gatsby-source-s3',
      options: {
        aws: {
          accessKeyId: process.env.MY_AWS_ACCESS_KEY,
          secretAccessKey: process.env.MY_AWS_SECRET_KEY,
          region: process.env.MY_AWS_REGION,
        },
        buckets: ['ace-my-order'],
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
          'reducedFrom',
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
              price: node.price.trim ? node.price.trim() : isNaN(node.price) ? 0 : node.price,
              publisher: node.publisher,
              slug: node.slug,
              creators: node.previews && node.previews.creators,
              previews: {
                creators: node.previews && node.previews.creators,
                coverThumbnail: node.previews && node.previews.coverThumbnail,
                isMature: node.previews && node.previews.isMature,
                isOfferedAgain: node.previews && node.previews.isOfferedAgain,
                title: node.previews && titleFormat(node.previews.title)
              }
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
  mapping: {
    'AceItem.previews': 'PreviewsItem',
  },
}
