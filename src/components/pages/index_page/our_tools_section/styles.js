const styles = (theme) => ({
  root: {
    height: 1024,
    background: "linear-gradient(180deg, #FFF, #F1F1F0)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
    padding: `0 ${theme.spacing(2)}px`,
    [theme.breakpoints.down('sm')]: {
			height: 1216,
    },
  },
  container: {
    ...theme.container,
  },
  link: {
    textDecoration: "underline",
    textDecorationThickness: 4,
    '&:hover': {
      textDecorationThickness: 4,
      textDecorationColor: theme.palette.primary.main,
    }
  },
  botLink: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px 0`,
    '&:hover > img': {
      animation: "headShake",
  	  animationDuration: "1.5s",
    }
  },
  botLogo: {
    maxWidth: 80,
    margin: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
  },
})
export default styles