import {combineReducers} from 'redux'
import _union from 'lodash/union'
import {WEIGHTS, COMMISSION_PLANCK} from '../constants'
import { parseIntervalsIntoArray, parseIntervalsArrayIntoString } from '../utils/math'

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

export const intervals = (state = "", action) => {
  switch (action.type) {
    case "CLEAR_STORE":
      return ""
    case "QUERY_VALIDATOR_SUCCESS": {
      if (state === "") {
        // Note: Define default intervals, some based on the board limits others static
        let i = parseIntervalsIntoArray(action.response.result.meta.limits)
        // Default Inclusion Rate [0.2, 1]
        i[0] = [0.2, 1]
        // Default Commission [0, 200_000_000] = [0, 20%]
        i[1] = [0, 0.2*COMMISSION_PLANCK]
        // Default Nominators number [0, 255]
        i[2] = [0, 255]
        // Default Sub-accounts number [0, 10]
        i[9] = [0, 10]
        return parseIntervalsArrayIntoString(i)
      }
      return state
    }
    case "CHANGE_INTERVAL": {
      let t = state.split(",")
      t[action.data.index] = action.data.interval.join().replace(',', ':')
      return t.toString()
    }
    default:
      return state
  }
}

export const limits = (state = "", action) => {
  switch (action.type) {
    case "CLEAR_STORE":
      return ""
    case "QUERY_VALIDATOR_SUCCESS": {
      return action.response.result.meta.limits
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
    case "CLEAR_STORE":
      return ""
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
  limits: limits,
  intervals: intervals,
  quantity: quantity,
  selected: selected,
  nominations: nominations
})
