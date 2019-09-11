/// <reference path="../typings/ace-my-order.d.ts" />

import React from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import PreviewsTable from './PreviewsTable'
import { useFetch } from '../hooks/use-fetch'
import { useClientRect } from '../hooks/use-client-rect'

import { PreviewsItem } from "ace-my-order"

const styles = (theme:any) => {
  return createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        width: '100vw'
      },
      width: '75vw',
      height: '83vh',
      maxWidth: '1000px',
      overflowX: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'start',
      paddingLeft: '0.5em',
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
