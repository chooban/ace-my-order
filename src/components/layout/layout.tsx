import queryString from 'query-string'
import React from 'react'

import { Page } from './Page'
import { PageWithTable } from './PageWithTable'

const LayoutChoice = ({ children, pageContext, location }: any) => {
  if (pageContext.layout === 'table') {
    const { search: searchValue } = queryString.parse(location.search)
    return <PageWithTable search={searchValue} location={location.pathname}>{children}</PageWithTable>
  }
  return <Page>{children}</Page>
}

const PageTableLayout = ({ children, location}: any) => {
    const { search: searchValue } = queryString.parse(location.search)
    return <PageWithTable search={searchValue} location={location.pathname}>{children}</PageWithTable>
}

const PageLayout = ({ children }: any) => {
  return <Page>{children}</Page>
}

export default LayoutChoice
export {
  PageLayout, PageTableLayout, LayoutChoice
}
