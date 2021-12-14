const styles = (theme) => ({
  root: {
    height: 704,
    backgroundColor: "#0B1317",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
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
})
export default styles