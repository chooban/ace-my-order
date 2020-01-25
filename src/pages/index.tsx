import { graphql } from 'gatsby'
import React from 'react'

import { Page } from '../components/layout'
import PreviewsTableContainer from '../components/previews-table/PreviewsTableContainer'

const Index: React.FC = ({ data }: any) => {
  return (
    <Page>
      <PreviewsTableContainer />
    </Page>
  )
}

export const query = graphql`
  query {
    allAceItem {
      nodes {
        id
        title
        previewsCode
        price
        publisher
        slug
      }
    }
  }
`

export default Index
