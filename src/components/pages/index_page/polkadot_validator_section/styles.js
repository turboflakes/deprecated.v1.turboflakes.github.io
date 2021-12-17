const styles = (theme) => ({
  root: {
    backgroundImage: "linear-gradient(90deg, #E6E86A, #F15A29, #E6E86A)",
    position: "relative",
    // minHeight: "100vh",
    zIndex: 1,
    margin: `${theme.spacing(16)}px 0 0 0`,
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
      background: "url('/static/img/background.svg') repeat center",
    },
  },
  container: {
    ...theme.container
  },
  mascotBox:{
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  logoBox: {
    
  },
  logo: {
    width: 448,
    [theme.breakpoints.down('sm')]: {
      width: 256,
    }
  },
  nameBox: {
    marginBottom: theme.spacing(4),
    maxWidth: "max-content",
  },
  nameBase: {
    background: "linear-gradient(90deg, #F15A29, #E6E86A)",
    height: theme.spacing(2),
    margin: `-${theme.spacing(1)}px ${theme.spacing(1)-4}px 0 ${theme.spacing(1)/2}px`,
  },
  descriptionBox: {
    backgroundImage: "linear-gradient(90deg, #F15A29, #E6E86A)",
    borderRadius: theme.spacing(1)/2,
    margin: `${theme.spacing(4)}px 0`,
    padding: theme.spacing(3)
  }
})
export default styles