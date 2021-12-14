const styles = (theme) => ({
  root: {
  },
  heroBox: {
    ...theme.container,
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: `${theme.spacing(8)}px 0`,
    height: theme.spacing(48) // 384px
  },
  meet: {
    fontFamily: "'Roboto', sans-serif",
  },
  titleBox: {
    width: "60%",
  },
  logoBox: {
    width: "40%",
  },
  logo: {
    width: 260,
  },
  logoAnimateOutRight:{
    animation: "bounceOutRight",
  	animationDuration: "0.4s",
  },
  logoAnimateInRight:{
    animation: "fadeInRight",
  	animationDuration: "0.7s",
  },
  logoFixedBoard: {
    position: "absolute",
    top: "calc(384px - 5vh)",
    left: 0, 
    width: 160,
  },
  logoAnimateInLeft:{
    animation: "fadeInLeft",
  	animationDuration: "0.7s",
  },
  link: {
    textDecoration: "underline"
  },
  nameBox: {
    marginBottom: theme.spacing(4),
    maxWidth: "max-content",
  },
  nameBase: {
    background: "linear-gradient(90deg, #00AEEF, #F7941D)",
    height: theme.spacing(2),
    margin: `-${theme.spacing(1)}px ${theme.spacing(1)/2}px 0 ${theme.spacing(1)/2}px`,
  },
  nomiTitle: {
    margin: `${theme.spacing(4)}px 0 0 ${theme.spacing(6)}px`
  },
  animationBox:{
    height: "95vh",
    position: "relative",
  },
  watermark: {
    position: "absolute",
    color: "rgba(255,255,255,0.9)",
    zIndex: 1,
    top: theme.spacing(2),
    left: theme.spacing(2),
    maxWidth: 96
  },
  headWatermark: {
    position: "absolute",
    zIndex: 1,
    top: theme.spacing(8),
    maxWidth: 90
  },
  visible: {
    left: theme.spacing(2)
  },
  logoAnimateFadeOutLeft:{
    animation: "bounceOutLeft",
  	animationDuration: "1s",
  },
})
export default styles