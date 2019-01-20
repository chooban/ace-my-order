/// <reference path="../typings/ace-my-order.d.ts" />

import React, { Component } from 'react'
import PreviewsTable from './PreviewsTable'

import { PreviewsItem } from "ace-my-order"

export default class PreviewsTablesContainer extends Component {
	state = {
	  items: [],
	  loading: true
	}

	componentDidMount() {
	  fetch('.netlify/functions/latest')
	    .then(response => response.json())
	    .then(items => this.setState({
	      items,
	      loading: false
	    }))
	}

	render() {
	  const { loading, items } = this.state

	  if (loading) {
	    return (<p>Loading...</p>)
	  }

	  return <PreviewsTable rows={items} />
	}
}
