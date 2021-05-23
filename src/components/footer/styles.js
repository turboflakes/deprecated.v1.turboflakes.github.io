const styles = (theme) => ({
	root: {
		background: theme.palette.text.primary,
	},
	container: {
    padding: theme.spacing(4)
  },
	trademark: {
		display: "flex",
		alignItems: "center"
	},
	logo:{
		margin: theme.spacing(3),
		maxWidth: 100,
		height: "100%"
	},
	primary: {
    color: theme.palette.text.secondary,
		wordWrap: "break-word"
  },
	secondary: {
    color: theme.palette.text.secondary,
		fontWeight: 500,
  },
	light:{
		background: theme.palette.text.secondary,
	},
	about: {
		display: "flex",
		alignItems: "center",
	},
	aboutNetwork: {
		padding: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	networkLink: {
		padding: `0 ${theme.spacing(3)}px`
	},
	kusamaLogo:{
		height: '80px',
		maxWidth: '120px',
		padding: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`
	},
	polkadotLogo:{
		height: '80px',
	},
	bottom: {
		padding: theme.spacing(2),
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between"
	},
	iconEmail: {
		margin: `0 ${theme.spacing(1)}px`,
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.text.secondary,
		'&:hover': {
			backgroundColor: theme.palette.text.secondary,
		},
		width: 32,
		height: 32
	},
	icon: {
		margin: `0 ${theme.spacing(1)}px`,
	},
	info: {
		display: "block"
	}
})
export default styles