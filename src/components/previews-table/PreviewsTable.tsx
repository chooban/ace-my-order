import { WithStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import React, { memo, useEffect, useState } from 'react'
import { FixedSizeList } from 'react-window'

import { AceItem, AllItemsIndexQuery } from '../../../typings/autogen'
import { useOrder } from '../../contexts/order-context'
import { searchCatalogue } from '../../lib/search-catalogue'
import { Row } from './PreviewsRow'
import { styles } from './styles'

const LIST_WIDTH = '100%'

const PreviewsTable: React.FunctionComponent<PreviewsTableProps> = (props) => {
  const { classes, rows, height, searchValue, updateSearch } = props
  const [catalogue, setCatalogue] = useState<AceItem[]>([])
  const [{ order }] = useOrder()

  useEffect(() => {
    const newCatalogue = searchValue.length > 3
      ? searchCatalogue(searchValue, rows)
      : rows
    setCatalogue(newCatalogue)
  }, [rows, searchValue])

  const setSelectedItem = (i: AceItem) => {
    navigate('/' + i.slug)
  }

  return (
    <div className={classes.listingPanel}>
      <TextField
        id="outlined-search"
        label="Search by title, publisher, or creator"
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
        width={LIST_WIDTH}
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
  )
}

interface PreviewsTableProps extends WithStyles<typeof styles> {
  height: number
  rows: AceItem[],
  searchValue: string,
  updateSearch(s: string): void
}

const TableWithStyles = withStyles(styles, { withTheme: true })(memo(PreviewsTable))

const Wrapper = (props: Pick<PreviewsTableProps, 'height' | 'searchValue' | 'updateSearch'>) => {
  const { allAceItem } = useStaticQuery<AllItemsIndexQuery>(query)

  return <TableWithStyles {...props} rows={allAceItem.nodes as AceItem[]} />
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
        previews {
          creators
        }
      }
    }
  }
`


export default React.memo(Wrapper)
