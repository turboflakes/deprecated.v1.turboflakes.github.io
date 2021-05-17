const styles = (theme) => ({
	root: {
		marginBottom: theme.spacing(2)
	},
	titleBox: {
		display: "flex",
		alignItems: "center",
		marginLeft: -theme.spacing(2)
	},
	title: {
	},
	slider: {
		maxWidth: "96%",
		marginLeft: theme.spacing(1)
	},
	markLabel: {
		color: theme.palette.neutrals[400]
	},
	markLabelActive: {
		color: theme.palette.text.primary
	}
})
export default styles