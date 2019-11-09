import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { createStyles, WithStyles, withStyles } from '@material-ui/styles'
import { PreviewsItem, PreviewsOnlineDetails } from 'ace-my-order'
import parse from 'html-react-parser'
import React from 'react'

import { useOrder } from '../../contexts/order-context'
import { useFetch } from '../../hooks'

const styles = (theme: any) => {
  return createStyles({
    root: {
      paddingRight: '7px',
      paddingLeft: '7px',
    },
    dismiss: {
      display: 'none',
      padding: 0,
      paddingRight: 12,
      right: 0,
      [theme.breakpoints.down('xs')]: {
        display: 'unset',
      },
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
      float: 'left',
      marginRight: '7px'
    },
    buttons: {
      clear: 'both'
    },
    button: {
      margin: theme.spacing(1),
      marginLeft: 0
    },
  })
}

interface WrapperProps extends WithStyles<typeof styles> {
  item?: PreviewsItem
  unselectItem?: () => void
}

interface PreviewPanelProps extends WithStyles<typeof styles> {
  item: PreviewsItem,
  unselectItem?: () => void
}

function PreviewPanel({ classes, item, unselectItem }:PreviewPanelProps) {
  const res = useFetch<PreviewsOnlineDetails>(`.netlify/functions/get-item?code=${encodeURIComponent(item.code)}`)
  const [{ order }, { addToOrder, removeFromOrder }] = useOrder()

  const inCart = order.some(i => i.code === item.code)

  if (res.error) {
    console.error({ e: res.error })
    return (<div><p className={classes.title}>Item not found</p></div>)
  }

  const data = res.response

  return (
    <div className={classes.root}>
      <p className={classes.title}>
        <IconButton className={classes.dismiss} onClick={unselectItem}>
          <ArrowBack color='action'/>
        </IconButton>
        {item.title}{' '}
        <a
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
          href={data ? data.url.url : undefined}
        >
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
            {data.creators &&
              <p>{parse(data.creators)}</p>
            }
          </div>
          <div className={classes.buttons}>
            {inCart ?
              <Button
                variant="contained"
                className={classes.button}
                color="secondary"
                onClick={() => removeFromOrder(item)}
              >Remove from order</Button>
              :
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
                onClick={() => addToOrder(item)}
              >Add to order</Button>
            }
          </div>
        </>
      )}
    </div>
  )
}

PreviewPanel.whyDidYouRender = true

const PreviewPanelWrapper: React.FC<WrapperProps> = (props) => {
  if (!props.item) {
    return <p style={{ marginTop: 0 }}>Please select an item</p>
  }
  return <PreviewPanel item={props.item} {...props} />
}

export default React.memo(withStyles(styles, { withTheme: true })(PreviewPanelWrapper))
