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
    color: theme.palette.primary.light,
    padding: theme.spacing(1)
  },
  list: {
    marginLeft: theme.spacing(1)
  },
  bold: {
    fontWeight: 500
  }
})
export default styles