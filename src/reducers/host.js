export const host = (state = "", action) => {
  switch (action.type) {
    case "SET_HOST":
      return action.host
    default:
      return state
  }
}
