const styles = (theme) => ({
  root: {
    height: 704,
    backgroundColor: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
    padding: `0 ${theme.spacing(2)}px`
  },
  container: {
    ...theme.container,
  },
})
export default styles