import Paper from '@material-ui/core/Paper'
import { createStyles, useTheme, WithStyles, withStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { PreviewsItem } from "ace-my-order"
import React, { memo } from 'react'
import { useRouteMatch } from "react-router-dom"

import { useCatalogue } from '../../contexts/catalogue-context'
import { useClientRect } from '../../hooks'
import PreviewPanel from './PreviewPanel'
import PreviewsTable from './PreviewsTable'

const styles = (theme:any) => {
  return createStyles({
    root: {
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

const contentRef = React.createRef<HTMLDivElement>()

function PreviewsTableContainer({ classes }: WithStyles<typeof styles>) {
  const contentRect = useClientRect(contentRef)
  const theme = useTheme()
  const isPresumedMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const { catalogue } = useCatalogue()
  const match = useRouteMatch("/item/:slug")

  if (catalogue.length < 1) {
    return (
      <Paper className={classes.root} ref={contentRef}>
        <p>Loading...</p>
      </Paper>
    )
  }

  let selectedItem: PreviewsItem|undefined = undefined
  if (match && match.params.slug) {
    const codeToFind = decodeURIComponent(match.params.slug)
    selectedItem = catalogue.find(i => i.code === codeToFind)
  }

  if (isPresumedMobile) {
    return (
      <Paper className={classes.root} ref={contentRef}>
        {selectedItem
          ? <PreviewPanel item={selectedItem} />
          : <PreviewsTable
            rows={catalogue}
            height={Math.round(contentRect.height)}
          />
        }
      </Paper>
    )
  }

  return (
    <Paper className={classes.root} ref={contentRef}>
      <PreviewsTable
        rows={catalogue}
        height={Math.round(contentRect.height)}
      />
      <PreviewPanel item={selectedItem} />
    </Paper>
  )
}

PreviewsTableContainer.whyDidYouRender = false

const styled = memo(withStyles(styles, { withTheme: true })(PreviewsTableContainer))

export { styled as PreviewsTableContainer }
