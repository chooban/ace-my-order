import React, { PureComponent } from 'react'
import { debounce } from 'ts-debounce'

import SearchContext from '../search-context'

const SearchBox: React.SFC = () => {
  return (
    <SearchContext.Consumer>
      {({ searchValue, updateSearch }) => {
        return (
          <div className="search-box">
            <input
              type="text"
              value={searchValue}
              placeholder="Search..."
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                updateSearch(e.currentTarget.value)
              }}
            />
          </div>
        )
      }}
    </SearchContext.Consumer>
  )
}

export default SearchBox
