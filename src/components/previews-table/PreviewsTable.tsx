import { WithStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { navigate } from 'gatsby'
import React, { memo, useEffect, useState } from 'react'
import { FixedSizeList } from 'react-window'

import { AceItem } from '../../../typings/autogen'
import { useOrder } from '../../contexts/order-context'
import { useSearch } from '../../hooks/use-search'
import { Row } from './PreviewsRow'
import { styles } from './styles'

const LIST_WIDTH = '100%'

const PreviewsTable: React.FunctionComponent<PreviewsTableProps> = (props) => {
  const { classes, height, searchValue, updateSearch } = props
  const [catalogue, setCatalogue] = useState<AceItem[]>([])
  const [{ order }] = useOrder()
  const [searchResults] = useSearch(searchValue)

  useEffect(() => {
    const getResults = async () => {
      setCatalogue(await searchResults)
    }
    getResults()
  }, [searchResults])

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
        size="small"
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
  searchValue: string,
  updateSearch(s: string): void
}

const TableWithStyles = withStyles(styles, { withTheme: true })(memo(PreviewsTable))

const Wrapper = (props: Pick<PreviewsTableProps, 'height' | 'searchValue' | 'updateSearch'>) => {
  return <TableWithStyles {...props} />
}

export default React.memo(Wrapper)
