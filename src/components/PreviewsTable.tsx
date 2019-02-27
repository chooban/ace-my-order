/// <reference path="../typings/ace-my-order.d.ts" />

import React, { PureComponent } from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { PreviewsItem } from "ace-my-order"

const styles = createStyles({
  root: {
    width: '75vw',
    marginTop: 3,
    overflowX: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  table: {
    minWidth: 700,
  },
})

interface PreviewsTableProps extends WithStyles<typeof styles> {
  rows: PreviewsItem[]
}

class PreviewsTable extends PureComponent<PreviewsTableProps, any> {

  render() {
    const { classes, rows } = this.props

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="left">Publisher</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow key={row.code}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell align="right">{row.price > 0 ? row.price: '\u2014' }</TableCell>
                  <TableCell>{row.publisher}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(PreviewsTable)
