/// <reference path="../typings/ace-my-order.d.ts" />

import React, { useState, CSSProperties, memo } from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Paper from '@material-ui/core/Paper'
import { FixedSizeList as List, areEqual } from 'react-window'

import SearchContext from '../search-context'
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
      border: '1px solid red',
      height: '50px'
    },
    cellTitle: {
      [theme.breakpoints.down('md')]: {
        textOverflow: 'ellipsis',
      },
      textAlign: 'left',
      paddingLeft: '0.5em',
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

  return (
    <Paper className={classes.root}>
      <SearchContext.Consumer>
        {({ searchValue }) => {
          const catalogue = searchValue.length > 3
            ? searchCatalogue(searchValue, rows)
            : rows

          return (
            <div className={classes.root}>
              <List
                height={600}
                itemCount={catalogue.length}
                itemSize={50}
                width={'95%'}
                style={{marginLeft: 'auto', marginRight: 'auto'}}
              >
                {({ index, style }: any) => {
                  const row = catalogue[index]
                  return (<Row row={row} style={style} classes={classes} />)
                }}
              </List>
            </div>
          )
        }}
      </SearchContext.Consumer>
    </Paper>
  )
}

const Row = memo(({ row, classes, style }: RowProps) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={classes.row} style={style}>
      <div className={classes.cellTitle}>{row.title}</div>
      <div className={classes.cellPrice}>{row.price > 0 ? '£' + row.price.toFixed(2) : '\u2014' }</div>
      <Hidden xsDown>
        <div>{row.publisher}</div>
      </Hidden>
    </div>
  )
}, areEqual)

interface PreviewsTableProps extends WithStyles<typeof styles> {
  rows: PreviewsItem[]
}

interface RowProps extends WithStyles<typeof styles> {
  row: PreviewsItem,
  style: CSSProperties
}

export default withStyles(styles, { withTheme: true })(PreviewsTable)
