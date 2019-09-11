/// <reference path="./typings/ace-my-order.d.ts" />

import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { hot } from 'react-hot-loader'

import PreviewsTable from './components/PreviewsTableContainer'
import { Header } from './components/Header'
import SearchContext from './search-context'

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        <SearchContext.Provider value={{ searchValue, updateSearch: setSearchValue }}>
          <Header />
          <PreviewsTable />
        </SearchContext.Provider>
      </React.Fragment>
    </div>
  )
}

export default hot(module)(App)
