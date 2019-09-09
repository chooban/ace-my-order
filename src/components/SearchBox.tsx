import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'

import SearchContext from '../search-context'

const styles = () => {
  return createStyles({
    root: {
      textAlign: 'center'
    }
  })
}

const SearchBox = ({ classes }: WithStyles<typeof styles>) => (
  <SearchContext.Consumer>
    {({ updateSearch }) => (
      <div className={classes.root}>
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          // className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={e => updateSearch(e.currentTarget.value)}
        />
      </div>
    )}
  </SearchContext.Consumer>
)

const styledSearchBox = withStyles(styles, { withTheme: true })(SearchBox)

export { styledSearchBox as SearchBox }
