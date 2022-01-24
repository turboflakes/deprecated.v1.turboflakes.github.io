const styles = (theme) => ({
  root: {},
  container: {
    maxWidth: 1024,
    color: theme.palette.text.primary,
    padding: `0 ${theme.spacing(8)}px 0 ${theme.spacing(8)}px`,
  },
  backIcon: {
    marginTop: theme.spacing(2)
  },
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(8)}px 0`
  },
  section: {
    position: "relative",
    zIndex: 1,
    margin: `${theme.spacing(16)}px 0`,
    padding: `${theme.spacing(8)}px 0`,
    '&:after': {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      display: "block",
      background: "url('/static/img/background_grey.svg') repeat center",
    },
  },
  polkadot: {
    backgroundImage: "linear-gradient(90deg, #E6E86A, #F15A29, #E6E86A)",
  },
  kusama: {
    backgroundImage: "linear-gradient(90deg, #CFDC28, #57BA5F, #CFDC28)",
  }
})
export default styles