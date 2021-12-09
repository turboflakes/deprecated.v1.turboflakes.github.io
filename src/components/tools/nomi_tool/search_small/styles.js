const styles = (theme) => ({
  root: {
    
  },
  searchForm: {
    display: "flex",
    alignItems: "center",
  },
  textfield: {
    backgroundColor: theme.palette.neutrals[100],
    borderRadius: 30,
  },
  inputTextfield: {
    fontSize: "0.875rem"
  },
  adornedEndTextfield:{
    paddingRight: theme.spacing(1)/2
  },
  adornedStartTextfield: {
    paddingLeft: theme.spacing(1)/2
  }
})
export default styles