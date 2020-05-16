import React from 'react'

import { Page } from './Page'
import { PageWithTable } from './PageWithTable'

export default ({ children, pageContext }) => {
  if (pageContext.layout === 'no-table') {
    return <Page>{children}</Page>
  }
  return <PageWithTable>{children}</PageWithTable>
}
