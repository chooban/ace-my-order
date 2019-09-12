import React from 'react'

import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const styles = () => {
  return createStyles({
    root: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '7px',
      marginBottom: '7px',
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      padding: '0 7px 0 7px'
    },
    copyright: {
      textAlign: 'center',
      fontSize: '12px'
    }
  })
}

const Footer = ({ classes }: WithStyles<typeof styles>) => (
  <Paper className={classes.root}>
    <p className={classes.copyright}>All names, trademarks and images are copyright their respective owners.</p>
  </Paper>
)

const styled = withStyles(styles, { withTheme: true })(Footer)

export { styled as Footer }
