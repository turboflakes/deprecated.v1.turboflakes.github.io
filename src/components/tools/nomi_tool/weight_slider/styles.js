const styles = (theme) => ({
	root: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: theme.spacing()
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
		minHeight: 64,
		width: 128,
	},
	title: {

	},
	caption: {

	},
	sliderBox: {
		margin: `${theme.spacing(1)}px 0`
	},
	slider: {
		width: 128,
		margin: `0 ${theme.spacing(1)}px`
	},
})
export default styles