import {combineReducers} from 'redux'

export const inclusion = (state = 0, action) => {
  switch (action.type) {
    case "CHANGE_INCLUSION_WEIGHT":
      return action.weight
    default:
      return state
  }
}

export const commission = (state = 0, action) => {
  switch (action.type) {
    case "CHANGE_COMMISSION_WEIGHT":
      return action.weight
    default:
      return state
  }
}

export const points = (state = 0, action) => {
  switch (action.type) {
    case "CHANGE_POINTS_WEIGHT":
      return action.weight
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

const weights = combineReducers({
  inclusion: inclusion,
  commission: commission,
  points: points,
})

export const leaderboard = combineReducers({
  weights: weights,
  quantity: quantity
})
