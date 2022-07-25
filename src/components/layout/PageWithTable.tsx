import '../../index.css'

import { createStyles, Paper, withStyles } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { navigate } from 'gatsby'
import React, { createRef, useEffect, useState } from 'react'

import SEO from '../../components/seo'
import { OrderProvider } from '../../contexts/order-context'
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
    },
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
      overflow: 'hidden'
    },
  })
}

const contentRef = createRef<HTMLDivElement>()

const defaultSearch = (s: string) => {
  console.log(s)
  return
}

export const UpdateSearchContext = React.createContext(defaultSearch)

function PageWithTable({ classes, children, search = '', location }: any) {
  const [searchValue, setSearchValue] = useState(search)
  const contentRect = useClientRect(contentRef)
  const updateSearch = React.useCallback((s: string) => setSearchValue(s), [setSearchValue])

  useEffect(() => {
    if (searchValue.length) {
      navigate(`${location}?search=${encodeURIComponent(searchValue)}`, { replace: true })
    }
    else {
      navigate(`${location}`, { replace: true })
    }
  }, [location, searchValue])

  return (
    <>
      <SEO />
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <OrderProvider>
          <div className={classes.root}>
            <Header />
            <Paper className={classes.page} ref={contentRef}>
              <PreviewsTable
                searchValue={searchValue}
                updateSearch={updateSearch}
                height={Math.round(contentRect.height)}
              />
              <UpdateSearchContext.Provider value={updateSearch}>
                {children}
              </UpdateSearchContext.Provider>
            </Paper>
            <Footer />
          </div>
        </OrderProvider>
      </MuiThemeProvider>
    </>
  )
}

const styled = withStyles(styles, { withTheme: true })(PageWithTable)

export { styled as PageWithTable }
