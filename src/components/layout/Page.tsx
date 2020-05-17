import '../../index.css'

import { createStyles, Paper, withStyles } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import React, { useState } from 'react'

import SEO from '../../components/seo'
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
      '.body': {
        flexGrow: 1
      }
    },
    children: {
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem'
    }
  })
}

function Page({ classes, children }: any) {
  const [searchValue, setSearchValue] = useState('')

  return (
    <>
      <SEO />
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <OrderProvider>
          <SearchContext.Provider value={{ searchValue, updateSearch: setSearchValue }}>
            <div className={classes.root}>
              <Header />
              <Paper className={classes.children}>
                {children}
              </Paper>
              <Footer/>
            </div>
          </SearchContext.Provider>
        </OrderProvider>
      </MuiThemeProvider>
    </>
  )
}

const styled = withStyles(styles, { withTheme: true })(Page)

export { styled as Page }
