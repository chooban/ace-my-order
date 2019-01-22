import React, { PureComponent } from 'react'
import { debounce } from 'ts-debounce'

import SearchContext from '../search-context'

class SearchBox extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.updateSearch = debounce(this.updateSearch, 250)
  }

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.updateSearch(e.currentTarget.value)
  }

  updateSearch = (s: string) => {
    this.context.updateSearch(s)
  }

  render() {
    return (
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          onChange={this.onChange}
        />
      </div>
    )
  }
}

SearchBox.contextType = SearchContext

export default SearchBox
