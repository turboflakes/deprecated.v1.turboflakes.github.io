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
    backgroundColor: theme.palette.neutrals[200],
  }
})
export default styles