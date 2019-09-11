/// <reference path="../typings/ace-my-order.d.ts" />

import React, { useState, CSSProperties, memo } from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import { FixedSizeList as List, areEqual } from 'react-window'

import SearchContext from '../search-context'
import PreviewPanel from './PreviewPanel'

import { PreviewsItem } from "ace-my-order"

const styles = (theme: any) => {
  return createStyles({
    contentPanel: {
      width: '60%',
      textAlign: 'left',
      height: '600px',
      overflowY: 'scroll'
    },
    column: {
      display: 'flex',
      flexDirection: 'column'
    },
    row: {
      display: 'grid',
      gridTemplateColumns: 'auto 80px',
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
        {({ searchValue }) => {
          const catalogue = searchValue.length > 3
            ? searchCatalogue(searchValue, rows)
            : rows

          return (
            <List
              height={Math.round(height)}
              itemCount={catalogue.length}
              itemSize={50}
              width={'60%'}
              style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '14px'}}
            >
              {({ index, style }: any) =>
                (<Row row={catalogue[index]} style={style} classes={classes} setSelectedItem={setSelectedItem}/>)
              }
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
    </>
  )
}

const Row = memo(({ row, classes, style, setSelectedItem }: RowProps) => (
  <div className={classes.row} style={style}>
    <div className={classes.cellTitle} onClick={() => setSelectedItem(row)}><span>{row.title}</span></div>
    <div className={classes.cellPrice}>{row.price > 0 ? '£' + row.price.toFixed(2) : '\u2014' }</div>
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
