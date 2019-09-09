/// <reference path="../typings/ace-my-order.d.ts" />

import React from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/styles'

import { PreviewsItem } from 'ace-my-order'
import { useFetch } from '../hooks/use-fetch'

const styles = () => {
  return createStyles({
    cover: {
      width: '10vw',
      minWidth: '100px',
      maxWidth: '200px',
      float: 'left',
      marginRight: '7px'
    },
    noCover: {
      width: '10vw',
      height: '13vw',
      minWidth: '100px',
      maxWidth: '200px',
      float: 'left',
      marginRight: '7px',
      backgroundColor: 'lightgrey'
    }
  })
}
interface CoverImageProps extends WithStyles<typeof styles> {
  item: PreviewsItem
}
function CoverImage({ classes, item }: CoverImageProps) {
  const res = useFetch(`.netlify/functions/get-cover?code=${encodeURIComponent(item.code)}`)

  if (res.error) {
    return <img alt="Cover placeholder" className={classes.noCover} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' />
  } else if (!res.response) {
    return <img alt="Cover placeholder" className={classes.noCover} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' />
  }

  const data: any = res.response
  return (
    <img alt="Cover" className={classes.cover} src={data} />
  )
}

export default withStyles(styles, { withTheme: true })(CoverImage)
