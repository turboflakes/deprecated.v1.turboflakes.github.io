const styles = (theme) => ({
	root: {
		margin: `0 ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`
	},
	markLabel: {
		color: theme.palette.neutrals[400]
	},
	markLabelActive: {
		color: theme.palette.text.primary
	}
})
export default styles