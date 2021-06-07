const styles = (theme) => ({
	root: {
		marginBottom: theme.spacing(2)
	},
	titleBox: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: -theme.spacing(1)
	},
	sliderBox: {
		margin: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px 0`
	},
	slider: {
		maxWidth: "96%",
		margin: `0 0 ${theme.spacing(1)}px ${theme.spacing(1)}px`
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