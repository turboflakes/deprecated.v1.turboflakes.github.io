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
		minHeight: 56,
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
		maxWidth: 200,
		margin: `0 ${theme.spacing(1)}px`
	},
	sliderInterval: {
		maxWidth: "50%",
		margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`
	},
	sliderIntervalBox: {
		margin: `${theme.spacing(2)}px 0`
	},
	sliderIntervalRoot: {
		height: 4,
	},
	sliderIntervalTrack: {
		height: 4,
		borderRadius: 2,
	},
	sliderIntervalRail: {
		height: 4,
		borderRadius: 2,
	},
	sliderIntervalThumb: {
		height: 18,
		width: 18,
		backgroundColor: '#fff',
		border: '2px solid currentColor',
		marginTop: -7,
		marginLeft: -10,
		'&.Mui-disabled': {
			height: 18,
			width: 18,
			backgroundColor: '#fff',
			border: '2px solid currentColor',
			marginTop: -7,
			marginLeft: -10,
		}
		// '&:focus, &:hover, &$active': {
		//   boxShadow: 'inherit',
		// },
	},
	sliderIntervalValueLabel: {
		left: 'calc(-50% - 2px)',
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