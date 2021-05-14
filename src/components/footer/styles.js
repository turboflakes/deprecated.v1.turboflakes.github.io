const styles = (theme) => ({
	root: {
		background: theme.palette.text.primary,
	},
	container: {
    padding: theme.spacing(2)
  },
	primary: {
    color: theme.palette.text.secondary,
		wordWrap: "break-word"
  },
	secondary: {
    color: theme.palette.text.secondary,
		fontWeight: 500,
  },
	light:{
		background: theme.palette.text.secondary,
	},
	bottom: {
		padding: theme.spacing(2),
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between"
	},
	icon: {
		margin: `0 ${theme.spacing(1)}px`,
	}
})
export default styles