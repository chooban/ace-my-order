import { Router } from '@reach/router'
import React from 'react'

import PrivateRoute from '../components/app/PrivateRoute'
import { Profile } from '../components/profile/Profile'

const App = () => (
  <Router>
    <PrivateRoute path="/app/profile" component={Profile} />
  </Router>
)
export default App
