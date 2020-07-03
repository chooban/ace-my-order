import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import { AceItem, SearchIndexQuery } from '../../typings/autogen'

function useSearch(): (searchTerm: string) => AceItem[] {
  const { allAceItem: { nodes } } = useStaticQuery<SearchIndexQuery>(query)
  const publisherOrTitleMatches = (regex: RegExp) =>
    (d: any) => regex.test(`${d.title} ${d.publisher} ${d.previews?.creators}`)

  return React.useCallback((searchTerm: string) => {
    if (!searchTerm || searchTerm.trim().length < 3) {
      return nodes as AceItem[]
    }
    const terms = searchTerm.split(' ')
    const regex = terms
      .map((t) => `(?=.*${t})`)
      .reduce((a, b) => a + b, '')

    const re = new RegExp(regex, 'i')

    return nodes.filter(publisherOrTitleMatches(re)) as AceItem[]
  }, [nodes])
}

const query = graphql`
  query SearchIndex {
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
          description
          creators
          coverThumbnail
        }
      }
    }
  }
`

export { useSearch }
