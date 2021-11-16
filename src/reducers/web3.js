import {combineReducers} from 'redux'

const account = (state = {}, action) => {
  switch (action.type) {
    case "WEB3_SELECT_ACCOUNT":
      return action.account
    default:
      return state
  }
}

export const web3 = combineReducers({
  selectedAccount: account
})