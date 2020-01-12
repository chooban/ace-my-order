import { graphql } from 'gatsby'
import React from 'react'

import { Page } from '../components/layout'
import PreviewsTableContainer from '../components/previews-table/PreviewsTableContainer'
import CatalogueContext from '../contexts/catalogue-context'

const ItemPage: React.FC = ({ data }: any) => {
  return (
    <Page>
      {/* <CatalogueContext.Provider value={{ catalogue: data.allAceItem.nodes }}>
        <PreviewsTableContainer />
      </CatalogueContext.Provider> */}
      <div>
        <p>{data.aceItem.previews.description}</p>
      </div>
    </Page>
  )
}

export const query = graphql`
  query($previewsCode: String!) {
    aceItem(previewsCode: { eq: $previewsCode }) {
      previewsCode
      previews {
        description
      }
    }
  }
`

export default ItemPage
