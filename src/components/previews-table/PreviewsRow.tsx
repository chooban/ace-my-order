import { WithStyles } from '@material-ui/core/styles'
import React, { CSSProperties, memo } from 'react'
import { useHistory } from 'react-router'
import { areEqual } from 'react-window'

import { styles } from './styles'

interface RowProps extends WithStyles<typeof styles> {
  row: PreviewsItem,
  style: CSSProperties,
  setSelectedItem: (item: PreviewsItem) => void,
  inCart: boolean
}

const Row: React.FunctionComponent<RowProps> = memo(({ row, classes, style, setSelectedItem, inCart }) => {
  const history = useHistory()

  const navigateToItem = () => history.push(`/item/${encodeURIComponent(row.code)}`)

  return (
    <div
      className={classes.row}
      style={style}
      onClick={navigateToItem}
    >
      <div className={classes.cellTitle}>
        <span className={classes.cellTitleContents}>{row.title}</span>
      </div>
      <i
        className={`materical-icons ${classes.inCart}`}
        style={inCart ? { visibility: 'visible' }: {}}
      >
      done
      </i>
      <div className={classes.cellPrice}>{row.price > 0 ? '£' + row.price.toFixed(2) : '\u2014' }</div>
      <div className={classes.cellPublisher}>{row.publisher}</div>
    </div>
  )}
, areEqual)

export { Row }
