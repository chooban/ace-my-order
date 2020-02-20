import Paper from '@material-ui/core/Paper'
import { createStyles, useTheme, withStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { graphql, useStaticQuery } from 'gatsby'
import React, { memo } from 'react'

import { AceItem, AllItemsQuery } from '../../../typings/autogen'
// import { useRouteMatch } from 'react-router-dom'
// import { useCatalogue } from '../../contexts/catalogue-context'
import { useClientRect } from '../../hooks'
import PreviewPanel from './PreviewPanel'
import PreviewsTable from './PreviewsTable'

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

const query = graphql`
  query AllItems {
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

const contentRef = React.createRef<HTMLDivElement>()

function PreviewsTableContainer({ classes, selectedItem }: any) {
  const contentRect = useClientRect(contentRef)
  const theme = useTheme()
  const isPresumedMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const { allAceItem } = useStaticQuery<AllItemsQuery>(query)

  if (isPresumedMobile) {
    return (
      <Paper className={classes.root} ref={contentRef}>
        {selectedItem
          ? <PreviewPanel item={selectedItem} />
          : <PreviewsTable
            rows={allAceItem.nodes as AceItem[]}
            height={Math.round(contentRect.height)}
          />
        }
      </Paper>
    )
  }

  return (
    <Paper className={classes.root} ref={contentRef}>
      <PreviewsTable
        rows={allAceItem.nodes as AceItem[]}
        height={Math.round(contentRect.height)}
      />
      <PreviewPanel item={selectedItem} />
    </Paper>
  )
}

PreviewsTableContainer.whyDidYouRender = false

const styled = memo(withStyles(styles, { withTheme: true })(PreviewsTableContainer))

export default styled
