const styles = (theme) => ({
  root: {
    // height: "90vh",
  },
  container: {
    ...theme.container,
  },
  logoBox: {
    ...theme.container,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40vh",
  },
  logo: {
    width: "40%",
    [theme.breakpoints.down('sm')]: {
			width: "60%",
    },
  },
  motoBox:{ 
    height: "55vh",
  },
  titleBox:{ 
    marginBottom: theme.spacing(3)
  },
  substrate: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    lineHeight: 0.9,
  },
  support: {
    padding: `0 ${theme.spacing(1)}px 0 0`,
    fontSize: "2.4rem",
    lineHeight: 0.9,
    [theme.breakpoints.down('sm')]: {
			fontSize: "1.3rem",
    },
  },
  the: {
    letterSpacing: "0.13em"
  },
  subtitleBox: {
    maxWidth: 900,
    [theme.breakpoints.down('sm')]: {
			padding: `0 ${theme.spacing(1)}px`
    },
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