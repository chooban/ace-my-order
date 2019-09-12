/// <reference path="./typings/ace-my-order.d.ts" />

import React, { useState } from 'react'
import { hot } from 'react-hot-loader'

import { PreviewsTableContainer as Main} from './components/PreviewsTableContainer'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import SearchContext from './search-context'
import { createStyles, withStyles, WithStyles } from '@material-ui/core'

const styles = (theme: any) => {
  return createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
        minWidth: '550px'
      },
      width: '75vw',
      height: '100vh',
      maxWidth: '1000px',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'column',
      '> div': {
        flex: 1
      }
    }
  })
}

function App({ classes }: WithStyles<typeof styles>) {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className={classes.root}>
      <React.Fragment>
        <SearchContext.Provider value={{ searchValue, updateSearch: setSearchValue }}>
          <Header />
          <Main />
        </SearchContext.Provider>
        <Footer />
      </React.Fragment>
    </div>
  )
}

const styled = withStyles(styles, { withTheme: true })(App)

export default hot(module)(styled)
