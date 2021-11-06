const styles = (theme) => ({
  root: {
    height: "120vh",
  },
  nomiHeader: {
    background: "linear-gradient(0deg, #F1F1F0, #FFF)",
    height: "30vh",
    borderBottom: `solid 2px #FFF`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  nomiTitle: {
    margin: `${theme.spacing(4)}px 0 0 ${theme.spacing(6)}px`
  },
  meet: {
    fontFamily: "'Roboto', sans-serif",
  },
  animationBox:{
    height: "90vh",
    position: "relative",
    
  },  
})
export default styles