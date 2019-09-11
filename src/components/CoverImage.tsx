/// <reference path="../typings/ace-my-order.d.ts" />

import React from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/styles'

import { PreviewsOnlineDetails } from 'ace-my-order'

const styles = () => {
  return createStyles({
    cover: {
      width: '10vw',
      minWidth: '100px',
      maxWidth: '200px',
      float: 'left',
      marginRight: '7px'
    }
  })
}
interface CoverImageProps extends WithStyles<typeof styles> {
  item: PreviewsOnlineDetails
}
function CoverImage({ classes, item }: CoverImageProps) {
  return (
    <img alt="Cover" className={classes.cover} src={item.coverImage} />
  )
}

export default withStyles(styles, { withTheme: true })(CoverImage)
