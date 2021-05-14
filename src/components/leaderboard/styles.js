const styles = (theme) => ({
	root: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.neutrals[120],
	},
	top: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center"
	},
	icons: {
		display: "flex", 
		alignItems: "center"
	},
	list: {
		overflow: "auto",
    height: "80vh"
	},
})
export default styles