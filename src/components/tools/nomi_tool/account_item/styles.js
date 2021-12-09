const styles = (theme) => ({
	root: {
		maxWidth: 252
	},
	rootItem: {
		textAlign: "center",
		'&:hover': {
			backgroundColor: theme.palette.neutrals[300],
		},
	},
	rootItemAvatar: {
		minWidth: 48
	},
	selectedItem: {
		backgroundColor: `${theme.palette.primary.main} !important`,
		overflow: "visible",
	},
	itemText: {
		fontSize: "1rem",
		color: theme.palette.text.secondary,
		padding: `0 ${theme.spacing()}px`
	},
	progress: {
		color: theme.palette.text.secondary
	},
	indexBox: {
		padding: `0 ${theme.spacing()}px`,
		display: "flex",
		// justifyContent:
	}
})
export default styles