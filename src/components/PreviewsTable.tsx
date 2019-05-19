/// <reference path="../typings/ace-my-order.d.ts" />

import React, { useState, CSSProperties, memo } from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Paper from '@material-ui/core/Paper'
import { FixedSizeList as List, areEqual } from 'react-window'

import SearchContext from '../search-context'
import PreviewPanel from './PreviewsPreview'

import { PreviewsItem } from "ace-my-order"

const styles = (theme: any) => {
  return createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        width: '100vw'
      },
      width: '75vw',
      marginTop: 3,
      overflowX: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'start'
    },
    contentPanel: {
      width: '40%',
      textAlign: 'left'
    },
    column: {
      display: 'flex',
      flexDirection: 'column'
    },
    row: {
      display: 'grid',
      gridTemplateColumns: 'auto 120px 120px',
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: 'auto 80px',
      },
      height: '50px'
    },
    cellTitle: {
      [theme.breakpoints.down('md')]: {
        textOverflow: 'ellipsis',
      },
      textAlign: 'left',
      paddingLeft: '0.5em',
      '& span:hover': {
        cursor: 'pointer',
      }
    },
    cellPublisher: {
      [theme.breakpoints.down('md')]: {
        textOverflow: 'ellipsis',
        width: '30vw'
      },
      marginRight: '0.5em',
    },
    cellPrice: {
      marginLeft: '0.5em',
      marginRight: '0.5em'
    }
  })
}

function searchCatalogue(searchTerm: string, catalogue: PreviewsItem[]) {
  const publisherOrTitleMatches = (regex: RegExp) =>
    (d: PreviewsItem) => regex.test(`${d.title} ${d.publisher}`)

  const terms = searchTerm.split(' ')
  const regex = terms
    .map((t) => `(?=.*${t})`)
    .reduce((a, b) => a + b, '')

  const re = new RegExp(regex, 'i')

  return catalogue.filter(publisherOrTitleMatches(re))
}

function PreviewsTable(props: PreviewsTableProps) {
  const { classes, rows } = props
  const [selectedItem, setSelectedItem] = useState<PreviewsItem | undefined>(undefined)

  return (
    <Paper className={classes.root}>
      <SearchContext.Consumer>
        {({ searchValue }) => {
          const catalogue = searchValue.length > 3
            ? searchCatalogue(searchValue, rows)
            : rows

          return (
            <List
              height={600}
              itemCount={catalogue.length}
              itemSize={50}
              width={'60%'}
              style={{marginLeft: 'auto', marginRight: 'auto'}}
            >
              {({ index, style }: any) => {
                const row = catalogue[index]
                return (<Row row={row} style={style} classes={classes} setSelectedItem={setSelectedItem}/>)
              }}
            </List>
          )
        }}
      </SearchContext.Consumer>
      <div className={classes.contentPanel}>
        {selectedItem
          ? <PreviewPanel item={selectedItem} />
          : <p>Please select an item</p>
        }
      </div>
    </Paper>
  )
}

const Row = memo(({ row, classes, style, setSelectedItem }: RowProps) => (
  <div className={classes.row} style={style}>
    <div className={classes.cellTitle} onClick={() => setSelectedItem(row)}><span>{row.title}</span></div>
    <div className={classes.cellPrice}>{row.price > 0 ? '£' + row.price.toFixed(2) : '\u2014' }</div>
    <Hidden xsDown>
      <div>{row.publisher}</div>
    </Hidden>
  </div>
)
, areEqual)

interface PreviewsTableProps extends WithStyles<typeof styles> {
  rows: PreviewsItem[]
}

interface RowProps extends WithStyles<typeof styles> {
  row: PreviewsItem,
  style: CSSProperties,
  setSelectedItem: (arg0: PreviewsItem) => void
}

PreviewsTable.whyDidYouRender = false

export default withStyles(styles, { withTheme: true })(PreviewsTable)
