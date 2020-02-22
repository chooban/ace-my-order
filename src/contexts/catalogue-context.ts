import React, { useContext } from 'react'

import { AceItem } from '../../typings/autogen'

const catalogueContext = React.createContext({
  catalogue: [] as AceItem[],
})

const useCatalogue = () => useContext(catalogueContext)

export default catalogueContext

export {
  useCatalogue
}
