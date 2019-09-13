import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

import SearchContext from '../contexts/search-context'

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
      color: '#000'
    },
    search: {
      marginLeft: 'auto'
    }
  })
}

const Header = ({ classes }: WithStyles<typeof styles>) => (
  <Paper className={classes.root}>
    <Link className={classes.title} to={'/'}>My Ace Order</Link>
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
