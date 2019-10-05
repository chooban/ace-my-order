import Paper from '@material-ui/core/Paper'
import { createStyles,WithStyles, withStyles } from '@material-ui/core/styles'
import React from 'react'
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
      textAlign: 'center'
    },
    smaller: {
      fontSize: '12px'
    }
  })
}

const Footer = ({ classes }: WithStyles<typeof styles>) => (
  <Paper className={classes.root}>
    <p>
      <Link to="/">Home</Link> • <Link to="/about">About</Link> • <Link to="/privacy">Privacy</Link>{' '}
      • <Link to="/contact">Contact</Link>
    </p>
    <p className={classes.smaller}>
      All names, trademarks and images are copyright their respective owners.<br />

      favicons made by{' '}
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
        Freepik
      </a>{' '}
      from{' '}
      <a href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </a>
    </p>
  </Paper>
)

const styled = withStyles(styles, { withTheme: true })(Footer)

export { styled as Footer }
