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

export const rewardPoints = (state = 0, action) => {
  switch (action.type) {
    case "CHANGE_REWARD_POINTS_WEIGHT":
      return action.weight
    default:
      return state
  }
}

export const rewardStaked = (state = 0, action) => {
  switch (action.type) {
    case "CHANGE_REWARD_STAKED_WEIGHT":
      return action.weight
    default:
      return state
  }
}

export const active = (state = 0, action) => {
  switch (action.type) {
    case "CHANGE_ACTIVE_WEIGHT":
      return action.weight
    default:
      return state
  }
}

export const ownStake = (state = 0, action) => {
  switch (action.type) {
    case "CHANGE_OWN_STAKE_WEIGHT":
      return action.weight
    default:
      return state
  }
}

export const judgements = (state = 0, action) => {
  switch (action.type) {
    case "CHANGE_JUDGEMENTS_WEIGHT":
      return action.weight
    default:
      return state
  }
}

export const subAccounts = (state = 0, action) => {
  switch (action.type) {
    case "CHANGE_SUB_ACCOUNTS_WEIGHT":
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
  reward_points: rewardPoints,
  reward_staked: rewardStaked,
  active: active,
  own_stake: ownStake,
  judgements: judgements,
  sub_accounts: subAccounts
})

export const leaderboard = combineReducers({
  weights: weights,
  quantity: quantity
})
