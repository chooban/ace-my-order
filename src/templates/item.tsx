import { withStyles } from '@material-ui/core'
import { createStyles } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import React from 'react'

import { AceItem, ItemPageQuery } from '../../typings/autogen'
import PreviewPanel from '../components/previews-table/PreviewPanel'

const styles = (theme:any) => {
  return createStyles({
    root: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'start',
      paddingLeft: '0.5em',
      paddingTop: '14px',
      overflow: 'hidden'
    },
  })
}

interface OwnProps {
  classes: any,
  data: ItemPageQuery
}

const ItemPage: React.FC<OwnProps> = ({ classes, data }) => {

  return (
    <PreviewPanel item={data.aceItem as AceItem} />
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

export default withStyles(styles, { withTheme: true })(ItemPage)
