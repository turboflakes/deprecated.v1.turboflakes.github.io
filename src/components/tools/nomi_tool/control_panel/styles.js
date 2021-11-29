const styles = (theme) => ({
	root: {
		position: "relative",
		right: -384,
		color: theme.palette.text.secondary,
		// width: 768,
		// height: "75vh",
		// backgroundColor: "rgba(77,77,77,0.9)",
		borderBottomRightRadius: theme.spacing(3),
	},
	iconExpand: {
		position: "absolute",
		top: theme.spacing(1),
		right: 392,
		color: theme.palette.text.secondary,
	},
	quantityBoxWrapper:{ 
		width: "100%",
		backgroundColor: "rgba(77,77,77,0.9)",
		marginBottom: 2, 
	},
	quantityBox: {
		padding: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
	},
	slidersTitles: {
		display: "flex",
	},
	weightsTitle: {
		width: 288,
		padding: `0 ${theme.spacing(2)}px`,
	},
	filtersTitle: {
		width: 288,
		padding: `0 ${theme.spacing(2)}px`,
	},
	slidersBox: {
		display: "flex",
		justifyContent: "space-between",
		overflowY: "scroll",
		overflowX: "hidden",
		height: 599,
	},
	weightsSlidersBox:{
		width: 288,
	},
	intervalsSlidersBox:{
		width: 288,
		// height: "10
	},
	slidersInline: {
		// display: "flex",
		// justifyContent: "space-between"
	},
	noSlider: {
		minHeight: 80,
		backgroundColor: "rgba(77,77,77,0.7)",
	},
	
})
export default styles