/// <reference path="../typings/ace-my-order.d.ts" />

import React from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/styles'
import parse from 'html-react-parser'
import { PreviewsItem } from 'ace-my-order'
import CoverImage from './CoverImage'

import { useFetch } from '../hooks/use-fetch'

const styles = (theme: any) => {
  return createStyles({
    root: {
      paddingRight: '7px',
      paddingLeft: '7px',
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
    description: {
      '& br': {
        display: 'block',
        content: ' '
      }
    }
  })
}

interface PreviewPanelProps extends WithStyles<typeof styles> {
  item: PreviewsItem
}

interface PreviewsDetails {
  description: string,
  creators: string,
  url: string
}
function PreviewPanel({ classes, item }: PreviewPanelProps) {
  const res = useFetch<PreviewsDetails>(`.netlify/functions/get-item?code=${encodeURIComponent(item.code)}`)

  if (res.error) {
    console.error({ e: res.error })
    return (<div><p>Item not found</p></div>)
  }

  const data = res.response

  return (
    <div className={classes.root}>
      <p className={classes.title}>{item.title}{' '}
        <a className={classes.link} target="_blank" rel="noopener noreferrer" href={data ? data.url : undefined}>
          <img alt="Open Previews site" src="/static/open_in_new24px.svg" />
        </a>
      </p>
      <p className={classes.description}>
        <CoverImage item={item} />
        {data ? parse(data.description) : 'Loading...'}
      </p>
      <p>{data ? parse(data.creators) : ''}</p>
    </div>
  )
}

PreviewPanel.whyDidYouRender = true

export default withStyles(styles, { withTheme: true })(PreviewPanel)