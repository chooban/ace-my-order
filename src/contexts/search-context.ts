import React from 'react'

export default React.createContext({
  searchValue: '',
  updateSearch: (s: string) => {}
})
