/// <reference path="../typings/ace-my-order.d.ts" />

import React from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/styles'
import parse from 'html-react-parser'
import { PreviewsItem } from 'ace-my-order'

import { useFetch } from '../hooks/use-fetch'

const styles = (theme: any) => {
  return createStyles({
    root: {
      paddingRight: '7px',
      paddingLeft: '7px'
    },
    title: {
      fontWeight: 700
    },
    link: {
      '& img': {
        height: '14px',
        display: 'inline-block',
        verticalAlign: 'middle',
        marginBottom: '3px'
      }
    },
    cover: {
      width: '10vw',
      float: 'left',
      marginRight: '7px'
    }
  })
}

interface PreviewPanelProps extends WithStyles<typeof styles> {
  item: PreviewsItem
}

function PreviewPanel({ classes, item }: PreviewPanelProps) {
  const res = useFetch(`.netlify/functions/get-item?code=${encodeURIComponent(item.code)}`)

  if (res.error) {
    console.error({ e: res.error })
    return (<div><p>Item not found</p></div>)
  } else if (!res.response) {
    return (<div><p>Loading...</p></div>)
  }
  const data: any = res.response

  return (
    <div className={classes.root}>
      <p className={classes.title}>{item.title}{' '}
        <a className={classes.link} target="_blank" rel="noopener noreferrer" href={data.url}>
          <img alt="Open Previews site" src="/static/open_in_new24px.svg" />
        </a>
      </p>
      <p>
        <img alt="Cover" className={classes.cover} src={data.coverImage} />
        {parse(data.description)}
      </p>
      <p>{parse(data.creators)}</p>
    </div>
  )
}

PreviewPanel.whyDidYouRender = true

export default withStyles(styles, { withTheme: true })(PreviewPanel)
