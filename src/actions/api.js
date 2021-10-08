import {
  normalize
} from 'normalizr'
import {
  schemas
} from '../schemas'
import {
  get as _get
} from './async/get'
import {selectors} from '../selectors'
import {getNetworkHost, isNetworkSupported} from '../constants'

export const getApiDetails = (network) => (dispatch, getState)  => {
  const state = getState()
  if (!isNetworkSupported(network) || network === selectors.getApiNetwork(state)) {
    return null
  }
  dispatch(clearStore())
  dispatch(setApiHost(network))
  return dispatch(_get("v1", ["all"], "api", undefined, undefined, {endpoint: "", expire: 0}))
}

const setApiHost = (network) => dispatch => {
  const data = normalize({id: "v1", host: getNetworkHost(network), network}, schemas["API"])
  return dispatch({type: "SET_API_HOST", response: data})
}

const clearStore = () => dispatch => {
  return dispatch({type: "CLEAR_STORE"})
}
