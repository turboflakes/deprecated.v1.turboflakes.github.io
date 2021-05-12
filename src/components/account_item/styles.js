const styles = (theme) => ({
	root: {},
	rootItem: {
		'&:hover': {
			backgroundColor: theme.palette.secondary.light,
		},
	},
	primaryItemText: {
		fontWeight: "bold",
		marginLeft: theme.spacing(4)
	}
})
export default styles