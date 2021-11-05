const styles = (theme) => ({
  root: {
    borderBottom: `solid 2px #FFF`,
  },
  meet: {
    fontFamily: "'Roboto', sans-serif",
  },
  toolTitle: {
    height: "25vh",
    margin: `${theme.spacing(4)}px 0 0 ${theme.spacing(6)}px`
  },
  crunchLogo: {
    margin: `${theme.spacing(10)}px 0`,
    minWidth: "20%"
  },
  crunchBox :{
    background: "linear-gradient(90deg, #FFF, #5CF6D3, #60EFFF)",
    padding: `${theme.spacing(10)}px 0`,
  },
  inline: {
    whiteSpace: "nowrap"
  }
})
export default styles