import { Button } from '@material-ui/core'
import Hidden from '@material-ui/core/Hidden'
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { Link } from 'gatsby'
import he from 'he'
import React from 'react'

import { AceItem } from '../../typings/autogen'
import { PreviewPanelFlags } from '../components/previews-table/PreviewPanel'
import { useOrder } from '../contexts/order-context'
import { useClipboard } from '../hooks'
import { formatAsGBP } from '../lib/format-as-gbp'

const DetailedRow = ({ item: a, searchTerm, classes }: WithStyles<typeof styles> & { item: AceItem, searchTerm?: string }) => {

  const [{ order }, { addToOrder, removeFromOrder }] = useOrder()
  const copyToClipboard = useClipboard('id')

  const inCart = order.some((i) => i.previewsCode === a.previewsCode)

  return (
    <div className={classes.cartItem} key={a.previewsCode}>
      <div className={'cover'}>
        {a.previews?.coverThumbnail
          ? <img alt="Cover" src={a.previews?.coverThumbnail || ''} />
          : <p>No cover</p>
        }
      </div>
      <div className='details'>
        <div className='title'>
          <Link to={`/item/${a.previewsCode.replace('/', '-')}${searchTerm ? `?search=${searchTerm}` : ''}`}><b>{a.previews?.title}</b></Link>
          <Hidden xsDown>
            {' '}<PreviewPanelFlags item={a.previews} />
            <AssignmentIcon fontSize={'small'} data-id={a.previewsCode} onClick={copyToClipboard} />
            <span className={`fadeout ${classes.fadeout}`}>Copied to clipboard</span>
          </Hidden>
        </div>
        {
          a.previews?.description
            ? <p className='description'>{he.decode(a.previews.description.replace(/<[^>]+>/g, '')).substring(0, 200)}&hellip;</p>
            : <p className='description'>{a.previews?.title}</p>
        }
        <div className='footer'>
          {inCart ?
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => removeFromOrder(a)}
            >Remove</Button>
            :
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => addToOrder(a)}
            >Add</Button>
          }
        </div>
      </div>
      <div className="price">{a.price ? formatAsGBP(a.price).value : '-'}</div>
    </div>
  )
}

const styles = () => {
  return createStyles({
    cartItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      '&>div': {
        padding: '0.5em'
      },
      '&>.cover > img': {
        width: '100px',
        objectFit: 'contain'
      },
      '&>.cover > p': {
        width: '100px',
        textAlign: 'center',
        verticalAlign: 'middle'
      },
      '&>.details': {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        '&>.title': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          '& > svg': {
            cursor: 'pointer'
          }
        },
        '&>.footer': {
          marginTop: 'auto',
          marginBottom: '0.5em',
          justifySelf: 'flex-end'
        },
      },
      '&>.price': {
        textAlign: 'center',
        minWidth: '55px'
      },
      borderBottom: 'thin solid lightgray',
    },
    buttonRow: {
      display: 'flex',
      flexDirection: 'row',
      '&>*:nth-of-type(2)': {
        margin: '0 5px'
      },
      marginBottom: '0.5rem'
    },
    deleteIcon: {
      '&:hover': {
        cursor: 'pointer'
      }
    },
    copyIcon: {
      position: 'relative',
      top: '3px',
      fontSize: '16px',
      '&:hover': {
        cursor: 'pointer'
      }
    },
    fadeout: {
      visibility: 'hidden',
      opacity: 1,
    },
  })
}
const StyledRow = withStyles(styles, { withTheme: true })(DetailedRow)

export { StyledRow as DetailedRow }
