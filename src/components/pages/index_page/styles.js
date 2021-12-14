const styles = (theme) => ({
  root: {
    // Note: marginTop = -80 to remove the header appBar height
    marginTop: -80,
  },
  container: {
    ...theme.container,
  },
  heroBox: {
    height: "90vh",
  },
  logoBox: {
    ...theme.container,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40vh",
  },
  logo: {
    width: "40%"
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
    lineHeight: 0.9
  },
  support: {
    padding: `0 ${theme.spacing(1)}px 0 0`,
    fontSize: "2.4rem",
    lineHeight: 0.9
  },
  the: {
    letterSpacing: "0.13em"
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