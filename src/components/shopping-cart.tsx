import Button from '@material-ui/core/Button'
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles'
import { RouteComponentProps } from '@reach/router'
import { Link, navigate } from 'gatsby'
import React from 'react'

import { useOrder } from '../contexts/order-context'
import { formatAsGBP } from '../lib/format-as-gbp'
import { orderToCsv } from '../lib/order-to-csv'
import { DetailedRow } from './DetailedRow'

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

  const [{ order }] = useOrder()

  if (order.length === 0) {
    return (
      <p>Nothing added to your cart. Please <Link to="/">go back</Link> and add something.</p>
    )
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
      {order.map((a) =>
        <DetailedRow key={a.previewsCode} item={a} />
      )}
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
