import { WithStyles } from '@material-ui/core/styles'
import React, { CSSProperties } from 'react'
import { areEqual } from 'react-window'

import { AceItem } from '../../../typings/autogen/'
import { styles } from './styles'

interface RowProps extends WithStyles<typeof styles> {
  row: AceItem,
  style: CSSProperties,
  setSelectedItem: (item: AceItem) => void,
  inCart: boolean
}

const Row: React.FunctionComponent<RowProps> = ({ row, classes, style, inCart, setSelectedItem }) => {
  return (
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
        style={inCart ? { visibility: 'visible' } : {}}
      >done</i>
      <div className={classes.cellPrice}>{row.price > 0 ? '£' + row.price.toFixed(2) : '\u2014' }</div>
      <div className={classes.cellPublisher}>{row.publisher}</div>
    </div>
  )}

const memoized = React.memo(Row, areEqual)

export { memoized as Row }
