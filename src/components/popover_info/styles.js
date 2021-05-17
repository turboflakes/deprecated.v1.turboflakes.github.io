const styles = theme => ({
  root: {  
  },
  popover: {
  },
  paper: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: "50vw",
    },
    padding: theme.spacing(1),
  },
  iconRoot: {
    color: theme.palette.primary.light
  }
})
export default styles