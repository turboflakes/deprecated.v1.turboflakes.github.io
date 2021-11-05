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
    height: "25vh"
  },
  motoBox: {
    padding: `${theme.spacing(3)}px 0`,
    height: "25vh"
  },
  logo: {
    width: "50%"
  },
  link: {
    textDecoration: "underline"
  },
  charactersBox: {
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    height: "30vh"
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
    height: "20vh",
    backgroundColor: "#0B1317",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF"
  }

})
export default styles