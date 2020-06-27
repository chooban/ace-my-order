import { createStyles, WithStyles, withStyles } from '@material-ui/core'
import { navigate, RouteComponentProps } from '@reach/router'
import { default as auth0API } from 'auth0-js'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useCallback, useEffect, useState } from 'react'

import { AceItem, AllItemsProfileQuery } from '../../../typings/autogen'
import { useAuth0 } from '../../contexts/auth0'
import { searchCatalogue } from '../../lib/search-catalogue'
import { EditableSearchTerm } from './EditableSearchTerm'

// Not sure why this is prefixed rather than normalized, but I'll work around it for now.
const METADATA_KEY = 'https://ace.rosshendry.com/user_metadata'

const styles = () => {
  return createStyles({
    page: {
      width: '100%',
      height: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'start',
      paddingLeft: '0.5em',
      paddingTop: '14px',
      overflow: 'hidden',
    },
    searchResults: {
      width: '100%',
      flexDirection: 'column',
      '& .editableSearch': {
        fontSize: '1.3rem',
        fontWeight: 500
      }
    },
    searchTerm: {
      '&:hover': {
        cursor: 'pointer'
      }
    },
  })
}

type ProfileProps = WithStyles<typeof styles> & RouteComponentProps

const Profile: React.FC<ProfileProps> = ({ classes }) => {
  const { user, getTokenSilently } = useAuth0()
  const { allAceItem: { nodes } } = useStaticQuery<AllItemsProfileQuery>(query)
  const [savedSearches, setSavedSearches] = useState<string[]>(user[METADATA_KEY].saved_searches ?? [])
  const [searchResults, setSearchResults] = useState<Record<string, AceItem[]>>({})

  // getTokenSilently().then((token) => {
  //   const domain = process.env.GATSBY_AUTH0_DOMAIN || ''
  //   const managementAPI = new auth0API.Management({
  //     domain,
  //     token
  //   })

  //   managementAPI.getUser(user.sub, (err, result) => {
  //     // console.log('Management result', { result })
  //     if (err) {
  //       console.error(err)
  //     } else {
  //       setSavedSearches(result.user_metadata.saved_searches ?? [])
  //     }
  //   })
  // })

  useEffect(() => {
    const newSearchResults = savedSearches.reduce((acc, search) => {
      const results = searchCatalogue(search, nodes as AceItem[])

      acc[search] = results
      return acc
    }, {} as Record<string, AceItem[]>)
    setSearchResults(newSearchResults)
  }, [savedSearches, nodes])

  const changeSearchTerm = (existing: string, newTerm: string) => {
    console.log(`Changed search from from ${existing} to ${newTerm}`)
    console.log(`Looking in ${savedSearches}`)
    const idx = savedSearches.findIndex(s => s === existing)

    if (idx < 0) {
      console.log('Search term not found')
      return
    }

    let newSearchTerms = []
    if (newTerm === '') {
      newSearchTerms = [...savedSearches.slice(0, idx), ...savedSearches.slice(idx + 1)]
    } else {
      newSearchTerms = [...savedSearches.slice(0, idx), newTerm, ...savedSearches.slice(idx + 1)]
    }
    setSavedSearches(newSearchTerms)
  }

  return (
    <div className={classes.page}>
      <div className={classes.searchResults}>
        <h1>Saved Searches</h1>
        {savedSearches.map((searchTerm, idx) => {
          return (
            <div key={`${idx}-${searchTerm}`}>
              <EditableSearchTerm
                searchTerm={searchTerm}
                onTermChanged={(...args) => changeSearchTerm(...args)}
              />
              {!searchResults[searchTerm]?.length
                ? <p>No results this month</p>
                : searchResults[searchTerm].map((result, idx) =>
                  <p
                    key={`${searchTerm}-${idx}`}
                    className={classes.searchTerm}
                    onClick={() => navigate(`/item/${result.previewsCode.replace('/', '-')}?search=${encodeURIComponent(searchTerm)}`)}
                  >
                    {result.title}
                  </p>
                )}
            </div>
          )
        })}

      </div>
    </div>
  )
}

const query = graphql`
  query AllItemsProfile {
    allAceItem {
      nodes {
        id
        title
        previewsCode
        price
        publisher
        slug
        previews {
          creators
        }
      }
    }
  }
`

const styled = withStyles(styles, { withTheme: true })(Profile)

export { styled as Profile }
