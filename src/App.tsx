import { createStyles, WithStyles, withStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Cart from './components/cart'
import { Footer, Header } from './components/layout/'
import PreviewsTableContainer from './components/previews-table/PreviewsTableContainer'
import CatalogueContext from './contexts/catalogue-context'
import { OrderProvider } from './contexts/order-context'
import SearchContext from './contexts/search-context'
import { useFetch } from './hooks'

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
    }
  })
}

function App({ classes }: WithStyles<typeof styles>) {
  const [searchValue, setSearchValue] = useState('')
  const { response } = useFetch<PreviewsItem[]>('/.netlify/functions/latest')

  return (
    <div className={classes.root}>
      <Router>
        <OrderProvider>
          <CatalogueContext.Provider value={{ catalogue: response || [] }}>
            <SearchContext.Provider value={{ searchValue, updateSearch: setSearchValue }}>
              <Header />
              <Route path="/cart" component={Cart} />
              <Route
                exact
                path={['/', '/item/:slug']}
                render={(props) => <PreviewsTableContainer {...props}/>}
              />
            </SearchContext.Provider>
          </CatalogueContext.Provider>
        </OrderProvider>
        <Footer />
      </Router>
    </div>
  )
}

const styled = withStyles(styles, { withTheme: true })(App)

export default hot(module)(styled)
