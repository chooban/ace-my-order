import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { createStyles, WithStyles, withStyles } from '@material-ui/styles'
import { navigate } from 'gatsby'
import parse from 'html-react-parser'
import React from 'react'

import { AceItem } from '../../../typings/autogen'
import { useOrder } from '../../contexts/order-context'
import { useClipboard } from '../../hooks'

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
      height: '100%',
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
        height: '18px',
        display: 'inline-block',
        verticalAlign: 'middle',
        marginBottom: '3px',
        paddingLeft: '4px'
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
      overflowY: 'auto',
    },
    cover: {
      flex: '0 0 1em',
      height: 'auto',
      marginRight: '7px'
    },
    blankCover: {
      display: 'inline-block',
      width: '120px',
      lineHeight: '180px',
      backgroundColor: 'black',
      color: 'lightgray',
      fontSize: '5rem',
      textAlign: 'center',
      verticalAlign: 'middle',
      marginBottom: '4px'
    },
    button: {
      minWidth: '120px',
      width: '100%',
    },
    fadeout: {
      visibility: 'hidden',
      opacity: 1,
    },
  })
}

interface WrapperProps extends WithStyles<typeof styles> {
  item?: AceItem
  unselectItem?: () => void
}

interface PreviewPanelProps extends WithStyles<typeof styles> {
  item: AceItem,
  unselectItem?: () => void
}

function PreviewPanel({ classes, item }: PreviewPanelProps) {
  const [{ order }, { addToOrder, removeFromOrder }] = useOrder()
  const copyToClipboard = useClipboard('id')

  const inCart = order.some(i => i.previewsCode === item.previewsCode)

  return (
    <div className={classes.panelRoot}>
      <div className={classes.titleWrapper}>
        <IconButton className={classes.dismiss} onClick={() => navigate('/')}>
          <ArrowBack color='action'/>
        </IconButton>
        <span>
          {item.title}
        </span>
        {item.previews?.id &&
          <a
            className={classes.link}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Previews site"
            href={`https://www.previewsworld.com/Catalog/${item.previews.id}`}
          >
            <img alt="Open Previews site" src="/static/open_in_new24px.svg" />
          </a>
        }
        <AssignmentIcon fontSize={'small'} data-id={item.previewsCode} onClick={copyToClipboard} />
        <span className={`fadeout ${classes.fadeout}`}>Copied to clipboard</span>
      </div>
      <>
        <div className={classes.panel}>
          <div className={classes.cover}>
            {item.previews?.coverThumbnail
              ? <img alt="Cover" src={item.previews.coverThumbnail} />
              : <span className={classes.blankCover}>?</span>
            }
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
                onClick={() => {
                  console.log(addToOrder)
                  addToOrder(item)
                }}
              >Add</Button>
            }
          </div>
          <div>
            {parse(item.previews?.description ?? item.title)}
            {item.previews?.creators &&
              <p>{parse(item.previews?.creators)}</p>
            }
          </div>
        </div>
      </>
    </div>
  )
}

PreviewPanel.whyDidYouRender = false

const PreviewPanelWrapper: React.FC<WrapperProps> = (props) => {
  if (!props.item) {
    return (<div className={props.classes.panelRoot}>
      <p style={{ marginTop: 0 }}>Please select an item</p>
    </div>)
  }
  return <PreviewPanel item={props.item} {...props} />
}

export default React.memo(withStyles(styles, { withTheme: true })(PreviewPanelWrapper))
