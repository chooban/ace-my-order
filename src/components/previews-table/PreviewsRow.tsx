import { WithStyles } from '@material-ui/core/styles'
import { PreviewsItem } from "ace-my-order"
import React, { CSSProperties, memo } from 'react'
import { areEqual } from 'react-window'

import { styles } from './styles'

interface RowProps extends WithStyles<typeof styles> {
  row: PreviewsItem,
  style: CSSProperties,
  setSelectedItem: (item: PreviewsItem) => void,
  inCart: boolean
}

const Row: React.FunctionComponent<RowProps> = memo(({ row, classes, style, setSelectedItem, inCart }) => (
  <div
    className={classes.row}
    style={style}
    onClick={() => setSelectedItem(row)}
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
)
, areEqual)

export { Row }
