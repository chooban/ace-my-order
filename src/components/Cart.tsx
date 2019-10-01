/// <reference path="../typings/ace-my-order.d.ts" />

import React from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles, WithStyles, createStyles } from '@material-ui/styles'

import { useOrder } from '../contexts/order-context'

const styles = (theme:any) => {
  return createStyles({
    root: {
      width: '100%',
      height: '100%',
      padding: '0.5em',
    }
  })
}

function Cart({ classes }: WithStyles<typeof styles>) {
  const [{ order }] = useOrder()

  return (
    <Paper className={classes.root}>
      Order:
      {order.map((a) => (
        <div key={a.code}>
          {a.title}
        </div>
      ))}
    </Paper>
  )
}

Cart.whyDidYouRender = true

const StyledCart = withStyles(styles, { withTheme: true })(Cart)

export { StyledCart as Cart }
