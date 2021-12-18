const styles = (theme) => ({
	root: {
		background: theme.palette.text.primary,
		padding: `0 ${theme.spacing(2)}px`,
	},
	container: {
		...theme.container,
  },
	padding: {
		padding: `${theme.spacing(6)}px 0`,
		[theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(2)}px 0`,
    },
	},
	list: {
		maxWidth: 600
	},
	logo:{
		height: 64,
		marginBottom: theme.spacing(3)
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
	iconRoot: {
    color: theme.palette.text.secondary,
		marginTop: -theme.spacing(2)
  },
	networksContainer: {
		display: "flex",
		alignItems: "center",
		padding: `${theme.spacing(2)}px ${theme.spacing(6)}px ${theme.spacing(6)}px ${theme.spacing(6)}px`,
		[theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    }
	},
	aboutNetwork: {
		marginLeft: theme.spacing(4),
	},
	kusamaLogo:{
		height: '80px',
		maxWidth: '120px',
	},
	polkadotLogo:{
		height: '80px',
		marginLeft: -20
	},
	bottom: {
		padding: `${theme.spacing(3)}px 0`,
		display: "flex",
		alignItems: "center",
		flexWrap: "wrap"
	},
	icon: {
		margin: `0 ${theme.spacing(1)}px`,
		border: "1px solid #FFF",
		color: theme.palette.text.secondary,
		width: 40,
		height: 40,
	},
	soicon: {
		width: 24,
		height: 24,
	},
	infoBox: {
		marginBottom: theme.spacing(2),
	},
	info: {
		display: "block",
		color: theme.palette.text.secondary,
	},
	pages: {
		display: "flex",
	},
	page: {
		marginRight: theme.spacing(2),
	}
})
export default styles