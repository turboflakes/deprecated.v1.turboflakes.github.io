import {
  get as _get
} from './async/get'

export const info = () => {
  return _get('_', ["all"], 'api', undefined, undefined, {endpoint: ""})
}