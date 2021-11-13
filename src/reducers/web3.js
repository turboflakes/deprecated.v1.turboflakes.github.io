import {combineReducers} from 'redux'

const address = (state = "", action) => {
  switch (action.type) {
    case "WEB3_SELECT_ACCOUNT":
      return action.account.address
    default:
      return state
  }
}

const name = (state = "", action) => {
  switch (action.type) {
    case "WEB3_SELECT_ACCOUNT":
      return action.account.meta.name
    default:
      return state
  }
}

export const web3 = combineReducers({
  address,
  name,
})