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

// GET /validator/:id/rank
export const getValidatorRank = (id, queryParams) => {
  return _get(id, ["all"], 'validator', undefined, queryParams, {endpoint: `/validator/${id}/rank`, expire: 0})
}

// GET /validator/:id/eras
export const getValidatorEras = (id) => {
  return _get(id, ["all"], 'validator', undefined, undefined, {endpoint: `/validator/${id}/eras`})
}