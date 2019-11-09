import Paper from '@material-ui/core/Paper'
import { createStyles, useTheme, WithStyles, withStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { PreviewsItem } from "ace-my-order"
import React, { memo, useCallback, useState } from 'react'

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
    contentPanel: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
      width: '60%',
      textAlign: 'left',
      paddingLeft: '5px'
    },

  })
}

const contentRef = React.createRef<HTMLDivElement>()

function PreviewsTableContainer({ classes, data }: WithStyles<typeof styles> & { data: PreviewsItem[] | null}) {
  const contentRect = useClientRect(contentRef)
  const [selectedItem, setSelectedItem] = useState<PreviewsItem | undefined>(undefined)
  const theme = useTheme()
  const isPresumedMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const unsetSelectedItem = useCallback(
    () => setSelectedItem(undefined),
    [setSelectedItem]
  )

  if (!data) {
    return (
      <Paper className={classes.root} ref={contentRef}>
        <p>Loading...</p>
      </Paper>
    )
  }

  if (isPresumedMobile) {
    return (
      <Paper className={classes.root} ref={contentRef}>
        {selectedItem
          ? <div className={classes.contentPanel}>
            <PreviewPanel
              item={selectedItem}
              unselectItem={unsetSelectedItem}
            />
          </div>
          : <PreviewsTable
            rows={data}
            setSelectedItem={setSelectedItem}
            height={Math.round(contentRect.height)}
          />
        }
      </Paper>
    )
  }

  return (
    <Paper className={classes.root} ref={contentRef}>
      <PreviewsTable
        rows={data}
        setSelectedItem={(i: PreviewsItem) => setSelectedItem(i)}
        height={Math.round(contentRect.height)}
      />
      <div className={classes.contentPanel}>
        <PreviewPanel
          item={selectedItem}
          unselectItem={unsetSelectedItem}
        />
      </div>
    </Paper>
  )
}

PreviewsTableContainer.whyDidYouRender = false

const styled = memo(withStyles(styles, { withTheme: true })(PreviewsTableContainer))

export { styled as PreviewsTableContainer }
