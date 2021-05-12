const styles = (theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	appBar: {
		backgroundColor: "inherit",
		borderBottom: `solid 1px ${theme.palette.dividerLight}`,
	},
	toolBar: {
		padding: theme.spacing(2),
	},
})
export default styles