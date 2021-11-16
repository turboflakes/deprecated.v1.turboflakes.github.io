import {combineReducers} from 'redux'
import {WEIGHTS, RANGES} from '../constants'

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

export const ranges = (state = RANGES.toString(), action) => {
  switch (action.type) {
    case "CHANGE_RANGE": {
      let t = state.split(",")
      t[action.data.index] = action.data.range
      return t.toString()
    }
    default:
      return state
  }
}

export const quantity = (state = 24, action) => {
  switch (action.type) {
    case "CHANGE_QUANTITY":
      return action.value
    default:
      return state
  }
}

export const selected = (state = "", action) => {
  if (action.error) {
    return ""
  }
  switch (action.type) {
    case "SELECT_ADDRESS":
      return action.address
    case "CLEAR_ADDRESS":
      return ""
    default:
      return state
  }
}

export const nominations = (state = [], action) => {
  switch (action.type) {
    case "REMOVE_ADDRESS":
      return state.filter(address => address !== action.address)
    case "ADD_ADDRESS":
      return [...state, action.error]
    case "ADD_ADDRESSES": 
    return action.addresses
    default:
      return state
  }
}

export const leaderboard = combineReducers({
  weights: weights,
  ranges: ranges,
  quantity: quantity,
  selected: selected,
  nominations: nominations
})
