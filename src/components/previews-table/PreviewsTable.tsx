import { WithStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import React, { memo } from 'react'
import { FixedSizeList } from 'react-window'

import { AceItem, AllItemsIndexQuery } from '../../../typings/autogen'
import { useOrder } from '../../contexts/order-context'
import SearchContext from '../../contexts/search-context'
import { searchCatalogue } from '../../lib/search-catalogue'
import { Row } from './PreviewsRow'
import { styles } from './styles'

const PreviewsTable: React.FunctionComponent<PreviewsTableProps> = (props) => {
  const { classes, rows, height } = props
  const [{ order }] = useOrder()
  let catalogue: AceItem[] = []

  const setSelectedItem = (i: AceItem) => {
    navigate('/' + i.slug)
  }

  return (
    <>
      <SearchContext.Consumer>
        {({ searchValue, updateSearch }) => {
          catalogue = searchValue.length > 3
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
                  value={searchValue}
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
                      inCart={order.some((i) => i.previewsCode === catalogue[index].previewsCode)}
                    />)
                  }
                </FixedSizeList>
              </div>
            </>
          )
        }}
      </SearchContext.Consumer>
    </>
  )
}

interface PreviewsTableProps extends WithStyles<typeof styles> {
  height: number
  rows: AceItem[]
}

const TableWithStyles = withStyles(styles, { withTheme: true })(memo(PreviewsTable))

const Wrapper = ({ height }: { height: number }) => {
  const { allAceItem } = useStaticQuery<AllItemsIndexQuery>(query)

  return <TableWithStyles height={height} rows={allAceItem.nodes as AceItem[]} />
}

const query = graphql`
  query AllItemsIndex {
    allAceItem {
      nodes {
        id
        title
        previewsCode
        price
        publisher
        slug
      }
    }
  }
`


export default React.memo(Wrapper)
