import {combineReducers} from 'redux'
import {WEIGHTS} from '../constants'

export const weights = (state = WEIGHTS.toString(), action) => {
  switch (action.type) {
    case "CHANGE_WEIGHT": {
      let t = state.split(",")
      t[action.data.index] = action.data.weight
      return t.toString()
    }
    default:
      return state
  }
}

export const quantity = (state = 16, action) => {
  switch (action.type) {
    case "CHANGE_QUANTITY":
      return action.value
    default:
      return state
  }
}

export const selected = (state = 0, action) => {
  if (action.error) {
    return 0
  }
  switch (action.type) {
    case "SELECT_ADDRESS":
      return action.address
    case "CLEAR_ADDRESS":
      return 0
    default:
      return state
  }
}

export const leaderboard = combineReducers({
  weights: weights,
  quantity: quantity,
  selected: selected
})
