import './index.css'

import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { render } from 'react-dom'

import App from './App'
import * as serviceWorker from './serviceWorker'

const theme = createMuiTheme({
})

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React)
}

function Root() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  )
}

render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
