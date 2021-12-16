const styles = (theme) => ({
  root: {
    backgroundImage: "linear-gradient(90deg, #CFDC28, #57BA5F, #CFDC28)",
    position: "relative",
    // minHeight: "100vh",
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
      background: "url('/static/img/background.svg') repeat center",
    },
  },
  container: {
    ...theme.container
  },
  section: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: theme.spacing(8)
  },
  mascotBox:{
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  logoBox: {
    
  },
  logo: {
    width: 640,
  },
  namesBox: {
    display: "flex"
  },
  nameBox: {
    marginBottom: theme.spacing(4),
    maxWidth: "max-content",
  },
  nameBase: {
    height: theme.spacing(2),
    margin: `-${theme.spacing(1)}px ${theme.spacing(1)-4}px 0 ${theme.spacing(1)/2}px`,
  },
  momoColor:{
    background: "linear-gradient(90deg, #57BA5F, #CFDC28)"
  },
  cocoColor:{
    background: "linear-gradient(90deg, #CFDC28, #57BA5F)"
  },
  plus: {
    margin: `0 ${theme.spacing(3)}px`
  },
  descriptionBox: {
    backgroundImage: "linear-gradient(90deg, #57BA5F, #CFDC28)",
    borderRadius: theme.spacing(1)/2,
    margin: `${theme.spacing(4)}px 0`,
    padding: theme.spacing(3)
  }
})
export default styles