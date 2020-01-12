import { graphql } from 'gatsby'
import React from 'react'

import { Page } from '../components/layout'
import PreviewsTableContainer from '../components/previews-table/PreviewsTableContainer'
import CatalogueContext from '../contexts/catalogue-context'

const Index: React.FC = ({ data }: any) => {
  return (
    <Page>
      <CatalogueContext.Provider value={{ catalogue: data.allAceItem.nodes }}>
        <PreviewsTableContainer />
      </CatalogueContext.Provider>
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
