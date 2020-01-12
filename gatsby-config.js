module.exports = {
  siteMetadata: {
    title: 'My Ace Order'
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-material-ui',
    {
      resolve: 'gatsby-source-previews',
      options: {
        savepath: `${__dirname}/data/previews/`
      }
    },

    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false
        }
      }
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/app/*'] },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: 'gatsby-transformer-csv',
      options: {
        typeName: () => 'AceItem',
        noheader: true,
        headers: ['previewsCode', 'title', 'IGNORE', 'price', 'IGNORE', 'reducedFrom', 'publisher'],
        ignoreColumns: ['IGNORE']
      }
    }
  ],
  mapping: {
    'AceItem.previews': 'PreviewsItem'
  }
}
