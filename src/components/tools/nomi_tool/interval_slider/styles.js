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
	},
	title: {

	},
	caption: {

	},
	slider: {
		width: 256,
		margin: `0 ${theme.spacing(1)}px`
	},
	sliderValueLabel: {
		// left: 'calc(-50% - 2px)',
		top: -20,
		minWidth: theme.spacing(3),
		fontSize: "0.75rem",
		textAlign: "center",
		'& *': {
			background: 'transparent',
			color: '#fff',
		},
	},	
})
export default styles