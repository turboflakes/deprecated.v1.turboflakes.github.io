const styles = (theme) => ({
	root: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: theme.spacing()
	},
	titleBox: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {

	},
	sliderBox: {
		margin: `${theme.spacing(1)}px 0`
	},
	slider: {
		maxWidth: 200,
		margin: `0 ${theme.spacing(1)}px`
	},
	sliderRangeRoot: {
		height: 4,
	},
	sliderRangeTrack: {
		height: 4,
		borderRadius: 2,
	},
	sliderRangeRail: {
		height: 4,
		borderRadius: 2,
	},
	sliderRangeThumb: {
		height: 18,
		width: 18,
		backgroundColor: '#fff',
		border: '2px solid currentColor',
		marginTop: -7,
		marginLeft: -10,
		// '&:focus, &:hover, &$active': {
		//   boxShadow: 'inherit',
		// },
	},
	sliderRangeValueLabel: {
		left: 'calc(-50% - 2px)',
		top: 30,
		minWidth: theme.spacing(3),
		fontSize: "0.75rem",
		textAlign: "center",
		'& *': {
			background: 'transparent',
			color: '#000',
		},
	},
	
})
export default styles