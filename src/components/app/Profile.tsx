import { createStyles, WithStyles, withStyles } from '@material-ui/core'
import { navigate, RouteComponentProps } from '@reach/router'
import { default as auth0API } from 'auth0-js'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import { AceItem, AllItemsProfileQuery } from '../../../typings/autogen'
import { useAuth0 } from '../../contexts/auth0'
import { searchCatalogue } from '../../lib/search-catalogue'

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
    },
    searchTerm: {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  })
}

type ProfileProps = WithStyles<typeof styles> & RouteComponentProps

const Profile: React.FC<ProfileProps> = ({ classes }) => {
  const { user, getTokenSilently, getIdTokenClaims } = useAuth0()
  const { allAceItem: { nodes } } = useStaticQuery<AllItemsProfileQuery>(query)
  const { saved_searches } = user[METADATA_KEY]

  getIdTokenClaims().then((claims) => {
    console.log({ claims })
  })
  getTokenSilently().then((token) => {
    const domain = process.env.GATSBY_AUTH0_DOMAIN || ''
    console.log({ domain, token })
    const managementAPI = new auth0API.Management({
      domain,
      token
    })

    console.log({ managementAPI, sub: user.sub })
    managementAPI.getUser(user.sub, (result: any) => {
      console.log({ result })
    })
  })

  const searchResults = (saved_searches as string[]).reduce((acc, search) => {
    const results = searchCatalogue(search, nodes as AceItem[])

    acc[search] = results
    return acc
  }, {} as Record<string, AceItem[]>)

  return (
    <div className={classes.page}>
      <div className={classes.searchResults}>
        {saved_searches.map((search: string) => {
          return (
            <div key={search}>
              <h2
                key={search}
                className={classes.searchTerm}
                onClick={() => navigate(`/?search=${encodeURIComponent(search)}`)}
              >
                {search}
              </h2>
              {searchResults[search].length === 0
                ? <p>No results this month</p>
                : searchResults[search].map((result, idx) =>
                  <p
                    key={`${search}-${idx}`}
                    className={classes.searchTerm}
                    onClick={() => navigate(`/item/${result.previewsCode.replace('/', '-')}?search=${encodeURIComponent(search)}`)}
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
      }
    }
  }
`

const styled = withStyles(styles, { withTheme: true })(Profile)

export { styled as Profile }
