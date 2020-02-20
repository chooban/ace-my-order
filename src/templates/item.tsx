import { graphql } from 'gatsby'
import React from 'react'

import { Page } from '../components/layout'
import PreviewsTableContainer from '../components/previews-table/PreviewsTableContainer'

const ItemPage: React.FC = ({ data }: any) => {
  return (
    <Page>
      {/* <CatalogueContext.Provider value={{ catalogue: data.allAceItem.nodes }}>
        <PreviewsTableContainer />
      </CatalogueContext.Provider> */}
      <PreviewsTableContainer selectedItem={data.aceItem} />
      {/* <div>
        <p>{data.aceItem.previews.description}</p>
      </div> */}
    </Page>
  )
}

export const query = graphql`
  query ItemPage($previewsCode: String!) {
    aceItem(previewsCode: { eq: $previewsCode }) {
      previewsCode
      price
      reducedFrom
      title
      previews {
        description
        creators
        coverThumbnail
      }
    }
  }
`

export default ItemPage
