import { graphql } from 'gatsby'
import React from 'react'

import { ItemPageQuery } from '../../typings/autogen'
import { Page } from '../components/layout'
import PreviewsTableContainer from '../components/previews-table/PreviewsTableContainer'

interface OwnProps {
  data: ItemPageQuery
}

const ItemPage: React.FC<OwnProps> = ({ data }) => {
  return (
    <Page>
      <PreviewsTableContainer selectedItem={data.aceItem} />
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
        id
        description
        creators
        coverThumbnail
      }
    }
  }
`

export default ItemPage
