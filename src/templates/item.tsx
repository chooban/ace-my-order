import { graphql } from 'gatsby'
import React from 'react'

import { AceItem, ItemPageQuery } from '../../typings/autogen'
import PreviewPanel from '../components/previews-table/PreviewPanel'

const ItemPage: React.FC<{ data: ItemPageQuery }> = ({ data }) =>
  (<PreviewPanel item={data.aceItem as AceItem} />)


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
