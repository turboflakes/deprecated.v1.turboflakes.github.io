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
  closeButton: {
    position: "absolute",
		top: theme.spacing(1) / 2,
		right: theme.spacing(1) / 2,
		color: "#fff"
  }
})
export default styles