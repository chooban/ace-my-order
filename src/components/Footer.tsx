import React from 'react'

import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

const styles = () => {
  return createStyles({
    root: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '7px',
      marginBottom: '7px',
      padding: '0 7px 0 7px',
      textAlign: 'center',
    },
    copyright: {
      fontSize: '12px'
    }
  })
}

const Footer = ({ classes }: WithStyles<typeof styles>) => (
  <Paper className={classes.root}>
    <p>
      <Link to="/">Home</Link>
      {' '}• <Link to="/about">About</Link>
      {' '}• <Link to="/privacy">Privacy</Link>
      {' '}• <Link to="/contact">Contact</Link>
    </p>
    <p className={classes.copyright}>All names, trademarks and images are copyright their respective owners.</p>
  </Paper>
)

const styled = withStyles(styles, { withTheme: true })(Footer)

export { styled as Footer }
