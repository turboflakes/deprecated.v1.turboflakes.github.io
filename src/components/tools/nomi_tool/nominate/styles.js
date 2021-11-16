const styles = (theme) => ({
	root: {
		position: "absolute",
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		width: "100%"
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
		height: 484,
	},
	list: {

	}
	
})
export default styles