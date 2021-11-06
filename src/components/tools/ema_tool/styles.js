const styles = (theme) => ({
  root: {
    background: "linear-gradient(180deg, #FFF, #F1F1F0)",
    borderBottom: `solid 2px #FFF`,

    // background: "linear-gradient(90deg, #F187FB, #439CFB)",
    // display: "flex",
    // borderBottom: `solid 2px #FFF`,
    // height: "100vh"
  },
  container: {
    ...theme.container,
    marginBottom: theme.spacing(16)
  },
  section: {
    marginBottom: theme.spacing(8)
  },
  heroBox: {
    display: "flex",
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
  logoGradient: {
    background: "radial-gradient(#5CF6D3 0%, #60EFFF 60%)",
    width: 400,
    height: 400,
    display: "flex",
    justifyContent: "center",
    borderRadius: 200
  },
  logo: {
    width: 260,
  },
  link: {
    textDecoration: "underline"
  },
})
export default styles