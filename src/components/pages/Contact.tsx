import Paper from '@material-ui/core/Paper'
import { createStyles,WithStyles, withStyles } from '@material-ui/core/styles'
import React from 'react'

const styles = () => {
  return createStyles({
    root: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '7px',
      marginBottom: '7px',
      alignContent: 'center',
      padding: '0 7px 0 7px',
      flexGrow: 1
    }
  })
}

function Contact({ classes }: WithStyles<typeof styles>) {
  return (
    <Paper className={classes.root}>
      <h2>Contact</h2>
      <p>You can contact me via <a href="mailto:rhendry@googlemail.com">email</a> or over{' '}
        <a href="https://twitter.com/choobanicus">Twitter</a>.</p>
    </Paper>
  )
}

const styled = withStyles(styles, { withTheme: true })(Contact)

export { styled as Contact }
