import { graphql } from 'gatsby'
import React from 'react'

import { AceItem, ItemPageQuery } from '../../typings/autogen'
import PreviewPanel from '../components/previews-table/PreviewPanel'
import { Head } from '../components/Head'

const ItemPage: React.FC<{ data: ItemPageQuery }> = ({ data }) => (
    <PreviewPanel item={data.aceItem} />
  )

export const query = graphql`
  query ItemPage($previewsCode: String!) {
    aceItem(previewsCode: { eq: $previewsCode }) {
      previewsCode
      price
      title
      description
      isMature
      isOfferedAgain
      creators
      coverThumbnail
      publisher
    }
  }
`

export default ItemPage
export { Head }
