import { createStyles, withStyles } from '@material-ui/core/styles'
import React from 'react'

import { AllItemsIndexQuery } from '../../typings/autogen'
import PreviewPanel from '../components/previews-table/PreviewPanel'

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

const Index: React.FC<OwnProps> = ({ classes, data }) => {
  return (
    <PreviewPanel />
  )
}

const styled = withStyles(styles, { withTheme: true })(Index)

export default styled
