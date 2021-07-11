
require('dotenv').config()
const lineReader = require('n-readlines')
const { previewsCodeToCatalogueId } = require('./lib')
const lines = new lineReader('./data/catalogue.csv')

let catalogueId
do {
  catalogueId
    = previewsCodeToCatalogueId(
      lines.next().toString().split(',')[0].replace(/"/g, '')
    ).slice(0, 5)
} while (false) // eslint-disable-line

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
        catalogueId,
        savepath: `${__dirname}/data/previews/`,
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
      resolve: 'gatsby-plugin-goatcounter',
      options: {
        code: 'ace-my-order',
        pixel: false
      }
    }
  ],
  mapping: {
    'AceItem.previews': 'PreviewsItem',
  },
}
