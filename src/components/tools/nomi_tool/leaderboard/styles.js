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
		padding: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
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
		// transform: "rotate(45deg)",
		// boxShadow: "2px 2px #000"
	},
	settingsWrapperBox: {
		margin: `${theme.spacing()}px 0`,
	},
	settingsBox: {
		display: "flex",
		height: 704, // maxHeight
	},
	leaderboardBox:{
		position: "relative",
		display: "flex",
		alignItems: "start",
		marginRight: 2
	},
	iconExpandBox: {
		zIndex: 1,
		backgroundColor: "rgba(77,77,77,0.9)",
		borderTopLeftRadius: theme.spacing(3),
		padding: `${theme.spacing()/2}px 0 ${theme.spacing()/2}px ${theme.spacing()/2}px`,
		marginBottom: 2
	},
	iconExpand: {
		zIndex: 1,
		color: theme.palette.text.secondary,
	},
	listBox: {
		backgroundColor: "rgba(77,77,77,0.9)",
		borderBottomLeftRadius: theme.spacing(3),
		overflow: "auto",
		height: 652,
	},
	list: {
	},
	tabs: {
		marginTop: theme.spacing(1)
	},
	tab: {
    zIndex: 1,
		height: 48,
		backgroundColor: "#4D4D4D",
		// marginRight: -32,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		borderBottom: "2px solid #FFF",
		fontSize: "0.8rem",
		'&.Mui-selected' : {
			color: theme.palette.text.secondary,
		},
	},
	counter: {
		backgroundColor: "#FFF",
		borderRadius: "50%",
		width: 26,
		height: 26,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		margin: `0 ${theme.spacing(1)}px 0 0`,
		color: theme.palette.text.primary
	},
	tabWrapper: {
		display: "flex",
		flexDirection: "row"
	},
	tabLabelIcon: {
		minHeight: 0
	}
})
export default styles