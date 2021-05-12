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
export const get = (id, queryParams) => {
  console.log("__", id, queryParams);
  return _get(id, ["all"], 'validator', undefined, queryParams)
}

// GET /validator/:id/eras
export const getValidatorEras = (id) => {
  return _get(id, ["all"], 'validator', undefined, undefined, {endpoint: `validator/${id}/eras`})
}