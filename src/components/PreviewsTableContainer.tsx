/// <reference path="../typings/ace-my-order.d.ts" />

import React from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import PreviewsTable from './PreviewsTable'
import { useFetch, useClientRect } from '../hooks/'

import { PreviewsItem } from "ace-my-order"

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
function PreviewsTableContainer({ classes }: WithStyles<typeof styles>) {
  const res = useFetch<PreviewsItem[]>('.netlify/functions/latest')
  const contentRect = useClientRect(contentRef)

  let content = undefined
  if (res.error) {
    console.error(res.error)
    content = (<p>Error. Sorry</p>)
  } else if (res.isLoading) {
    content = (<p>Loading...</p>)
  } else if (res.response) {
    content = (<PreviewsTable rows={res.response} height={contentRect.height}/>)
  }

  return (
    <Paper className={classes.root} ref={contentRef}>
      {content}
    </Paper>
  )
}

PreviewsTableContainer.whyDidYouRender = false

const styled = withStyles(styles, { withTheme: true })(PreviewsTableContainer)

export { styled as PreviewsTableContainer }
