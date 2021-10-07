import {
  get as _get
} from './async/get'
import getHost from '../hosts'

export const setHost = (network) => ({
  type: 'SET_HOST',
  host: getHost(network)
})

export const info = () => {
  return _get('_', ["all"], 'api', undefined, undefined, {endpoint: ""})
}

