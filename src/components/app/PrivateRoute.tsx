import { navigate } from 'gatsby'
import React from 'react'

import { useAuth0 } from '../../../plugins/gatsby-plugin-auth0'

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { isAuthenticated } = useAuth0()
  if (!isAuthenticated) {
    navigate('/')
    return null
  }
  return <Component {...rest} />
}
export default PrivateRoute