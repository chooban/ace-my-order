import React from 'react'

import { Page } from './Page'
import { PageWithTable } from './PageWithTable'

const LayoutChoice = ({ children, pageContext }): JSX.Element => {
  if (pageContext.layout === 'table') {
    return <PageWithTable>{children}</PageWithTable>
  }
  return <Page>{children}</Page>
}

export default LayoutChoice
