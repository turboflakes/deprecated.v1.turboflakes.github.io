const styles = (theme) => ({
	root: {
		position: "absolute",
		right: theme.spacing(1),
		// top: -92, // Search box height,
		top: "calc(-10vh)", // since nomi board takes 90vh of space
		borderRadius: theme.spacing(2),
		padding: `${theme.spacing(1)}px 0 0 0`,
	},
	networkBox: {
		width: 384,
		backgroundColor: theme.palette.neutrals[300],
		padding: `${theme.spacing(1)}px 0 0 ${theme.spacing(1)}px`,
		borderTopLeftRadius: theme.spacing(3),
		borderTopRightRadius: theme.spacing(3),
		position: "relative",
		display: "flex",
		alignItems: "center",
	},
	networkLabel: {
		margin: `0 ${theme.spacing(2)}px`,
		minWidth: 100
	},
	networkLogoBox: {
		position: 'relative',
		margin: `0 0 ${theme.spacing()}px 0`
	},
	spinner: {
		position: 'absolute',
		top: -5,
		left: -5,
		color: theme.palette.text.secondary,
		zIndex: 1,
	},
	networkLogo: {
		width: 48,
		height: 48
	},
	titleBox: {
		width: 384,
		position: "relative",
		backgroundColor: theme.palette.neutrals[300],
		padding: `0 0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
		borderBottomLeftRadius: theme.spacing(3),
		borderBottomRightRadius: theme.spacing(3),
		marginBottom: 2,
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
	iconNetwork: {
		color: theme.palette.text.secondary
	},
	iconFetching: {
		position: "absolute",
		right: 48 + theme.spacing(3),
		top: theme.spacing(3),
		color: theme.palette.text.secondary
	},
	iconScroll: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.text.secondary,
	},
	settingsWrapperBox: {
		margin: `${theme.spacing()}px 0`,
	},
	panelBox: {
		display: "flex",
	},
	configBox: {
		borderTopRightRadius: theme.spacing(3),
	},
	configHeaderBox: {
		display: "flex",
		justifyContent: "flex-end",
		backgroundColor: "rgba(77,77,77,0.9)",
		borderTopRightRadius: theme.spacing(3),
	},
	leaderboardBox:{
		position: "relative",
		display: "flex",
		alignItems: "start",
		marginRight: 1
		// borderRight: "1px solid rgba(77,77,77,0.8)"
	},
	expandBox: {
		zIndex: 1,
		backgroundColor: "rgba(77,77,77,0.9)",
		borderTopLeftRadius: theme.spacing(3),
		// marginBottom: 2,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center"
	},
	expandTitle: {
		padding: `0 ${theme.spacing(2)}px`,
	},
	iconExpand: {
		zIndex: 1,
		color: theme.palette.text.secondary,
	},
	listBox: {
		backgroundColor: "rgba(77,77,77,0.9)",
		overflow: "auto",
		height: 698,
	},
	list: {
	},
	footerBox: {
		minWidth: 48,
		minHeight: 21,
		padding: `0 ${theme.spacing(2)}px`,
		backgroundColor: "rgba(77,77,77,0.9)",
		borderBottomLeftRadius: theme.spacing(3),
	},
})
export default styles