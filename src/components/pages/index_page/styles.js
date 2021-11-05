const styles = (theme) => ({
  root: {
    // Note: marginTop = -80 to remove the header appBar height
    marginTop: -80,
  },
  heroBox: {
    height: "100vh",
  },
  logoBox: {
    ...theme.container,
    padding: `${theme.spacing(6)}px 0`,
    height: "20vh"
  },
  motoBox: {
    padding: `${theme.spacing(3)}px 0`,
    height: "20vh"
  },
  logo: {
    width: "50%"
  },
  link: {
    textDecoration: "underline"
  },
  toolsBox: {
    ...theme.container,
    height: "45vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  charactersBox: {
    display: "flex",
    justifyContent: "center",
    // alignItems: "flex-end",
    // margin: `${theme.spacing(3)}px 0`
  },
  characterLink: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  characterLogo: {
    maxWidth: 120,
    margin: `${theme.spacing(2)}px ${theme.spacing(4)}px`
  },
  meet: {
    fontFamily: "'Roboto', sans-serif",
  },
  messageBox: {
    // ...theme.container,
    height: "15vh",
    backgroundColor: "#0B1317",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF"
  }

})
export default styles