import {combineReducers} from 'redux'

const selectedAccount = (state = {}, action) => {
  switch (action.type) {
    case "CLEAR_STORE":
      return {}
    case "WEB3_SELECT_ACCOUNT":
      return action.account
    default:
      return state
  }
}

const maxNominations = (state = 0, action) => {
  switch (action.type) {
    case "CLEAR_STORE":
      return 0
    case "WEB3_SET_MAX_NOMINATIONS":
      return action.value
    default:
      return state
  }
}

export const web3 = combineReducers({
  selectedAccount,
  maxNominations,
})