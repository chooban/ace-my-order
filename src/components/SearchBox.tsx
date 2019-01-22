import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'
import { debounce } from 'ts-debounce'

import SearchContext from '../search-context'

class SearchBox extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.updateSearch = debounce(this.updateSearch, 250)
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.updateSearch(e.currentTarget.value)
  }

  updateSearch = (s: string) => {
    this.context.updateSearch(s)
  }

  render() {
    return (
      <div className="search-box">
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          // className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.onChange}
        />
      </div>
    )
  }
}

SearchBox.contextType = SearchContext

export default SearchBox
