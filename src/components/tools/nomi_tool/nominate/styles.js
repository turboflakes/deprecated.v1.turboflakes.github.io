const styles = (theme) => ({
	root: {
		position: "relative",
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		height: 710,
		width: 384,
		backgroundColor: "rgba(77,77,77,0.9)",
	},
	formControl: {
		marginBottom: theme.spacing(2),
		width: "100%"
	},
	actionsBox: {
		display: "flex",
		marginBottom: theme.spacing(2),
	},
	select: {
		borderRadius: 30,
		border: `2px solid ${theme.palette.text.secondary}`,
		borderColor: theme.palette.text.secondary,
		color: theme.palette.text.secondary,
		minHeight: 44
	},
	selectRoot: {
		padding: `8px 16px`,
	},
	selectOutlined: {
		...theme.typography.button,
	},
	button: {
		marginRight: theme.spacing(2),
	},
	listBox: {
		borderRadius: theme.spacing(2),
		backgroundColor: "rgba(255,255,255,0.1)",
		overflow: "auto",
		marginBottom: theme.spacing(2),
		height: "74%",
	},
	list: {

	},
	candidatesLabel: {
		width: "100%"
	},
	candidatesCounter: {
		backgroundColor: "#FFF",
		borderRadius: "50%",
		width: 26,
		height: 26,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		margin: `0 ${theme.spacing(2)}px`,
		color: theme.palette.text.primary,
		float: "right"
	},
	
})
export default styles