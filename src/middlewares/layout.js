
const middleware = store => next => action => {
  let nextAction = next(action)
  if (action.type === "ENABLE_SCROLL") {
    document.body.classList.remove("disable-scroll")
  }
  if (action.type === "DISABLE_SCROLL") {
    document.body.classList.add("disable-scroll")
  }
  
  return nextAction
}

export default middleware