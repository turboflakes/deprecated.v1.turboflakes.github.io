const styles = (theme) => ({
	root: {
		background: theme.palette.text.primary,
	},
	container: {
    padding: theme.spacing(2)
  },
	primary: {
    color: theme.palette.text.secondary
  },
	secondary: {
    fontWeight: "bold",
		color: theme.palette.neutrals[500]
  },
	light:{
		background: theme.palette.text.secondary,
	}
})
export default styles