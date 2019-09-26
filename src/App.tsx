/// <reference path="./typings/ace-my-order.d.ts" />

import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { createStyles, withStyles, WithStyles } from '@material-ui/core'

import { About, Contact, Privacy } from './components/pages/'
import { Header, Footer } from './components/layout/'

import { PreviewsTableContainer } from './components/PreviewsTableContainer'
import { Cart } from './components/Cart'

import SearchContext from './contexts/search-context'
import { OrderProvider } from './contexts/order-context'

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
  const [order, setOrder] = useState({ order: [] })

  useEffect(() => {
    console.log('Order changed')
  }, [order])

  return (
    <div className={classes.root}>
      <Router>
        <OrderProvider initialState={order} onUpdate={setOrder}>
          <SearchContext.Provider value={{ searchValue, updateSearch: setSearchValue }}>
            <Header />
            <Route exact path="/" component={PreviewsTableContainer} />
          </SearchContext.Provider>
          <Route path="/cart" component={Cart} />
        </OrderProvider>
        <Route path="/about" component={About} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/contact" component={Contact} />
        <Footer />
      </Router>
    </div>
  )
}

const styled = withStyles(styles, { withTheme: true })(App)

export default hot(module)(styled)
