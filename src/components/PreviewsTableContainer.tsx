/// <reference path="../typings/ace-my-order.d.ts" />

import React, { useState, useEffect } from 'react'
import PreviewsTable from './PreviewsTable'

import { PreviewsItem } from "ace-my-order"

const initialItems:PreviewsItem[] = []

function PreviewsTableContainer() {

  const [loading, setLoading] = useState(true)
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
        setItems(items)
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
    console.error(error)
    return (<p>Error. Sorry</p>)
  }

  return (<PreviewsTable rows={items} />)
}

PreviewsTableContainer.whyDidYouRender = true

export default React.memo(PreviewsTableContainer)
