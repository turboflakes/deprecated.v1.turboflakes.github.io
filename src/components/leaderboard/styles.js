const styles = (theme) => ({
	root: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.neutrals[120],
	},
	header: {
		display: "flex",
		justifyContent: "space-between"
	},
	list: {
		overflow: "auto",
    height: "80vh"
	},
})
export default styles