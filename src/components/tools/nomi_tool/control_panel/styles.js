const styles = (theme) => ({
	root: {
		width: "100%",
		position: "absolute",
		padding: theme.spacing(2),
	},
	slidersBox: {
		display: "flex",
		justifyContent: "space-between"
	},
	weightsSlidersBox:{
		flexGrow: 1
	},
	intervalsSlidersBox:{
		flexGrow: 1
	},
	slidersInline: {
		// display: "flex",
		// justifyContent: "space-between"
	},
	noSlider: {
		minHeight: 64
	}
})
export default styles