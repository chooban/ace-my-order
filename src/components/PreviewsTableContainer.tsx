/// <reference path="../typings/ace-my-order.d.ts" />

import React, { PureComponent, useState, useEffect } from 'react'
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

const initialItems:PreviewsItem[] = []

export default function PreviewsTablesContainer() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [items, setItems] = useState(initialItems)

  useEffect(() => {
    fetch('.netlify/functions/latest')
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
        throw new Error()
      })
      .then(items => {
        setLoading(false)
        setItems(items.slice(0, 50))
      })
      .catch(e => {
        setError(true)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (<p>Loading...</p>)
  }

  if (error) {
    return (<p>Error. Sorry</p>)
  }

  return (
    <SearchContext.Consumer>
      {({ searchValue }) => {
        const catalogue = searchValue.length > 3
          ? searchCatalogue(searchValue, items)
          : items

        return <PreviewsTable rows={catalogue} />
        }}
      </SearchContext.Consumer>

  )
}
