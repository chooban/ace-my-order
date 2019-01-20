/// <reference path="./typings/ace-my-order.d.ts" />

import React, { Component } from 'react'
import { debounce } from 'ts-debounce'

import PreviewsTable from './components/PreviewsTableContainer'
import SearchBox from './components/SearchBox'
import SearchContext from './search-context'

import logo from './logo.svg'
import './App.css'

import { PreviewsItem } from 'ace-my-order'

type AppState = {
  searchValue: string
  updateSearch: Function
}

class App extends Component<any, AppState> {

  updateSearch = (newSearchValue: string) => {
    this.setState({ searchValue: newSearchValue })
  }

  debouncedUpdate = debounce(this.updateSearch, 250)

  state = {
    searchValue: '',
    updateSearch: this.updateSearch
  }

  render() {
    return (
      <div className="App">
        <SearchContext.Provider value={this.state}>
          <SearchBox />
          <PreviewsTable />
        </SearchContext.Provider>
      </div>
    )
  }
}

export default App
