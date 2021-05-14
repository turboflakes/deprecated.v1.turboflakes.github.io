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
		display: "flex",
		justifyContent: "space-between"
	},
	moto: {
		fontWeight: 300
	},
	networkLogo: {
		margin: `0 ${theme.spacing(1)}px 0 0`,
		// maxWidth: 200
	}
})
export default styles