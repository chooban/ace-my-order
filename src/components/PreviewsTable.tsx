import Hidden from '@material-ui/core/Hidden'
import { createStyles,WithStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { PreviewsItem } from "ace-my-order"
import React, { CSSProperties, memo,useState } from 'react'
import { areEqual,FixedSizeList as List } from 'react-window'

import { useOrder } from '../contexts/order-context'
import SearchContext from '../contexts/search-context'
import { searchCatalogue } from './lib/search-catalogue'
import PreviewPanel from './PreviewPanel'

interface PreviewsTableProps extends WithStyles<typeof styles> {
  height: number
  rows: PreviewsItem[]
}

interface RowProps extends WithStyles<typeof styles> {
  row: PreviewsItem,
  style: CSSProperties,
  setSelectedItem: (arg0: PreviewsItem) => void,
  inCart: boolean
}

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
      gridTemplateColumns: 'auto 10px 80px',
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: 'auto',
      },
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'lightgray',
        verticalAlign: 'middle'
      }
    },
    cellTitle: {
      display: 'flex',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    cellTitleContents: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textAlign: 'left',
      fontWeight: 500,
    },
    inCart: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      content: "'done'",
      color: 'green',
      fontWeight: 'bold',
      fontFamily: 'Material Icons',
      position: 'relative',
      visibility: 'hidden'
    },
    cellPublisher: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      fontSize: 'smaller',
      [theme.breakpoints.down('md')]: {
        textOverflow: 'ellipsis',
      },
    },
    cellPrice: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      marginRight: '0.5em',
      verticalAlign: 'bottom',
      textAlign: 'right'
    },
  })
}

function PreviewsTable(props: PreviewsTableProps) {
  const { classes, rows, height } = props
  const [selectedItem, setSelectedItem] = useState<PreviewsItem | undefined>(undefined)
  const [{ order }] = useOrder()

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
                    (<Row
                      row={catalogue[index]}
                      style={style}
                      classes={classes}
                      setSelectedItem={setSelectedItem}
                      inCart={order.some((i) => i.code === catalogue[index].code)}
                    />)
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
          : <p style={{ marginTop: 0 }}>Please select an item</p>
        }
      </div>
    </>
  )
}

const Row = memo(({ row, classes, style, setSelectedItem, inCart }: RowProps) => (
  <div className={classes.row} style={style} onClick={() => setSelectedItem(row)}>
    <div className={classes.cellTitle}>
      <span className={classes.cellTitleContents}>{row.title}</span>
    </div>
    <i
      className={`materical-icons ${classes.inCart}`}
      style={inCart ? { visibility: 'visible' }: {}}
    >
      done
    </i>
    <Hidden xsDown>
      <div className={classes.cellPrice}>{row.price > 0 ? '£' + row.price.toFixed(2) : '\u2014' }</div>
    </Hidden>
    <div className={classes.cellPublisher}>{row.publisher}</div>
  </div>
)
, areEqual)

PreviewsTable.whyDidYouRender = true

export default withStyles(styles, { withTheme: true })(memo(PreviewsTable))
