/// <reference path="../typings/ace-my-order.d.ts" />

import React from 'react'
import PreviewsTable from './PreviewsTable'
import { useFetch } from '../hooks/use-fetch'

import { PreviewsItem } from "ace-my-order"

function PreviewsTableContainer() {
  const res = useFetch<PreviewsItem[]>('.netlify/functions/latest')

  if (res.error) {
    console.error(res.error)
    return <p>Error. Sorry</p>
  } else if (!res.response) {
    return (<p>Loading...</p>)
  }

  return (<PreviewsTable rows={res.response} />)
}

PreviewsTableContainer.whyDidYouRender = false

export default PreviewsTableContainer
