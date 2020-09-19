import { createStyles, TextField, WithStyles, withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { RouteComponentProps } from '@reach/router'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { AceItem } from '../../../typings/autogen'
import { useAuth0 } from '../../contexts/auth0'
import { useSearch } from '../../hooks/use-search'
import { DetailedRow } from '../DetailedRow'
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
      '&>div': {
        marginTop: '1.5rem',
      },
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
    newSearchForm: {
      display: 'flex',
      alignItems: 'middle'
    },
    resultPane: {
      marginBottom: '1rem',
      marginTop: '1rem',
      '&> :first-child': {
        marginBottom: '0.5rem'
      }
    },
  })
}

type ProfileProps = WithStyles<typeof styles> & RouteComponentProps

const Profile: React.FC<ProfileProps> = ({ classes }) => {
  const { user, saveMetadata } = useAuth0()
  const [searchResults, setSearchResults] = useState<Record<string, AceItem[]>>({})
  const searchCatalogue = useSearch()
  const [newSearch, setNewSearch] = useState('')
  const [canSaveNewSearch, setCanSaveNewSearch] = useState(false)
  const newSearchRef = useRef<HTMLInputElement>()

  const savedSearches = useMemo(() => {
    const _savedSearches: string[] = (user[METADATA_KEY] || user.user_metadata).saved_searches ?? []
    _savedSearches.sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
    return _savedSearches
  }, [user])

  useEffect(() => {
    const newSearchResults = savedSearches.reduce((acc, search) => {
      const results = searchCatalogue(search)

      acc[search] = results
      return acc
    }, {} as Record<string, AceItem[]>)
    setSearchResults(newSearchResults)
  }, [savedSearches, searchCatalogue])

  useEffect(() => {
    // Straight off, if it's too short we can't save it
    if (newSearch.length < 5) {
      return setCanSaveNewSearch(false)
    }

    if (savedSearches.includes(newSearch)) {
      return setCanSaveNewSearch(false)
    }

    setCanSaveNewSearch(true)
  }, [newSearch, savedSearches])

  const changeSearchTerm = (existing: string, newTerm: string) => {
    const idx = savedSearches.findIndex(s => s === existing)

    if (idx < 0) {
      return
    }

    const newSearchTerms = newTerm === ''
      ? [...savedSearches.slice(0, idx), ...savedSearches.slice(idx + 1)]
      : [...savedSearches.slice(0, idx), newTerm, ...savedSearches.slice(idx + 1)]

    saveMetadata({ saved_searches: newSearchTerms })
  }

  const saveNewSearch = useCallback(() => {
    const newSearches = [...savedSearches, newSearch]
    newSearches.sort((a, b) => a < b ? -1 : 1)

    saveMetadata({ saved_searches: newSearches })
    setNewSearch('')

  }, [savedSearches, newSearch, saveMetadata])

  return (
    <div className={classes.page}>
      <div className={classes.searchResults}>
        <h1>Saved Searches</h1>
        <div>
          <h2>Add New Search</h2>
          <p>You can add an automatic search, the results of which will show up below. You can search across most fields, including title, publisher and creator.</p>
          <div className={classes.newSearchForm}>
            <TextField
              inputRef={newSearchRef}
              value={newSearch}
              size="small"
              label="Add new search"
              type="text"
              margin="none"
              onChange={(e) => setNewSearch(e.currentTarget.value)}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={!canSaveNewSearch}
              onClick={saveNewSearch}>Save</Button>
          </div>
        </div>
        <div>
          <h2>Search Results</h2>
          {savedSearches.map((searchTerm, idx) =>
            <div key={`${idx}-${searchTerm}`} className={classes.resultPane}>
              <EditableSearchTerm
                searchTerm={searchTerm}
                onTermChanged={(...args) => changeSearchTerm(...args)}
              >
              </EditableSearchTerm>
              {!searchResults[searchTerm]?.length
                ? <p>No results this month</p>
                : searchResults[searchTerm].map(result => <DetailedRow key={result.previewsCode} item={result} searchTerm={searchTerm} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styled = withStyles(styles, { withTheme: true })(Profile)

export { styled as Profile }
