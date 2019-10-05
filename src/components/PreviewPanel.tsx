/// <reference path="../typings/ace-my-order.d.ts" />

import Button from '@material-ui/core/Button'
import { createStyles, WithStyles, withStyles } from '@material-ui/styles'
import { PreviewsItem, PreviewsOnlineDetails } from 'ace-my-order'
import parse from 'html-react-parser'
import React from 'react'

import { OrderActionType, useOrder } from '../contexts/order-context'
import { useFetch } from '../hooks/'

const styles = (theme: any) => {
  return createStyles({
    root: {
      paddingRight: '7px',
      paddingLeft: '7px',
    },
    title: {
      marginTop: 0,
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
    },
    cover: {
      width: '10vw',
      minWidth: '100px',
      maxWidth: '200px',
      minHeight: '150px',
      float: 'left',
      marginRight: '7px'
    },
    button: {
      margin: theme.spacing(1),
    },
  })
}

interface PreviewPanelProps extends WithStyles<typeof styles> {
  item: PreviewsItem
}

function PreviewPanel({ classes, item }: PreviewPanelProps) {
  const res = useFetch<PreviewsOnlineDetails>(`.netlify/functions/get-item?code=${encodeURIComponent(item.code)}`)
  const [, dispatch] = useOrder()

  if (res.error) {
    console.error({ e: res.error })
    return (<div><p className={classes.title}>Item not found</p></div>)
  }

  const data = res.response

  return (
    <div className={classes.root}>
      <p className={classes.title}>{item.title}{' '}
        <a className={classes.link} target="_blank" rel="noopener noreferrer" href={data ? data.url : undefined}>
          <img alt="Open Previews site" src="/static/open_in_new24px.svg" />
        </a>
      </p>
      {data === null ? (
        <p className={classes.description}>
          <img alt="Cover" className={classes.cover} src='/static/1x1.png'/>
          Loading...
        </p>
      ) : (
        <>
          <div className={classes.description}>
            <img alt="Cover" className={classes.cover} src={data.coverImage} />
            {parse(data.description)}
          </div>
          <p>{parse(data.creators)}</p>
          <div>
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              onClick={() => dispatch({ type: OrderActionType.Add, payload: item })}
            >
              Add to order
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              color="secondary"
              onClick={() => dispatch({ type: OrderActionType.Remove, payload: item })}
            >
              Remove from order
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

PreviewPanel.whyDidYouRender = true

export default withStyles(styles, { withTheme: true })(PreviewPanel)
