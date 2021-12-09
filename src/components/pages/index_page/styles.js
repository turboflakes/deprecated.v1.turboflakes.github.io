const styles = (theme) => ({
  root: {
    // Note: marginTop = -80 to remove the header appBar height
    marginTop: -80,
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
  toolsBox: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: `${theme.spacing(6)}px 0`
  },
  botLink: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `0 ${theme.spacing(6)}px`,
    '&:hover > img': {
      animation: "headShake",
  	  animationDuration: "1.5s",
    }
  },
  botLogo: {
    maxWidth: 80,
    margin: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
  },
  meet: {
    fontFamily: "'Roboto', sans-serif",
  },
  container: {
    ...theme.container,
  },
  substrateBox: {
    height: 704,
    backgroundColor: "#0B1317",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
  },
  meetBox: {
    height: 1024,
    background: "linear-gradient(180deg, #FFF, #F1F1F0)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
  },

})
export default styles