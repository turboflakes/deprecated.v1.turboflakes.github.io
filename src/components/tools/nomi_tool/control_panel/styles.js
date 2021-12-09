const styles = (theme) => ({
	root: {
		position: "relative",
		color: theme.palette.text.secondary,
		// borderBottomRightRadius: theme.spacing(3),
		overflow: "hidden"
	},
	quantityBoxWrapper:{ 
		borderTopRightRadius: theme.spacing(3),
		backgroundColor: "rgba(77,77,77,0.95)",
		padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
		display: "flex",
		marginBottom: 1
	},
	quantityBox: {
	},
	nominateBox: {
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "flex-end",
		flexGrow: 1
	},
	slidersTitles: {
		display: "flex",
	},
	titleBox: {
		padding: `${theme.spacing(2)}px 0 0 ${theme.spacing(2)}px`,
	},
	weightsTitleBox: {
		backgroundColor: "rgba(77,77,77,0.95)"
	},
	slidersTitleBox: {
		backgroundColor: "rgba(77,77,77,0.9)"
	},
	slidersBox: {
		display: "flex",
		justifyContent: "space-between",
		overflowY: "scroll",
		overflowX: "hidden",
		height: 248,
	},
	weightsSlidersBox:{
		width: 260,
	},
	intervalsSlidersBox:{
		width: 260,
	},
	noSlider: {
		minHeight: 76,
		backgroundColor: "rgba(77,77,77,0.9)",
	},
	popoverList: {
		marginLeft: theme.spacing(1)
	},
	counter: {
		backgroundColor: "#FFF",
		borderRadius: "50%",
		width: 26,
		height: 26,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		margin: `0 ${theme.spacing(1)}px 0px 0`,
		color: theme.palette.text.primary,
		fontSize: "inherit !important"
	},
	
})
export default styles