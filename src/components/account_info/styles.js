const styles = (theme) => ({
	root: {
		
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
    color: theme.palette.neutrals[500],
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