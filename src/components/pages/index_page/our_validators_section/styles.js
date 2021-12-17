const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
    // height: 896,
    padding: `${theme.spacing(16)}px ${theme.spacing(2)}px`,
    [theme.breakpoints.down('sm')]: {
      // height: 2176,
			padding: `${theme.spacing(8)}px ${theme.spacing(2)}px`,
    },
  },
  container: {
    ...theme.container,
  },
  link: {
    textDecoration: "underline",
    textDecorationThickness: 4,
    '&:hover': {
      textDecorationThickness: 4,
      textDecorationColor: theme.palette.primary.main,
    }
  },
})
export default styles