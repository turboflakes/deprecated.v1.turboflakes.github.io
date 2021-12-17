const styles = (theme) => ({
  root: {
    background: "linear-gradient(180deg, #FFF, #F1F1F0)",
    height: 1728,
    padding: `${theme.spacing(16)}px ${theme.spacing(2)}px`,
    [theme.breakpoints.down('sm')]: {
			height: 2176,
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
  inline: {
    // whiteSpace: "nowrap"
  },
  room: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(3)}px 0`,
    },
    '&:hover > img': {
      animation: "headShake",
  	  animationDuration: "1.5s",
    },
  },
  link:{
    textDecoration: "underline",
    textDecorationThickness: 4,
    '&:hover': {
      textDecorationThickness: 4,
      textDecorationColor: theme.palette.primary.main,
    }
  },
  listItemPrimary: {
    padding: `0 ${theme.spacing(2)}px`,
  },
  nameBox: {
    marginBottom: theme.spacing(4),
    maxWidth: "max-content",
  },
  nameBase: {
    background: "linear-gradient(90deg, #5CF6D3, #60EFFF)",
    height: theme.spacing(2),
    margin: `-${theme.spacing(1)}px ${theme.spacing(1)/3}px 0 ${theme.spacing(1)/2}px`,
  }
})
export default styles