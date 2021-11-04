export const errors = (state = [], action) => {
  if (action.error) {
    if (action.error.errors) {
      return [...state, action.error.errors]
    }
    return [...state, action.error]
  }
  switch (action.type) {
    case "CLEAR_STORE":
    case "CLEAR_ERROR_MESSAGES":
      return []
    case "REMOVE_ERROR":
      return state.filter(error => error.id !== action.id)
    case "ADD_ERROR":
      return [...state, action.error]
    default:
      return state
  }
}
