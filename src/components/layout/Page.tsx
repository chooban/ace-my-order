import '../../index.css'

import { createStyles, withStyles } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'

import { AceItem, CatalogueItemsQuery } from '../../../typings/autogen'
import CatalogueContext from '../../contexts/catalogue-context'
import { OrderProvider } from '../../contexts/order-context'
import SearchContext from '../../contexts/search-context'
import theme from '../../theme'
import { Footer } from './Footer'
import { Header } from './Header'

const styles = (theme: any) => {
  return createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
      },
      width: '75vw',
      height: '100vh',
      maxWidth: '1000px',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
    page: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '7px',
      marginBottom: '7px',
      alignContent: 'center',
      padding: '0 7px 0 7px',
      flexGrow: 1
    }
  })
}

const query = graphql`
  query CatalogueItems {
    allAceItem {
      nodes {
        id
        title
        previewsCode
        price
        publisher
        slug
      }
    }
  }
`

function Page({ classes, children }: any) {
  const [searchValue, setSearchValue] = useState('')
  const { allAceItem } = useStaticQuery<CatalogueItemsQuery>(query)

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <OrderProvider>
          <CatalogueContext.Provider value={{ catalogue: allAceItem.nodes as AceItem[] }}>
            <SearchContext.Provider value={{ searchValue, updateSearch: setSearchValue }}>
              <Header />
              <Paper className={classes.page}>
                {children}
              </Paper>
            </SearchContext.Provider>
          </CatalogueContext.Provider>
        </OrderProvider>
        <Footer/>
      </div>
    </MuiThemeProvider>
  )
}

const styled = withStyles(styles, { withTheme: true })(Page)

export { styled as Page }
