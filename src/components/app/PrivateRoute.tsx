import { navigate } from 'gatsby'
import React from 'react'

import { useAuth0 } from '../../../plugins/gatsby-plugin-auth0'

const PrivateRoute = ({ component: Component, ...rest }: any): JSX.Element => {
  const { isAuthenticated } = useAuth0()
  if (!isAuthenticated) {
    navigate('/')
    return <></>
  }
  return <Component {...rest} />
}
export default PrivateRoute
