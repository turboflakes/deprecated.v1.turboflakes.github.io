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
})
export default styles