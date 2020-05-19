import React from 'react'

import { Page } from './Page'
import { PageWithTable } from './PageWithTable'

export default ({ children, pageContext }) => {
  if (pageContext.layout === 'table') {
    return <PageWithTable>{children}</PageWithTable>
  }
  return <Page>{children}</Page>
}
