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
	about: {
		padding: theme.spacing(2),
		// display: "flex",
		// alignItems: "center",
		// justifyContent: "space-between"
	},
	bottom: {
		padding: theme.spacing(2),
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between"
	},
	iconEmail: {
		margin: `0 ${theme.spacing(1)}px`,
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.text.secondary,
		'&:hover': {
			backgroundColor: theme.palette.text.secondary,
		},
	},
	icon: {
		margin: `0 ${theme.spacing(1)}px`,
	},
	info: {
		display: "block"
	}
})
export default styles