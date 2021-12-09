const styles = (theme) => ({
  root: {

  },
  container: {
    minHeight: "64vh",
    maxWidth: 768,
    color: theme.palette.text.primary,
    padding: `0 ${theme.spacing(8)}px ${theme.spacing(8)}px ${theme.spacing(8)}px`,
  },
  backIcon: {
    marginTop: theme.spacing(2)
  },
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(8)}px 0`
  }
})
export default styles