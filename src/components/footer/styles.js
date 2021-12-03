const styles = (theme) => ({
	root: {
		background: theme.palette.text.primary,
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
	trademark: {
		display: "flex",
		alignItems: "center"
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
		[theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(1)}px 0`,
    },
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
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
		marginLeft: theme.spacing(2),
	}
})
export default styles