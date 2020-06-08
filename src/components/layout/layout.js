import queryString from 'query-string'
import React from 'react'

import { Page } from './Page'
import { PageWithTable } from './PageWithTable'

const LayoutChoice = ({ children, pageContext, location }) => {
  if (pageContext.layout === 'table') {
    const { search: searchValue } = queryString.parse(location.search)
    return <PageWithTable search={searchValue} location={location.pathname}>{children}</PageWithTable>
  }
  return <Page>{children}</Page>
}

export default LayoutChoice
