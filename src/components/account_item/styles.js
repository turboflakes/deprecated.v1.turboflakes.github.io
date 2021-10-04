const styles = (theme) => ({
	root: {},
	rootItem: {
		textAlign: "center",
		'&:hover': {
			backgroundColor: theme.palette.neutrals[300],
		},
	},
	selectedItem: {
		backgroundColor: `${theme.palette.primary.main} !important`,
		overflow: "visible",
	},
	itemText: {
		color: theme.palette.text.secondary,
		padding: `0 ${theme.spacing()}px`
	},
})
export default styles