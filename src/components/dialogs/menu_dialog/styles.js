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
    margin: `${theme.spacing(8)}px 0`
  },
  contentRoot:{
    padding: `${theme.spacing(2)}px ${theme.spacing(8)}px`,
    margin: `0 auto`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing()}px ${theme.spacing(2)}px`,
    }
  },
  closeButton: {
    [theme.breakpoints.down('sm')]: {
      marginTop: -8,
      marginLeft: -24,
		}
  },
  gutterBottom: {
    marginBottom: theme.spacing(),
  },
  closeButtonBox:{
    position: "absolute",
    right: theme.spacing(3),
    top: theme.spacing(2)
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