import { graphql } from 'gatsby'
import React from 'react'

import { AceItem, ItemPageQuery } from '../../typings/autogen'
import PreviewPanel from '../components/previews-table/PreviewPanel'
import { Head } from '../components/Head'

const ItemPage: React.FC<{ data: ItemPageQuery }> = ({ data }) => (
    <PreviewPanel item={data.aceItem as AceItem} />
  )

export const query = graphql`
  query ItemPage($previewsCode: String!) {
    aceItem(previewsCode: { eq: $previewsCode }) {
      previewsCode
      price
      # reducedFrom
      title
      previews {
        id
        title
        description
        creators
        coverThumbnail
        isMature
        isOfferedAgain
      }
    }
  }
`

export default ItemPage
export { Head }
