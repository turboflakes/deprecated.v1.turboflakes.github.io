const styles = (theme) => ({
	root: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.neutrals[300],
		height: "100%"
	},
	header:{
		position: "relative",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginBottom: theme.spacing(2)
	},
	footer:{
		position: "relative",
	},
	rootItemText:{
		flex: "0 1 auto"
	},
	primaryItemText: {
    color: "#6F7072",
		paddingRight: theme.spacing(1)
  },
	secondaryItemText: {
    color: theme.palette.text.primary,
  },
	backIcon: {
		position: "absolute",
		right: 0
	},
	graphIcon: {
		position: "absolute",
		marginRight: theme.spacing(1)
	}
})
export default styles