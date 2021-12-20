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
  mascotBox:{
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  logoBox: {
    
  },
  logo: {
    width: 512,
    [theme.breakpoints.down('sm')]: {
      width: 320,
    }
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
  nameTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: "2.75rem"
    }
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
  itemGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  descriptionBox: {
    position: "relative",
    backgroundColor: theme.palette.text.primary,
    borderRadius: theme.spacing(1)/2,
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(8)}px ${theme.spacing(3)}px`,
    [theme.breakpoints.down('sm')]: {
      margin: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
    }
  },
  polkadotLogoBox: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  polkadotLogo:{
    width: 128,
  },
  ident: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(3),
  },
  inline: {
    marginLeft: theme.spacing(2)
  }
})
export default styles