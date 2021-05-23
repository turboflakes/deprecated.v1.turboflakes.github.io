const styles = (theme) => ({
	root: {},
	rootItem: {
		'&:hover': {
			backgroundColor: theme.palette.primary.main,
		},
	},
	selectedItem: {
		backgroundColor: `${theme.palette.neutrals[300]} !important`,
		left: theme.spacing(4),
		borderTopLeftRadius: theme.spacing(3),
		borderBottomLeftRadius: theme.spacing(3),
		overflow: "visible"
	},
	selectedItemText: {
		color: theme.palette.text.primary
	}
})
export default styles