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
  link: {
    textDecoration: "underline"
  },
  nomiBox: {
    
  },
  nomiTitle: {
    height: "25vh",
    margin: `0 ${theme.spacing(6)}px`
  },
  meet: {
    fontFamily: "'Roboto', sans-serif"
  },
  searchBox: {
    margin: `0 0 ${theme.spacing(6)}px ${theme.spacing(6)}px`
  },
  searchForm: {
    display: "flex",
    alignItems: "center",
    width: 680,
  },
  searchIcon: {
    marginRight: theme.spacing(2)
  },
  animationBox:{
    position: "relative"
  },
  toolsBox:{
    // background: "linear-gradient(90deg, #439CFB, #F187FB)",
    // padding: `${theme.spacing(10)}px 0`
  },
  crunchBox :{
    background: "linear-gradient(90deg, #5CF6D3, #60EFFF)",
    padding: `${theme.spacing(10)}px 0`,
  },
  toolTitle: {
    height: "25vh",
    margin: theme.spacing(6)
  },
  crunchLogo: {
    margin: `${theme.spacing(10)}px 0`,
    minWidth: "20%"
  },
  emaBox :{
    background: "linear-gradient(90deg, #F187FB, #439CFB)",
    padding: `${theme.spacing(10)}px 0`
  }

})
export default styles