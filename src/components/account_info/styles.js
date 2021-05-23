const styles = (theme) => ({
	root: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.neutrals[300],
		height: "100%"
	},
	fetching: {
		height: "100%",
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.palette.neutrals[300],
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
		fontSize: "1rem"
  },
	secondaryItemText: {
    ...theme.typography.caption,
		fontSize: "0.75rem",
  },
	backIcon: {
		position: "absolute",
		right: 0
	},
	graphIcon: {
		position: "absolute",
		marginRight: theme.spacing(1)
	},
	listItem:{
		display: "flex",
		alignItems: "center",
		paddingLeft: 0,
		paddingRight: 0,
	},
	inline: {
    display: 'inline',
  },
	block: {
    display: 'block',
  },
	polkadotJsLogo: {
		width: 32,
		height: 32
	}
})
export default styles