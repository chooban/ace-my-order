import React from 'react'

export default React.createContext({
  searchValue: '',
  // eslint-disable-next-line
  updateSearch: (searchValue: string) => {
    // no-op
  }
})
