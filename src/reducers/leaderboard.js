import {combineReducers} from 'redux'
import _union from 'lodash/union'
import {WEIGHTS, LIMITS} from '../constants'

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

export const intervals = (state = LIMITS.toString(), action) => {
  switch (action.type) {
    case "CHANGE_INTERVAL": {
      let t = state.split(",")
      t[action.data.index] = action.data.interval
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
    case "CLEAR_STORE":
      return []
    case "REMOVE_ADDRESS":
      return state.filter(address => address !== action.address)
    case "ADD_ADDRESS":
      const s = state.filter(address => address !== action.address)
      return [...s, action.address]
    case "ADD_ADDRESSES":
      return _union(state, action.addresses)
    default:
      return state
  }
}

export const leaderboard = combineReducers({
  weights: weights,
  intervals: intervals,
  quantity: quantity,
  selected: selected,
  nominations: nominations
})
