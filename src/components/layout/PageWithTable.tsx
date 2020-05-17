import '../../index.css'

import { createStyles, Paper, withStyles } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import React, { useState } from 'react'

import SEO from '../../components/seo'
import { OrderProvider } from '../../contexts/order-context'
import SearchContext from '../../contexts/search-context'
import { useClientRect } from '../../hooks'
import theme from '../../theme'
import PreviewsTable from '../previews-table/PreviewsTable'
import { Footer } from './Footer'
import { Header } from './Header'

const styles = (theme: any) => {
  return createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
      },
      width: '75vw',
      height: '100vh',
      maxWidth: '1000px',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'column',
      '.body': {
        flexGrow: 1
      }
    },
    page: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'start',
      paddingLeft: '0.5em',
      paddingTop: '14px',
      overflow: 'hidden'
    },
  })
}

const contentRef = React.createRef<HTMLDivElement>()
function PageWithTable({ classes, children }: any) {
  const [searchValue, setSearchValue] = useState('')
  const contentRect = useClientRect(contentRef)

  return (
    <>
      <SEO />
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <OrderProvider>
          <SearchContext.Provider value={{ searchValue, updateSearch: setSearchValue }}>
            <div className={classes.root}>
              <Header />
              <Paper className={classes.page} ref={contentRef}>
                <PreviewsTable height={Math.round(contentRect.height)} />
                {children}
              </Paper>
              <Footer/>
            </div>
          </SearchContext.Provider>
        </OrderProvider>
      </MuiThemeProvider>
    </>
  )
}

const styled = withStyles(styles, { withTheme: true })(PageWithTable)

export { styled as PageWithTable }
