import createAuth0Client from '@auth0/auth0-spa-js'
import { default as auth0API } from 'auth0-js'
import React, { useContext, useEffect, useState } from 'react'


/* eslint-disable @typescript-eslint/no-empty-function */
const defaultContext = {
  isAuthenticated: false,
  user: null,
  loading: false,
  popupOpen: false,
  loginWithPopup: () => {},
  handleRedirectCallback: () => {},
  getIdTokenClaims: () => {},
  loginWithRedirect: () => {},
  getTokenSilently: () => {},
  getTokenWithPopup: () => {},
  logout: () => {},
}
/* eslint-enable */

export const Auth0Context = React.createContext(defaultContext)
export const useAuth0 = () => useContext(Auth0Context)
export const Auth0Provider = ({
  children,
  onRedirectCallback,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [auth0Client, setAuth0] = useState({})
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions)
      setAuth0(auth0FromHook)

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated()

      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser()
        setUser(user)
      }
      setLoading(false)
    }
    initAuth0()
    // eslint-disable-next-line
  }, [])

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true)
    try {
      await auth0Client.loginWithPopup(params)
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }
    const user = await auth0Client.getUser()
    setUser(user)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setLoading(true)
    await auth0Client.handleRedirectCallback()
    const user = await auth0Client.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    setUser(user)
  }

  const saveMetadata = async (metadata) => {
    const domain = process.env.GATSBY_AUTH0_DOMAIN || ''
    const token = await auth0Client.getTokenSilently()
    const user = await auth0Client.getUser()
    const managementAPI = new auth0API.Management({
      domain,
      token
    })
    managementAPI.patchUserMetadata(user.sub, metadata, (err, result) => {
      if (err) {
        console.error(err)
      } else {
        setUser(result)
      }
    })
  }

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p),
        saveMetadata,
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
