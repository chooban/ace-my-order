import '../../index.css'

import { createStyles, withStyles } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import { MuiThemeProvider } from '@material-ui/core/styles'
import React, { useState } from 'react'

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

function Page({ classes, children }: any) {
  const [searchValue, setSearchValue] = useState('')

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <SearchContext.Provider value={{ searchValue, updateSearch: setSearchValue }}>
          <Header />
          <Paper className={classes.page}>
            {children}
          </Paper>
        </SearchContext.Provider>
        <Footer/>
      </div>
    </MuiThemeProvider>
  )
}

const styled = withStyles(styles, { withTheme: true })(Page)

export { styled as Page }
