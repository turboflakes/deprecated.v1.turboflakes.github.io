import {
  get as _get
} from './async/get'
import {
  query as _query
} from './async/query'


// GET /validator
export const query = (queryParams) => {
  return _query(queryParams, 'validator')
}

// GET /validator/:id
export const get = (id) => {
  return _get(id, ["all"], 'validator')
}