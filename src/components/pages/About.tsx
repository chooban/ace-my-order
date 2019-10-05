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
    },
  })
}

function About({ classes }: WithStyles<typeof styles>) {
  return (
    <Paper className={classes.root}>
      <h2>About</h2>
      <p>The site is aimed at people who use the services of Ace Comics to
      order their comic books. Specifically, if for those of us who order
      from the Previews catalogue and send in a CSV order every month.</p>

      <p>Rather than paging through a long list in a text editor or
      spreadsheet application, this makes it a little easier to search for
      the things you want, as well as double checking by showing you the
      details from Preview itself.</p>

      <p>Using the site is very straightforward and you've probably already
      worked out that you add things to the cart, open the cart, export the
      order and send it to Ace in the usual way. Please note that you do
      still have to email the file to Ace, the site won't do that for
      you.</p>

      <h2>Accounts</h2>

      <p><b>Important Note</b>: This is entirely separate to any account functionality
      that might exist on Ace's own site. This is purely for the order
      helper.</p>

      <p>By creating an account you can start adding Saved Searches. With these in
      place, you can see which ones have matches in the current catalogue,
      hopefully reducing the number of times you miss something. Since I stick to
      TPBs these days, I've also been using it to add searches for collections that
      I know won't appear for months yet. </p>

      <p>I'll probably add new features at some point, but let me know if there's a
      killer feature you'd like.</p>
    </Paper>
  )

}

const styled = withStyles(styles, { withTheme: true })(About)

export { styled as About }
