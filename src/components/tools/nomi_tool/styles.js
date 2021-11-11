const styles = (theme) => ({
  root: {
  },
  heroBox: {
    ...theme.container,
    display: "flex",
    alignItems: "center",
    padding: `${theme.spacing(8)}px 0`,
  },
  meet: {
    fontFamily: "'Roboto', sans-serif",
  },
  titleBox: {
    width: "60%",
  },
  logoBox: {
    width: "40%",
  },
  logo: {
    width: 260,
  },
  link: {
    textDecoration: "underline"
  },
  nameBox: {
    marginBottom: theme.spacing(4),
    maxWidth: "max-content",
  },
  nameBase: {
    background: "linear-gradient(90deg, #00AEEF, #F7941D)",
    height: theme.spacing(2),
    margin: `-${theme.spacing(1)}px -${theme.spacing(1)/2}px 0 ${theme.spacing(1)/2}px`,
  },
  nomiHeader: {
    // background: "linear-gradient(0deg, #F1F1F0, #FFF)",
    // height: "30vh",
    // borderBottom: `solid 2px #FFF`,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-between",
  },
  nomiTitle: {
    margin: `${theme.spacing(4)}px 0 0 ${theme.spacing(6)}px`
  },
  searchBox: {
    margin: `${theme.spacing(2)}px 0`
  },
  animationBox:{
    height: "90vh",
    position: "relative",
    
  },  
})
export default styles