const styles = (theme) => ({
	root: {
		position: "absolute",
		right: theme.spacing(2),
		top: "50vh",
		// backgroundColor: theme.palette.neutrals[300],
		borderRadius: theme.spacing(2),
		minWidth: 400,
		// minHeight: 210
	},
	networkBox: {
		backgroundColor: theme.palette.neutrals[300],
		padding: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
		borderTopLeftRadius: theme.spacing(2),
		borderTopRightRadius: theme.spacing(2),
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
		backgroundColor: theme.palette.neutrals[300],
		padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
		borderBottomLeftRadius: theme.spacing(2),
		borderBottomRightRadius: theme.spacing(2),
	},
	rootIconClasses: {
		color: theme.palette.text.primary,
		width: 10
	},
	iconSettings: {
		position: "absolute",
		right: theme.spacing(2),
		bottom: theme.spacing(2),
		color: theme.palette.text.secondary
	},
	settingsBox: {
		display: "flex",
	},
	listBox:{
		position: "relative",
		backgroundColor: theme.palette.neutrals[300],
	},
	iconExpand: {
		position: "absolute",
		top: -theme.spacing(6),
		left: -60,
		overflow: "auto",
		maxWidth: 200
		// color: theme.palette.text.secondary
	},
	list: {
		position: "absolute",
		backgroundColor: "rgba(77,77,77,0.9)",
		borderRadius: theme.spacing(2),
		margin: `${theme.spacing()}px 0`,
		overflow: "auto",
		maxHeight: "85vh"
	},
	listRootItemExpand: {
		display: "flex",
		justifyContent: "end",
		textAlign: "center",
	},
})
export default styles