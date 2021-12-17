const styles = (theme) => ({
  root: {
    background: "linear-gradient(180deg, #FFF, #F1F1F0)",
    padding: `${theme.spacing(16)}px ${theme.spacing(2)}px`,
    [theme.breakpoints.down('sm')]: {
			padding: `${theme.spacing(8)}px ${theme.spacing(2)}px`,
    },
  },
  container: {
    ...theme.container,
  },
  section: {
    marginBottom: theme.spacing(8)
  },
  titleBox: {},
  logoBox: {
    padding: `${theme.spacing(2)}px 0`
  },
  logo: {
    width: 256,
    [theme.breakpoints.down('sm')]: {
      width: 192,
    }
  },
  link: {
    textDecoration: "underline",
    textDecorationThickness: 4,
    '&:hover': {
      textDecorationThickness: 4,
      textDecorationColor: theme.palette.primary.main,
    }
  },
  nameBox: {
    marginBottom: theme.spacing(4),
    maxWidth: "max-content",
  },
  nameBase: {
    background: "linear-gradient(90deg, #F187FB, #439CFB)",
    height: theme.spacing(2),
    margin: `-${theme.spacing(1)}px -${theme.spacing(1)/2}px 0 ${theme.spacing(1)/2}px`,
  },
  highlightMsg: {
    backgroundColor: theme.palette.text.primary,
    padding: theme.spacing(2),
    maxWidth: 256
  },
  sender: {
    color: "#439CFB"
  }
})
export default styles