const styles = theme => ({
  root: {  
    
  },
  popover: {
  },
  paper: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: "50vw",
    },
  },
  iconRoot: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(1),
    marginLeft: -theme.spacing(1),
    '&.Mui-disabled': {
      color: theme.palette.text.secondary
    }
  },
  list: {
    marginLeft: theme.spacing(1)
  },
  bold: {
    fontWeight: 500
  }
})
export default styles