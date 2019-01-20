/// <reference path="./typings/ace-my-order.d.ts" />

import React, { Component } from 'react'
import PreviewsTable from './components/PreviewsTableContainer'
import logo from './logo.svg'
import './App.css'

import { PreviewsItem } from 'ace-my-order'

type AppState = {
	items: PreviewsItem[]
}

class App extends Component<any, AppState> {

  render() {
    return (<div className="App">
      <header className="App-header">
        <PreviewsTable />
      </header>
    </div>)
  }
}

export default App
