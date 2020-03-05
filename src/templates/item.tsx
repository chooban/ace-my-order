import { Paper, useMediaQuery, withStyles } from '@material-ui/core'
import { createStyles, useTheme } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import React from 'react'

import { AceItem, ItemPageQuery } from '../../typings/autogen'
import { Page } from '../components/layout'
import PreviewPanel from '../components/previews-table/PreviewPanel'
import PreviewsTable from '../components/previews-table/PreviewsTable'
import { useClientRect } from '../hooks'

const styles = (theme:any) => {
  return createStyles({
    root: {
      width: '100%',
      height: '100vh',
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

const contentRef = React.createRef<HTMLDivElement>()
const ItemPage: React.FC<OwnProps> = ({ classes, data }) => {
  const contentRect = useClientRect(contentRef)
  const theme = useTheme()
  const isPresumedMobile = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Page>
      <Paper className={classes.root} ref={contentRef}>
        {isPresumedMobile
          ? <PreviewPanel item={data.aceItem as AceItem} />
          : (<>
            <PreviewsTable height={Math.round(contentRect.height)} />
            <PreviewPanel item={data.aceItem as AceItem} />
          </>)}
      </Paper>
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

export default withStyles(styles, { withTheme: true })(ItemPage)
