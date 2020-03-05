import { Paper, useMediaQuery } from '@material-ui/core'
import { createStyles, useTheme, withStyles } from '@material-ui/core/styles'
import React from 'react'

import { AllItemsIndexQuery } from '../../typings/autogen'
import { Page } from '../components/layout'
import PreviewPanel from '../components/previews-table/PreviewPanel'
import PreviewsTable from '../components/previews-table/PreviewsTable'
import { useClientRect } from '../hooks'

const styles = (theme:any) => {
  return createStyles({
    root: {
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

interface OwnProps {
  classes: any,
  data: AllItemsIndexQuery
}

const contentRef = React.createRef<HTMLDivElement>()
const Index: React.FC<OwnProps> = ({ classes, data }) => {
  const contentRect = useClientRect(contentRef)
  const theme = useTheme()
  const isPresumedMobile = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Page>
      <Paper className={classes.root} ref={contentRef}>
        <PreviewsTable height={Math.round(contentRect.height)} />
        {!isPresumedMobile ? <PreviewPanel /> : null}
      </Paper>
    </Page>
  )
}

const styled = withStyles(styles, { withTheme: true })(Index)

export default styled
