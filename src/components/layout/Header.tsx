import Paper from '@material-ui/core/Paper'
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles'
import { Link } from 'gatsby'
import React from 'react'

import { useOrder } from '../../contexts/order-context'
import { AccountIcon } from '../AccountIcon'

const styles = () => {
  return createStyles({
    root: {
      width: '100%',
      marginTop: '7px',
      marginBottom: '7px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0 7px 0 7px'
    },
    title: {
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      fontSize: '3em',
      fontWeight: 500,
      color: '#000',
      margin: '5px 0'
    },
    iconContainer: {
      marginLeft: 'auto',
      display: 'flex',
      flexDirection: 'row',
      height: 32,
      alignItems: 'center',
      justifyContent: 'center'
    },
    cart: {
      '&::after': {
        content: '\'\'',
        display: 'inline-block',
        position: 'relative',
        top: '-15px',
        right: '10px',
        width: '12px',
        height: '12px',
        '-moz-border-radius': '12px',
        '-webkit-border-radius': '12px',
        borderRadius: '12px',
        backgroundColor: 'red',
        visibility: 'hidden'
      },
    },
    hasItems: {
      '&::after': {
        visibility: 'visible'
      }
    }
  })
}

const Header = ({ classes }: WithStyles<typeof styles>) => {
  const [{ order }] = useOrder()

  return (
    <Paper className={classes.root}>
      <Link className={classes.title} to={'/'}>My Ace Order</Link>
      <div className={classes.iconContainer}>
        <div>
          <Link to="/cart">
            <i className={`material-icons ${classes.cart} ${order.length ? classes.hasItems : ''}` }>
        shopping_cart
            </i>
          </Link>
        </div>
        <div>
          <AccountIcon />
        </div>
      </div>
    </Paper>
  )}

const styled = withStyles(styles, { withTheme: true })(Header)

export { styled as Header }
