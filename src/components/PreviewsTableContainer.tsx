/// <reference path="../typings/ace-my-order.d.ts" />

import React, { PureComponent } from 'react'
import PreviewsTable from './PreviewsTable'
import SearchContext from '../search-context'

import { PreviewsItem } from "ace-my-order"

function searchCatalogue(searchTerm: string, catalogue: PreviewsItem[]) {
  const publisherOrTitleMatches = (regex: RegExp) =>
    (d: PreviewsItem) => regex.test(`${d.title} ${d.publisher}`);

  const terms = searchTerm.split(' ');
  const regex = terms
    .map((t) => `(?=.*${t})`)
    .reduce((a, b) => a + b, '');

  const re = new RegExp(regex, 'i');

  return catalogue.filter(publisherOrTitleMatches(re));
}

type IState = {
  items: PreviewsItem[],
  loading: boolean,
  error: boolean,
}

export default class PreviewsTablesContainer extends PureComponent<any, IState> {

  state = {
    items: [],
    loading: true,
    error: false,
  }

  componentDidMount() {
    fetch('.netlify/functions/latest')
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
        throw new Error()
      })
      .then(items => this.setState({
        items: items.slice(0, 50),
        loading: false
      }))
      .catch(e => {
        this.setState({
          loading: false,
          error: true
        })
      })
  }

  render() {
    const { loading, error } = this.state

    if (loading) {
      return (<p>Loading...</p>)
    }

    if (error) {
      return (<p>Error. Sorry</p>)
    }

    return (
      <SearchContext.Consumer>
        {({ searchValue }) => {
          const catalogue = this.state.items
          const items = searchValue.length > 3
            ? searchCatalogue(searchValue, catalogue)
            : catalogue

          return <PreviewsTable rows={items} />
          }}
        </SearchContext.Consumer>

    )
  }
}
