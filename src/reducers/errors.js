export const errors = (state = [], action) => {
  if (action.error) {
    if (action.error.errors) {
      const errors = action.error.errors.map(msg => {
        return {msg, id: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}
      })
      return [...state, ...errors]
    }
    return [...state, {msg: action.error, id: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}]
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
