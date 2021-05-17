const styles = (theme) => ({
	root: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.neutrals[200],
	},
	top: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: theme.spacing(1)
	},
	icons: {
		display: "flex", 
		alignItems: "center"
	},
	list: {
		overflow: "auto",
    height: "80vh"
	},
	light:{
		background: theme.palette.text.secondary,
	},
	network: {
		display: "flex",
		alignItems: "center",
	},
	networkLabel: {
		margin: `0 ${theme.spacing(1)}px`,
	},
	networkLogo: {
		width: 32,
		height: 32
	}
})
export default styles