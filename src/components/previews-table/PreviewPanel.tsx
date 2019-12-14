import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { createStyles, WithStyles, withStyles } from '@material-ui/styles'
import parse from 'html-react-parser'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { useOrder } from '../../contexts/order-context'
import { useFetch } from '../../hooks'

const styles = (theme: any) => {
  return createStyles({
    panelRoot: {
      paddingRight: '7px',
      paddingLeft: '7px',
      paddingBottom: '7px',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        paddingLeft: 0
      },
      width: '60%',
      height: '100%'
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
    titleWrapper: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 0,
      marginBottom: '1em',
      '& :nth-child(2)': {
        fontWeight: 700,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    },
    link: {
      '& img': {
        height: '14px',
        display: 'inline-block',
        verticalAlign: 'middle',
        marginBottom: '3px'
      }
    },
    panel: {
      display: 'flex',
      flexDirection: 'row',
      '& br': {
        display: 'block',
        content: ' '
      },
      height: 'inherit',
      overflowY: 'scroll'
    },
    cover: {
      flex: '0 0 1em',
      height: 'auto',
      marginRight: '7px'
    },
    button: {
      minWidth: '125px',
      width: '100%',
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

function PreviewPanel({ classes, item }: PreviewPanelProps) {
  const res = useFetch<PreviewsOnlineDetails>(`/.netlify/functions/get-item?code=${encodeURIComponent(item.code)}`)
  const [{ order }, { addToOrder, removeFromOrder }] = useOrder()
  const history = useHistory()

  const inCart = order.some(i => i.code === item.code)

  if (res.error) {
    console.error({ e: res.error })
    return (<div><p>Item not found</p></div>)
  }

  const data = res.response
  if (data) {
    localStorage.setItem(item.code, JSON.stringify(data))
  }

  return (
    <div className={classes.panelRoot}>
      <div className={classes.titleWrapper}>
        <IconButton className={classes.dismiss} onClick={() => history.push('/')}>
          <ArrowBack color='action'/>
        </IconButton>
        <span>
          {item.title}
        </span>
        <a
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
          href={data ? data.url.url : undefined}
        >
          <img alt="Open Previews site" src="/static/open_in_new24px.svg" />
        </a>
      </div>
      {data === null ? (
        <p className={classes.panel}>
          <img alt="Cover" className={classes.cover} src='/static/1x1.png'/>
          Loading...
        </p>
      ) : (
        <>
          <div className={classes.panel}>
            <div className={classes.cover}>
              <img alt="Cover" src={data.coverThumbnail} />
              {inCart ?
                <Button
                  variant="contained"
                  className={classes.button}
                  color="secondary"
                  onClick={() => removeFromOrder(item)}
                >Remove</Button>
                :
                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  onClick={() => addToOrder(item)}
                >Add</Button>
              }
            </div>
            <div>
              {parse(data.description)}
              {data.creators &&
              <p>{parse(data.creators)}</p>
              }
            </div>
          </div>
        </>
      )}
    </div>
  )
}

PreviewPanel.whyDidYouRender = true

const PreviewPanelWrapper: React.FC<WrapperProps> = (props) => {
  if (!props.item) {
    return (<div className={props.classes.panelRoot}>
      <p style={{ marginTop: 0 }}>Please select an item</p>
    </div>)
  }
  return <PreviewPanel item={props.item} {...props} />
}

export default React.memo(withStyles(styles, { withTheme: true })(PreviewPanelWrapper))
