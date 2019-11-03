import { createStyles } from '@material-ui/core/styles'

const styles = (theme: any) => {
  return createStyles({
    listingPanel: {
      [theme.breakpoints.down('xs')]: {
        width: '98%'
      },
      width: '40%',
      display: 'flex',
      flexDirection: 'column'
    },
    contentPanel: {
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      },
      width: '60%',
      textAlign: 'left',
      paddingLeft: '5px'
    },
    search: {
      marginBottom: '10px'
    },
    column: {
      display: 'flex',
      flexDirection: 'column'
    },
    row: {
      display: 'grid',
      gridTemplateColumns: 'auto 10px 80px',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'lightgray',
        verticalAlign: 'middle'
      }
    },
    cellTitle: {
      display: 'flex',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    cellTitleContents: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textAlign: 'left',
      fontWeight: 500,
    },
    inCart: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      content: "'done'",
      color: 'green',
      fontWeight: 'bold',
      fontFamily: 'Material Icons',
      position: 'relative',
      visibility: 'hidden'
    },
    cellPublisher: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      fontSize: 'smaller',
      [theme.breakpoints.down('md')]: {
        textOverflow: 'ellipsis',
      },
    },
    cellPrice: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      marginRight: '0.5em',
      verticalAlign: 'bottom',
      textAlign: 'right'
    },
  })
}

export { styles }
