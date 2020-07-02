import { createStyles, WithStyles, withStyles } from '@material-ui/core'
import { navigate, RouteComponentProps } from '@reach/router'
import React, { useEffect, useState } from 'react'

import { AceItem } from '../../../typings/autogen'
import { useAuth0 } from '../../contexts/auth0'
import { useOrder } from '../../contexts/order-context'
import { useSearch } from '../../hooks/use-search'
import { EditableSearchTerm } from './EditableSearchTerm'

// Not sure why this is prefixed rather than normalized, but I'll work around it for now.
const METADATA_KEY = 'https://ace.rosshendry.com/user_metadata'

const styles = (theme: any) => {
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
    resultPane: {
      marginBottom: '1rem',
      '&> :first-child': {
        marginBottom: '0.5rem'
      }
    },
    row: {
      display: 'grid',
      gridTemplateColumns: 'auto 10px 80px',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'lightgray',
        verticalAlign: 'middle'
      },
      paddingTop: '0.25em',
      paddingBottom: '0.25em'
    },
    inCart: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      content: '\'done\'',
      color: 'green',
      fontWeight: 'bold',
      fontFamily: 'Material Icons',
      position: 'relative',
      visibility: 'hidden'
    },
    cellTitle: {
      display: 'flex',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    cellTitleContents: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textAlign: 'left',
      fontWeight: 500,
    },
    cellPublisher: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      fontSize: 'smaller',
      [theme.breakpoints.down('md')]: {
        textOverflow: 'ellipsis',
      },
    },
    cellPrice: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      marginRight: '0.5em',
      verticalAlign: 'bottom',
      textAlign: 'right'
    },
  })
}

type ProfileProps = WithStyles<typeof styles> & RouteComponentProps

const Profile: React.FC<ProfileProps> = ({ classes }) => {
  const { user, saveMetadata } = useAuth0()
  const [savedSearches, setSavedSearches] = useState<string[]>(user[METADATA_KEY].saved_searches ?? [])
  const [searchResults, setSearchResults] = useState<Record<string, AceItem[]>>({})
  const [{ order }] = useOrder()
  const searchCatalogue = useSearch()

  useEffect(() => {
    const newSearchResults = savedSearches.reduce((acc, search) => {
      const results = searchCatalogue(search)

      acc[search] = results
      return acc
    }, {} as Record<string, AceItem[]>)
    setSearchResults(newSearchResults)
  }, [savedSearches, searchCatalogue])

  const changeSearchTerm = (existing: string, newTerm: string) => {
    const idx = savedSearches.findIndex(s => s === existing)

    if (idx < 0) {
      return
    }

    const newSearchTerms = newTerm === ''
      ? [...savedSearches.slice(0, idx), ...savedSearches.slice(idx + 1)]
      : [...savedSearches.slice(0, idx), newTerm, ...savedSearches.slice(idx + 1)]

    setSavedSearches(newSearchTerms)
    saveMetadata({ saved_searches: newSearchTerms })
  }

  return (
    <div className={classes.page}>
      <div className={classes.searchResults}>
        <h1>Saved Searches</h1>
        {savedSearches.map((searchTerm, idx) => {
          return (
            <div key={`${idx}-${searchTerm}`} className={classes.resultPane}>
              <EditableSearchTerm
                searchTerm={searchTerm}
                onTermChanged={(...args) => changeSearchTerm(...args)}
              />
              {!searchResults[searchTerm]?.length
                ? <p>No results this month</p>
                : searchResults[searchTerm].map((result, idx) =>{

                  const inCart = order.some((i) => i.previewsCode === result.previewsCode)
                  return (
                    <div key={`${searchTerm}-${idx}`} className={classes.row}
                      onClick={() => navigate(`/item/${result.previewsCode.replace('/', '-')}?search=${encodeURIComponent(searchTerm)}`)}
                    >
                      <div className={classes.cellTitle}>
                        <span
                          className={classes.cellTitleContents}
                        >{result.title}</span>
                      </div>
                      <i
                        className={`materical-icons ${classes.inCart}`}
                        style={inCart ? { visibility: 'visible' } : {}}
                      >done</i>
                      <div className={classes.cellPrice}>{result.price > 0 ? '£' + result.price.toFixed(2) : '\u2014' }</div>
                      <div className={classes.cellPublisher}>{result.publisher}</div>
                    </div>
                  )
                }
                )}
            </div>
          )
        })}

      </div>
    </div>
  )
}

const styled = withStyles(styles, { withTheme: true })(Profile)

export { styled as Profile }
