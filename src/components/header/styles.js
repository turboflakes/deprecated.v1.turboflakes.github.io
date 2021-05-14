const styles = (theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.neutrals[500],
	},
	appBar: {
		backgroundColor: "inherit",
		borderBottom: `solid 1px ${theme.palette.dividerLight}`,
	},
	toolBar: {
		padding: theme.spacing(2),
	},
	logo: {
		margin: theme.spacing(1),
	}
})
export default styles