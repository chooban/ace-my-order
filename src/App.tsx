/// <reference path="./typings/ace-my-order.d.ts" />

import React, { Component, useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import PreviewsTable from './components/PreviewsTableContainer'
import { SearchBox } from './components/SearchBox'
import SearchContext from './search-context'
import { useDebounce } from './use-debounce'

import logo from './logo.svg'
import './App.css'

import { PreviewsItem } from 'ace-my-order'

function App() {
  const [searchValue, setSearchValue] = useState('')
  const updateSearch = useDebounce(searchValue, 250)

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

export default App
