import {combineReducers} from 'redux'

const view = (state = "", action) => {
  switch (action.type) {
    case "CLEAR_VIEW": {
      return ""
    }
    case "SCROLL_INTO_VIEW": {
      return action.view
    }
    default:
      return state
  }
}

const scrollable = (state = true, action) => {
  switch (action.type) {
    case "ENABLE_SCROLL": {
      return true
    }
    case "DISABLE_SCROLL": {
      return false
    }
    default:
      return state
  }
}

export const layout = combineReducers({
  view,
  scrollable,
})