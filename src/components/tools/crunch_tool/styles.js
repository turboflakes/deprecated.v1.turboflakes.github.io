const styles = (theme) => ({
  root: {
    background: "linear-gradient(180deg, #FFF, #F1F1F0)",
    borderBottom: `solid 2px #FFF`,
    height: 1728
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
  inline: {
    // whiteSpace: "nowrap"
  },
  rooms: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  room: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `0 ${theme.spacing(6)}px`,
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