/// <reference path="./typings/ace-my-order.d.ts" />

import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { hot } from 'react-hot-loader'

import PreviewsTable from './components/PreviewsTableContainer'
import { SearchBox } from './components/SearchBox'
import SearchContext from './search-context'

import './App.css'

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        <SearchContext.Provider value={{ searchValue, updateSearch: setSearchValue }}>
          <SearchBox />
          <PreviewsTable />
        </SearchContext.Provider>
      </React.Fragment>
    </div>
  )
}

export default hot(module)(App)
