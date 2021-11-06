const styles = (theme) => ({
  root: {
    background: "linear-gradient(90deg, #FFF, #FFF, #5CF6D3, #60EFFF)",
    borderBottom: `solid 2px #FFF`,
  },
  container: {
    ...theme.container
  },
  heroBox: {
    display: "flex",
    padding: `${theme.spacing(8)}px 0`
  },
  meet: {
    fontFamily: "'Roboto', sans-serif",
  },
  titleBox: {
    width: "60%",
  },
  logoBox: {
    width: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 300,
  },
  link: {
    textDecoration: "underline"
  },
  inline: {
    // whiteSpace: "nowrap"
  },
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  rooms: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  room: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  listItemPrimary: {
    padding: `0 ${theme.spacing(2)}px`,
  },
})
export default styles