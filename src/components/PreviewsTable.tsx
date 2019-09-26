/// <reference path="../typings/ace-my-order.d.ts" />

import React, { useState, CSSProperties, memo } from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import { FixedSizeList as List, areEqual } from 'react-window'
import Hidden from '@material-ui/core/Hidden'

import SearchContext from '../contexts/search-context'
import PreviewPanel from './PreviewPanel'

import { PreviewsItem } from "ace-my-order"

const styles = (theme: any) => {
  return createStyles({
    listingPanel: {
      width: '40%',
      display: 'flex',
      flexDirection: 'column'
    },
    contentPanel: {
      width: '60%',
      textAlign: 'left',
      overflowY: 'scroll',
      paddingLeft: '5px'
    },
    search: {
      marginBottom: '10px'
    },
    column: {
      display: 'flex',
      flexDirection: 'column'
    },
    row: {
      display: 'grid',
      gridTemplateColumns: 'auto 80px',
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: 'auto',
      },
      height: '50px'
    },
    cellTitle: {
      [theme.breakpoints.down('md')]: {
        textOverflow: 'ellipsis',
      },
      textAlign: 'left',
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
  const { classes, rows, height } = props
  const [selectedItem, setSelectedItem] = useState<PreviewsItem | undefined>(undefined)

  return (
    <>
      <SearchContext.Consumer>
        {({ searchValue, updateSearch }) => {
          const catalogue = searchValue.length > 3
            ? searchCatalogue(searchValue, rows)
            : rows

          return (
            <>
              <div className={classes.listingPanel}>
                <TextField
                  id="outlined-search"
                  label="Filter"
                  type="search"
                  className={classes.search}
                  margin="none"
                  variant="outlined"
                  onChange={e => updateSearch(e.currentTarget.value)}
                />
                <List
                  height={Math.round(height)}
                  itemCount={catalogue.length}
                  itemSize={50}
                  width={'100%'}
                  style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  {({ index, style }: any) =>
                    (<Row row={catalogue[index]} style={style} classes={classes} setSelectedItem={setSelectedItem}/>)
                  }
                </List>
              </div>
            </>
          )
        }}
      </SearchContext.Consumer>
      <div className={classes.contentPanel}>
        {selectedItem
          ? <PreviewPanel item={selectedItem} />
          : <p style={{marginTop: 0}}>Please select an item</p>
        }
      </div>
    </>
  )
}

const Row = memo(({ row, classes, style, setSelectedItem }: RowProps) => (
  <div className={classes.row} style={style}>
    <div className={classes.cellTitle} onClick={() => setSelectedItem(row)}><span>{row.title}</span></div>
    <Hidden xsDown>
      <div className={classes.cellPrice}>{row.price > 0 ? '£' + row.price.toFixed(2) : '\u2014' }</div>
    </Hidden>
  </div>
)
, areEqual)

interface PreviewsTableProps extends WithStyles<typeof styles> {
  height: number
  rows: PreviewsItem[]
}

interface RowProps extends WithStyles<typeof styles> {
  row: PreviewsItem,
  style: CSSProperties,
  setSelectedItem: (arg0: PreviewsItem) => void
}

PreviewsTable.whyDidYouRender = true

export default memo(withStyles(styles, { withTheme: true })(PreviewsTable))
