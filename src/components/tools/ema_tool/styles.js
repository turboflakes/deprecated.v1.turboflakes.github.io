const styles = (theme) => ({
  root: {
    background: "linear-gradient(90deg, #F187FB, #439CFB)",
    display: "flex",
    borderBottom: `solid 2px #FFF`,
    height: "100vh"
  },
  meet: {
    fontFamily: "'Roboto', sans-serif",
  },
  titleBox: {
    width: "60vw",
    margin: `${theme.spacing(4)}px 0 0 ${theme.spacing(6)}px`
  },
  logoBox: {
    width: "40vw",
    display: "flex",
    justifyContent: "center"
  },
  logo: {
    maxWidth: "16vw"
  },
  link: {
    textDecoration: "underline"
  },
})
export default styles