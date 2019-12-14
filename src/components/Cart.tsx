import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import Paper from '@material-ui/core/Paper'
import AssignmentIcon from '@material-ui/icons/Assignment'
import DeleteIcon from '@material-ui/icons/Delete'
import { createStyles,WithStyles, withStyles } from '@material-ui/styles'
import { PreviewsOnlineDetails } from 'ace-my-order'
import he from 'he'
import React from 'react'
import { useHistory } from "react-router"
import { Link } from 'react-router-dom'

import { useOrder } from '../contexts/order-context'
import { useClipboard } from '../hooks/'
import { formatAsGBP } from './lib/format-as-gbp'
import { orderToCsv } from './lib/order-to-csv'

const styles = (theme:any) => {
  return createStyles({
    root: {
      width: '100%',
      padding: '0.5em',
      '&>h1': {
        margin: 0,
        marginTop: '0.5em'
      }
    },
    cartHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'end',
      borderBottom: 'thin solid lightgray',
      paddingRight: '0.5em'
    },
    cartFooter: {
      textAlign: 'right',
      paddingRight: '0.5em'
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
        '&>.description': {
          flexGrow: 1
        },
        '&>.footer': {
          justifySelf: 'flex-end'
        }
      },
      borderBottom: 'thin solid lightgray',
    },
    buttonRow: {
      display: 'flex',
      flexDirection: 'row',
      '&>*:nth-of-type(2)': {
        margin: '0 5px'
      }
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
  })
}

type Props = WithStyles<typeof styles>

function Cart({ classes }: Props) {
  const [{ order }, { removeFromOrder }] = useOrder()
  const history = useHistory()
  const copyToClipboard = useClipboard()

  if (order.length === 0) {
    return (
      <Paper className={classes.root}>
        <p>Nothing added to your cart. Please <Link to="/">go back</Link> and add something.</p>
      </Paper>
    )
  }

  const copyClicked = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault()

    const { currentTarget } = e
    const code = currentTarget.dataset.id
    if (!code) {
      return
    }
    copyToClipboard(code)

    //TODO: Some kind of visual feedback to the user
  }

  const submitOrder = () => {
    const output = orderToCsv(order)
    const blob = new Blob([output], { type: "text/csv;charset=utf-8;" })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'order.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Paper className={classes.root}>
      <h1>Order Contents</h1>

      <div className={classes.cartHeader}>
        <div>Price</div>
      </div>
      {order.map((a) => {
        const retrievedItem = localStorage.getItem(a.code)
        if (!retrievedItem) {
          return null
        }
        const deets = JSON.parse(retrievedItem) as PreviewsOnlineDetails
        if (deets) {
          return (
            <div className={classes.cartItem} key={a.code}>
              <div>
                <img alt="Cover" src={deets.coverThumbnail} />
              </div>
              <div className='details'>
                <Link to={`/item/${encodeURIComponent(a.code)}`}><b>{a.title}</b></Link>
                <p className='description'>{he.decode(deets.description.replace(/<[^>]+>/g, '')).substring(0, 150)}&hellip;</p>
                <div className='footer'>
                  <Button variant="contained" size="small" color="secondary" onClick={() => removeFromOrder(a)}>Remove</Button>
                </div>
              </div>
              <div>{formatAsGBP(a.price).value}</div>
            </div>
          )
        }
      })}
      <div className={classes.cartFooter}>
        <b>Total ({order.length} items): </b> {formatAsGBP(order.reduce((acc, curr) => acc += curr.price, 0)).value}
      </div>

      <div className={classes.buttonRow}>
        <Button variant="contained" color="primary" onClick={() => history.push('/')}>Continue shopping</Button>
        <Button variant="contained" color="secondary" onClick={submitOrder}>Export order</Button>
      </div>
    </Paper>
  )
}

Cart.whyDidYouRender = true

const StyledCart = withStyles(styles, { withTheme: true })(Cart)
export { StyledCart as Cart }
