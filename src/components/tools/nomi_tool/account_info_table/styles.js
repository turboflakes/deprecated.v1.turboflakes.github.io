const styles = (theme) => ({
	root: {
		position: "absolute",
		top: theme.spacing(3),
		left: theme.spacing(3),
		padding: theme.spacing(2),
		backgroundColor: "rgba(255,255,255,0.96)",
		width: (window.innerWidth / 2.2) - theme.spacing(),
		height: (window.innerWidth / 2.2) - theme.spacing(),
		borderRadius: "50%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		// 
		// "--animate-duration": "10s",
		// animation: "fadeIn", /* referring directly to the animation's @keyframe declaration */
  	// animationDuration: "0.5s", /* don't forget to set a duration! */
	},
	headerBox:{
		height: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: theme.spacing(2),
		animation: "fadeIn",
  	animationDuration: "0.2s",
	},
	rank: {
		marginBottom: theme.spacing(2)
	},
	tableBox: {
		height: "100%",
		position: "relative",
		animation: "fadeIn",
  	animationDuration: "0.2s",
	},
	tableContainerRoot: {
		height: "100%",
		backgroundColor: "inherit",
	},
	table: {
	},
	tableRow: {
		color: theme.palette.text.primary,
		'&:last-child td, &:last-child th': {
			border: 0
		}
	},
	closeButton: {
		position: "absolute",
		top: -48,
		left: 0
	},
	selectButton: {
		position: "absolute",
		top: -48,
		right: 0,
		minWidth: 180
	},
	iconLogo: {
		width: 26,
		height: 26
	},
	footerBox:{
		height: "100%",
		animation: "fadeIn",
  	animationDuration: "0.2s",
	},
	cellFooter: {
		fontSize: "0.9rem",
		fontWeight: 700,
		color: theme.palette.text.primary
	}
})
export default styles