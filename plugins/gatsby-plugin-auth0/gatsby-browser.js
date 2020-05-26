import { navigate } from 'gatsby'
import React from 'react'

import { Auth0Provider } from './auth'

const onRedirectCallback = (appState) =>
  appState && appState.targetUrl && navigate(appState.targetUrl)

export const wrapRootElement = ({ element }, pluginOptions) => {
  return (
    <Auth0Provider
      domain={pluginOptions.domain}
      client_id={pluginOptions.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens={pluginOptions.useRefreshTokens}
    >
      {element}
    </Auth0Provider>
  )
}
