const styles = (theme) => ({
  root: {
  },
  heroBox: {
    height: "50vh",
    margin: `0 auto`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  logoBox: {
    margin: `0 auto`
  },
  logo: {
    marginBottom: theme.spacing(6)
  },
  searchBox: {
    margin: theme.spacing(2)
  },
  form: {
    display: "flex",
    alignItems: "center",
    width: 680,
  },
  searchIcon: {
    margin: `0 ${theme.spacing(2)}px 0 ${theme.spacing(6)}px`
  },
  animationBox:{
    position: "relative"
  }
  
})
export default styles