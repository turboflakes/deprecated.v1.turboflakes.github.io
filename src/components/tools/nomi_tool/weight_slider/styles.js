const styles = (theme) => ({
	root: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: theme.spacing(1),
		backgroundColor: "rgba(77,77,77,0.9)",
	},
	traitBox: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	titleBox: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		minHeight: 60,
		width: 98,
	},
	title: {

	},
	caption: {

	},
	slider: {
		width: "100%",
		margin: `0 ${theme.spacing(1)}px 0 ${theme.spacing(2)}px`
	},
})
export default styles