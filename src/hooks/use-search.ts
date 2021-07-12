import { graphql, useStaticQuery } from 'gatsby'

import { AceItem, SearchIndexQuery } from '../../typings/autogen'
import { useFetch } from '.'
// import React from 'react'
import { useFlexSearch } from './use-flexsearch'

function useSearch(searchTerm: string): Promise<AceItem[]> {
  const { allAceItem: { nodes: defaultResults }, localSearchCatalogue } = useStaticQuery<SearchIndexQuery>(query)

  const { response: searchIndex, isLoading: indexIsLoading } = useFetch<string>(localSearchCatalogue?.publicIndexURL || '', 'text')
  const { response: searchStore, isLoading: storeIsLoading } = useFetch<Record<string, unknown>>(localSearchCatalogue?.publicStoreURL || '', 'json')

  const results = useFlexSearch(searchTerm, searchIndex as string, searchStore)

  if (
    (indexIsLoading || storeIsLoading)
    || (!searchTerm || searchTerm.trim().length <= 3)
  ) {
    return Promise.resolve(defaultResults as AceItem[])
  }

  return results
}

const query = graphql`
  query SearchIndex {
    localSearchCatalogue {
      publicIndexURL
      publicStoreURL
    }
    allAceItem {
      nodes {
        id
        title
        previewsCode
        price
        publisher
        slug
        previews {
          id
          creators
        }
      }
    }
  }
`

export { useSearch }
