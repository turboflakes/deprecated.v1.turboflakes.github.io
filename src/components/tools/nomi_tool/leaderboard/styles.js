const styles = (theme) => ({
	root: {
		position: "absolute",
		right: theme.spacing(2),
		top: -theme.spacing(10),
		// right: theme.spacing(2),
		// top: "10vh",
		// backgroundColor: theme.palette.neutrals[300],
		borderRadius: theme.spacing(2),
		minWidth: 400,
		// minHeight: 210
	},
	networkBox: {
		backgroundColor: theme.palette.neutrals[300],
		padding: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
		borderTopLeftRadius: theme.spacing(3),
		// borderTopRightRadius: theme.spacing(3),
		position: "relative",
		display: "flex",
		alignItems: "center",
	},
	networkLabel: {
		margin: `0 ${theme.spacing(1)}px`,
	},
	networkLogo: {
		width: 49,
		height: 49
	},
	titleBox: {
		position: "relative",
		backgroundColor: theme.palette.neutrals[300],
		padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
		borderBottomLeftRadius: theme.spacing(3),
		borderBottomRightRadius: theme.spacing(3),
	},
	rootIconClasses: {
		color: theme.palette.text.primary,
		width: 10
	},
	iconSettings: {
		position: "absolute",
		right: theme.spacing(),
		bottom: theme.spacing(),
		color: theme.palette.text.secondary
	},
	settingsBox: {
		display: "flex",
		height: 695,
		margin: `${theme.spacing()}px 0`,
		backgroundColor: "rgba(77,77,77,0.9)",
		borderTopRightRadius: theme.spacing(3),
		borderBottomRightRadius: theme.spacing(3)
	},
	leaderboardBox:{
		position: "relative",
		display: "flex",
		alignItems: "start",
		borderRight: `1px solid ${theme.palette.neutrals[100]}`,		
	},
	iconExpandBox: {
		zIndex: 1,
		backgroundColor: "rgba(77,77,77,0.9)",
		borderTopLeftRadius: theme.spacing(3),
		padding: `${theme.spacing()/2}px 0 0 ${theme.spacing()/2}px`
	},
	iconExpand: {
		zIndex: 1,
		color: theme.palette.text.secondary,
	},
	listBox: {
		backgroundColor: "rgba(77,77,77,0.9)",
		borderBottomLeftRadius: theme.spacing(3),
		overflow: "auto",
		height: 643,
	},
	list: {
	},
	tabIcon: {
		width: 26,
		height: 26
	}
})
export default styles