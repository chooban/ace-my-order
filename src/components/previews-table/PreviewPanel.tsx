import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { createStyles, WithStyles, withStyles } from '@material-ui/styles'
import { navigate } from 'gatsby'
import parse from 'html-react-parser'
import React from 'react'

import { AceItem } from '../../../typings/autogen'
import { useOrder } from '../../contexts/order-context'

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
      overflowY: 'auto',
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
  item?: AceItem
  unselectItem?: () => void
}

interface PreviewPanelProps extends WithStyles<typeof styles> {
  item: AceItem,
  unselectItem?: () => void
}

function PreviewPanel({ classes, item }: PreviewPanelProps) {
  const [{ order }, { addToOrder, removeFromOrder }] = useOrder()

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
        <a
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.previewsworld.com/Catalog/${item.previews?.id}`}
        >
          <img alt="Open Previews site" src="/static/open_in_new24px.svg" />
        </a>
      </div>
      <>
        <div className={classes.panel}>
          <div className={classes.cover}>
            <img alt="Cover" src={item.previews?.coverThumbnail ?? undefined} />
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
            {parse(item.previews?.description ?? '')}
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
