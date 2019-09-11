import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import SearchContext from '../search-context'

const styles = () => {
  return createStyles({
    root: {
      width: '75vw',
      maxWidth: '1000px',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '7px',
      marginBottom: '7px',
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      padding: '0 7px 0 7px'
    },
    title: {
      whiteSpace: 'nowrap'
    },
    search: {
      marginLeft: 'auto'
    }
  })
}

const Header = ({ classes }: WithStyles<typeof styles>) => (
  <Paper className={classes.root}>
    <div><h1 className={classes.title}>My Ace Order</h1></div>
    <SearchContext.Consumer>
      {({ updateSearch }) => (
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          className={classes.search}
          margin="normal"
          variant="outlined"
          onChange={e => updateSearch(e.currentTarget.value)}
        />
      )}
    </SearchContext.Consumer>
  </Paper>
)

const styled = withStyles(styles, { withTheme: true })(Header)

export { styled as Header }
