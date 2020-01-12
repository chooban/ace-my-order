import { RouteComponentProps } from '@reach/router'
import { Router } from '@reach/router'
import React from 'react'

import Cart from '../components/cart'
import { Page } from '../components/layout'

const Index: React.FC = () => {
  return (
    <Page>
      <Router>
        <Cart path="/app/cart" />
        <Default path="/app" />
        <NotFound default />
      </Router>
    </Page>
  )
}

const Default: React.FC<RouteComponentProps> = () => {
  return (<p>This is the index, fool</p>)
}

const NotFound: React.FC<RouteComponentProps> = () => {
  return (<p>Page not found</p>)
}
export default Index
