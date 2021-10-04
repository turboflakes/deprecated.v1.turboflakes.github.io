const styles = (theme) => ({
  root: {
  },
  dialogFullScreen: {
    background: "linear-gradient(90deg,rgba(255,0,24,1),rgba(255,8,125,1))"
  },
  titleRoot:{
    margin: `0 auto`,
  },
  logo: {
    margin: `${8*theme.spacing.unit}px 0`
  },
  contentRoot:{
    padding: `${2*theme.spacing.unit}px ${8*theme.spacing.unit}px`,
    margin: `0 auto`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing.unit}px ${2*theme.spacing.unit}px`,
    }
  },
  closeButton: {
    [theme.breakpoints.down('sm')]: {
      marginTop: -8,
      marginLeft: -24,
		}
  },
  gutterBottom: {
    marginBottom: theme.spacing.unit,
  },
  closeButtonBox:{
    position: "absolute",
    right: 3*theme.spacing.unit,
    top: 2*theme.spacing.unit
  },
  closeButtonRoot:{
    color: "#fff"
  },
  closeButtonIconRoot:{
    fontSize: 34
  },
  link: {
    display: "block"
  },
  icon: {
		margin: `0 ${theme.spacing(1)}px`,
	},
  iconEmail: {
		margin: `0 ${theme.spacing(1)}px`,
		color: theme.palette.primary.main,
		backgroundColor: theme.palette.text.secondary,
		'&:hover': {
			backgroundColor: theme.palette.text.secondary,
		},
		width: 32,
		height: 32
	},
})
export default styles