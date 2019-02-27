import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'

import SearchContext from '../search-context'

export const SearchBox = () => (
  <SearchContext.Consumer>
    {({ updateSearch }) => (
      <div className="search-box">
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
