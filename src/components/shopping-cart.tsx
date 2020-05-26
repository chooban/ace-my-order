import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { RouteComponentProps } from '@reach/router'
import { Link, navigate } from 'gatsby'
import he from 'he'
import React from 'react'

import { useOrder } from '../contexts/order-context'
import { useClipboard } from '../hooks'
import { formatAsGBP } from '../lib/format-as-gbp'
import { orderToCsv } from '../lib/order-to-csv'

const styles = () => {
  return createStyles({
    cartHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      borderBottom: 'thin solid lightgray',
      paddingRight: '0.5em'
    },
    cartFooter: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      margin: '0.5em',
      '& div': {
        padding: '0 0.5em 0.5em 0.5em',
        borderBottom: 'thin solid lightgray',
      }
    },
    cartItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      '&>div': {
        padding: '0.5em'
      },
      '&>.details': {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        '&>.footer': {
          justifySelf: 'flex-end'
        },
        '&>.title':{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          '& > svg': {
            cursor: 'pointer'
          }
        },
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

function Cart({ classes }: WithStyles<typeof styles> & RouteComponentProps) {
  const [{ order }, { removeFromOrder }] = useOrder()
  const copyToClipboard = useClipboard()

  if (order.length === 0) {
    return (
      <p>Nothing added to your cart. Please <Link to="/">go back</Link> and add something.</p>
    )
  }

  const copyClicked = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault()

    const { currentTarget } = e
    const code = currentTarget.dataset.id
    if (! code) {
      return
    }
    copyToClipboard(code)
    const flash = currentTarget.parentNode?.querySelector('.fadeout') as HTMLElement
    flash.style.transition = 'all 2s ease-in-out'
    flash.style.visibility = 'visible'
    flash.style.opacity = '0'

    flash.addEventListener('transitionend', () => {
      flash.style.transition = ''
      flash.style.visibility = 'hidden'
      flash.style.opacity = '1'
    })
  }

  const submitOrder = () => {
    const output = orderToCsv(order)
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'order.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <h1>Order Contents</h1>

      <div className={classes.cartHeader}>
        <div>Price</div>
      </div>
      {order.map((a) => {
        return (
          <div className={classes.cartItem} key={a.previewsCode}>
            <div>
              <img alt="Cover" src={a.previews?.coverThumbnail || ''} />
            </div>
            <div className='details'>
              <div className='title'>
                <Link to={`/item/${encodeURIComponent(a.previewsCode)}`}><b>{a.title}</b></Link>
                <Hidden xsDown>
                  <AssignmentIcon fontSize={'small'} data-id={a.previewsCode} onClick={copyClicked} />
                  <span className={`fadeout ${classes.fadeout}`}>Copied to clipboard</span>
                </Hidden>
              </div>
              {
                a.previews?.description
                  ? <p className='description'>{he.decode(a.previews.description.replace(/<[^>]+>/g, '')).substring(0, 150)}&hellip;</p>
                  : <p className='description'></p>
              }
              <div className='footer'>
                <Button variant="contained" size="small" color="secondary" onClick={() => removeFromOrder(a)}>Remove</Button>
              </div>
            </div>
            <div>{ a.price ? formatAsGBP(a.price).value : '-'}</div>
          </div>
        )
      })}
      <div className={classes.cartFooter}>
        <div>
          <b>Total ({order.length} items): </b> {formatAsGBP(order.reduce((acc, curr) => acc += curr.price ?? 0, 0)).value}
        </div>
      </div>

      <div className={classes.buttonRow}>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>Continue shopping</Button>
        <Button variant="contained" color="secondary" onClick={submitOrder}>Export order</Button>
      </div>
    </>
  )
}

export default withStyles(styles, { withTheme: true })(Cart)
