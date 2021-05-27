const styles = (theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.text.secondary,
		// background: theme.palette.gradients.default270
	},
	appBar: {
		backgroundColor: "inherit",
		borderBottom: `solid 1px ${theme.palette.dividerLight}`,
	},
	toolBar: {
		margin: theme.spacing(2),
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center"
	},
	logo: {
		width: 140,
		height: 80
	},
	motoBox: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	moto: {
		fontWeight: 300,
	},
})
export default styles