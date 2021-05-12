const styles = (theme) => ({
  root: {
    display: "flex"
  },
  leftBox: {
    height: "100vh",
  },
  rightBox: {
    height: "100vh",
    overflow: "scroll",
    background: theme.palette.background.paper,
  },
  container: {
    padding: theme.spacing(2)
  }
})
export default styles