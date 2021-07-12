import FlexSearch, { Index, SearchOptions } from 'flexsearch'
import { useEffect, useMemo, useState } from 'react'

export const useFlexSearch = (query: string, providedIndex: string, store: any, searchOptions?: SearchOptions) => {
  const [index, setIndex] = useState<Index<any>|null>(null)

  useEffect(() => {
    if (!providedIndex) {
      setIndex(null)
      return
    }

    const importedIndex = FlexSearch.create()
    importedIndex.import(providedIndex)

    setIndex(importedIndex)
  }, [providedIndex])

  return useMemo(async () => {
    if (!query || !index || !store) return []

    const rawResults = await index.search(query, searchOptions)

    return rawResults.map(id => store[id])
  }, [query, index, store, searchOptions])
}
