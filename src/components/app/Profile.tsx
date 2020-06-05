import { RouteComponentProps } from '@reach/router'
import React from 'react'

import { useAuth0 } from '../../contexts/auth0'

export const Profile: React.FC<RouteComponentProps> = () => {
  const { user } = useAuth0()
  return (<>{JSON.stringify(user.user_metadata, null, 2)}</>)
}
