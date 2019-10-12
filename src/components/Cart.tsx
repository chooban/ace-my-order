import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import DeleteIcon from '@material-ui/icons/Delete'
import { createStyles,WithStyles, withStyles } from '@material-ui/styles'
import React from 'react'
import { useHistory } from "react-router"
import { Link } from 'react-router-dom'

import { OrderActionType, useOrder } from '../contexts/order-context'
import { formatAsGBP } from './lib/format-as-gbp'

const styles = (theme:any) => {
  return createStyles({
    root: {
      width: '100%',
      height: '100%',
      padding: '0.5em',
    },
    cartTable: {
      display: 'table',
      width: '100%',
      maxWidth: '600px',
      marginBottom: '1em',
      '&>div:first-of-type': {
        display: 'table-row',
        '& div': {
          display: 'table-cell',
          verticalAlign: 'middle',
          fontWeight: 'bold'
        }
      },
      '& div': {
        display: 'table-row',
        '& div': {
          display: 'table-cell',
          verticalAlign: 'middle'
        }
      }
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
    }
  })
}

type Props = WithStyles<typeof styles>

function Cart({ classes }: Props) {
  const [{ order }, dispatch] = useOrder()
  const history = useHistory()

  if (order.length === 0) {
    return (
      <Paper className={classes.root}>
        <p>Nothing added to your cart. Please <Link to="/">go back</Link> and add something.</p>
      </Paper>
    )
  }

  return (
    <Paper className={classes.root}>
      <h1>Order Contents</h1>

      <div className={classes.cartTable}>
        <div id={'header'}>
          <div>Previews</div>
          <div>Title</div>
          <div>Price</div>
        </div>
        {order.map((a) => (
          <div key={a.code}>
            <div>{a.code}</div>
            <div>{a.title}</div>
            <div>{formatAsGBP(a.price).value}</div>
            <div>
              <DeleteIcon
                className={classes.deleteIcon}
                onClick={() => dispatch({
                  type: OrderActionType.Remove,
                  payload: a
                })} />
            </div>
          </div>
        ))}
      </div>

      <div className={classes.buttonRow}>
        <Button variant="contained" color="primary" onClick={() => history.push('/')}>Continue shopping</Button>
        <Button variant="contained" color="secondary">Export order</Button>
      </div>
    </Paper>
  )
}

Cart.whyDidYouRender = true

const StyledCart = withStyles(styles, { withTheme: true })(Cart)
export { StyledCart as Cart }
