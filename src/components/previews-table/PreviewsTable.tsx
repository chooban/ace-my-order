import { WithStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { PreviewsItem } from "ace-my-order"
import React, { memo, useState } from 'react'
import { FixedSizeList } from 'react-window'

import { useOrder } from '../../contexts/order-context'
import SearchContext from '../../contexts/search-context'
import { searchCatalogue } from '../lib/search-catalogue'
import PreviewPanel from '../PreviewPanel'
import { Row } from './PreviewsRow'
import { styles } from './styles'

interface PreviewsTableProps extends WithStyles<typeof styles> {
  height: number
  rows: PreviewsItem[]
}

const PreviewsTable: React.FunctionComponent<PreviewsTableProps> = (props) => {
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
                <FixedSizeList
                  height={height - 80}
                  itemCount={catalogue.length}
                  itemSize={50}
                  width={'100%'}
                  style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    overflowX: 'hidden'
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
                </FixedSizeList>
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

const TableWithStyles = withStyles(styles, { withTheme: true })(memo(PreviewsTable))

export default TableWithStyles
