const styles = (theme) => ({
  root: { },
  paperFullScreen: {
    backgroundColor: "transparent"
  },
  contentRoot:{
    backgroundColor: theme.palette.text.primary,
    width: "50vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    width: "100%"
  },
  closeButton: {
    backgroundColor: theme.palette.text.secondary,
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  rootTextField:{
    borderRadius: 0
  },
  notchedOutline: {
    borderColor: "#FFF", // neutrals[300]
  }
})
export default styles