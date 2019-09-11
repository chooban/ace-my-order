/// <reference path="./typings/ace-my-order.d.ts" />

import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { hot } from 'react-hot-loader'

import { PreviewsTableContainer as Main} from './components/PreviewsTableContainer'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import SearchContext from './search-context'

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        <SearchContext.Provider value={{ searchValue, updateSearch: setSearchValue }}>
          <Header />
          <Main />
        </SearchContext.Provider>
        <Footer />
      </React.Fragment>
    </div>
  )
}

export default hot(module)(App)
