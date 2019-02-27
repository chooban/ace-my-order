/// <reference path="../typings/ace-my-order.d.ts" />

import React, { PureComponent, useState } from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import Hidden from '@material-ui/core/Hidden';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { compose } from 'recompose'

import { PreviewsItem } from "ace-my-order"

const styles = (theme: any) => {
  return createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        width: '100vw'
      },
      [theme.breakpoints.up('sm')]: {
        width: '75vw'
      },
      marginTop: 3,
      overflowX: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    cellTitle: {
      [theme.breakpoints.down('md')]: {
        textOverflow: 'ellipsis',
        width: '30vw'
      }
    }
  })
}

function PreviewsTable(props: PreviewsTableProps) {
  const { classes, rows } = props

  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Description</TableCell>
            <TableCell align="right">Price</TableCell>
            <Hidden smDown>
              <TableCell align="left">Publisher</TableCell>
            </Hidden>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => <Row key={row.code} classes={classes} row={row} />)}
        </TableBody>
      </Table>
    </Paper>
  )
}

const Row = ({ row, classes }: RowProps) => {

  const [expanded, setExpanded] = useState(false)

  return (
    <React.Fragment>
      <TableRow onClick={() => setExpanded(!expanded)}>
        <TableCell className={classes.cellTitle}>
          {row.title}
        </TableCell>
        <TableCell align="right">{row.price > 0 ? row.price: '\u2014' }</TableCell>
        <Hidden smDown>
          <TableCell>{row.publisher}</TableCell>
        </Hidden>
      </TableRow>
      {expanded &&
        <TableRow>
          <TableCell colSpan={3}>
            Expandeded
          </TableCell>
        </TableRow>
      }
    </React.Fragment>
  )
}

interface PreviewsTableProps extends WithStyles<typeof styles> {
  rows: PreviewsItem[]
}

interface RowProps extends WithStyles<typeof styles> {
  row: PreviewsItem
}

export default withStyles(styles, { withTheme: true })(PreviewsTable)
