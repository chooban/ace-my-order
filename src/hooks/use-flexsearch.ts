import FlexSearch, { Index, SearchOptions } from 'flexsearch'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function useFlexSearch<T>(query: string, providedIndex: string, store: any, searchOptions?: SearchOptions): [Promise<Array<T>>, (i: string) => Promise<Array<T>>] {
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

  const results = useMemo(async () => {
    if (!query || !index || !store) return []

    const rawResults = await index.search(query, searchOptions)

    return rawResults.map(id => store[id])
  }, [query, index, store, searchOptions])

  const search = useCallback(async (myQuery: string) => {
    if (!myQuery || !index || !store) return Promise.resolve([])

    const rawResults = await index.search(myQuery, searchOptions)
    return rawResults.map(id => store[id])
  }, [index, store, searchOptions])

  return [results, search]
}
