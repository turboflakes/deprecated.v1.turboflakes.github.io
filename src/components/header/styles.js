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
		justifyContent: "space-between",
		alignItems: "center"
	},
	logo: {},
	motoBox: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	moto: {
		fontWeight: 300,
	},
	motoSubtitle: {
		textTransform: "uppercase"
	}
})
export default styles