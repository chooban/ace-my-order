import Paper from '@material-ui/core/Paper'
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles'
import { PreviewsItem } from "ace-my-order"
import React, { memo } from 'react'

import { useClientRect } from '../hooks/'
import PreviewsTable from './PreviewsTable'

const styles = (theme:any) => {
  return createStyles({
    root: {
      width: '100%',
      height: '100%',
      overflowX: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'start',
      paddingLeft: '0.5em',
      paddingTop: '14px',
    },

  })
}

const contentRef = React.createRef<HTMLDivElement>()

function PreviewsTableContainer({ classes, data }: WithStyles<typeof styles> & { data: PreviewsItem[] | null}) {
  const contentRect = useClientRect(contentRef)

  let content
  if (!data) {
    content = (<p>Loading...</p>)
  } else {
    content = (<PreviewsTable rows={data} height={contentRect.height}/>)
  }

  return (
    <Paper className={classes.root} ref={contentRef}>
      {content}
    </Paper>
  )
}

PreviewsTableContainer.whyDidYouRender = false

const styled = memo(withStyles(styles, { withTheme: true })(PreviewsTableContainer))

export { styled as PreviewsTableContainer }
