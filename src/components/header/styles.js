const styles = (theme) => ({
	root: {
		flexGrow: 1,
		background: theme.palette.gradients.default270
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
})
export default styles