const styles = (theme) => ({
	root: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: theme.spacing(1),
		backgroundColor: "rgba(77,77,77,0.8)",
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
	},
	title: {

	},
	caption: {

	},
	slider: {
		width: "100%",
		margin: `0 ${theme.spacing(3)}px 0 ${theme.spacing(2)}px`
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