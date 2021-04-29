import {
  typesGenerator
} from './generator'
import {
  generalRequest
} from './generalRequest'
import serialize from '../../utils/serialize'


const isExpired = (state, queryParams, schema, after = 30) => {
  const queryKey = serialize(queryParams)
  if (state.collections &&
    state.collections[`${schema.toLowerCase()}`] &&
    state.collections[`${schema.toLowerCase()}`][queryKey] &&
    state.collections[`${schema.toLowerCase()}`][queryKey]._received) {
    return ((Date.now() - state.collections[`${schema.toLowerCase()}`][queryKey]._received) / 1000) > after
  }
  return true
}

export const query = (queryParams, schema, headers, force = false, options = {}) => (dispatch, getState) => {

  const state = getState()
  // the same request can only be made after 30s unless force is true
  if (!force && !isExpired(state, queryParams, schema, options.expire)) {
    return null
  }

  return dispatch(generalRequest('GET', typesGenerator('QUERY', schema), schema, {}, headers, queryParams, options))
}

export const invalidateQuery = (schema) => dispatch => {
  return dispatch({
    type: `INVALIDATE_QUERY_${schema.toUpperCase()}`
  })
}