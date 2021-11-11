const styles = (theme) => ({
  root: {
    background: "linear-gradient(180deg, #FFF, #F1F1F0)",
    borderBottom: `solid 2px #FFF`,
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
    background: "linear-gradient(90deg, #F187FB, #439CFB)",
    height: theme.spacing(2),
    margin: `-${theme.spacing(1)}px -${theme.spacing(1)/2}px 0 ${theme.spacing(1)/2}px`,
  }
})
export default styles