import React, { useContext } from 'react'

const catalogueContext = React.createContext({
  catalogue: [] as PreviewsItem[],
})

const useCatalogue = () => useContext(catalogueContext)

export default catalogueContext

export {
  useCatalogue
}
