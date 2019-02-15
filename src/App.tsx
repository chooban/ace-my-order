/// <reference path="./typings/ace-my-order.d.ts" />

import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
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
        <React.Fragment>
          <CssBaseline />
          <SearchContext.Provider value={this.state}>
            <SearchBox />
            <PreviewsTable />
          </SearchContext.Provider>
        </React.Fragment>
      </div>
    )
  }
}

export default App
