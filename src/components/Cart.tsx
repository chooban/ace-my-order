/// <reference path="../typings/ace-my-order.d.ts" />

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { createStyles,WithStyles, withStyles } from '@material-ui/styles'
import React from 'react'
import { useHistory } from "react-router"

import { OrderActionType, useOrder } from '../contexts/order-context'

const styles = (theme:any) => {
  return createStyles({
    root: {
      width: '100%',
      height: '100%',
      padding: '0.5em',
    }
  })
}

type Props = WithStyles<typeof styles>

function Cart({ classes }: Props) {
  const [{ order }, dispatch] = useOrder()
  const history = useHistory()

  return (
    <Paper className={classes.root}>
      <h1>Order Contents</h1>

      <table>
        <thead>
          <tr>
            <th>Previews</th>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.map((a) => (
            <tr key={a.code}>
              <td>{a.code}</td>
              <td>{a.title}</td>
              <td>{a.price}</td>
              <td>
                <Button variant="contained" color="default" onClick={() => dispatch({
                  type: OrderActionType.Remove,
                  payload: a
                })}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <Button variant="contained" color="primary" onClick={() => history.push('/')}>Continue shopping</Button>
        <Button variant="contained" color="secondary">Export order</Button>
      </div>
    </Paper>
  )
}

Cart.whyDidYouRender = true

const StyledCart = withStyles(styles, { withTheme: true })(Cart)
export { StyledCart as Cart }
