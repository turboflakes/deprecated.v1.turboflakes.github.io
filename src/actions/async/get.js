import isEmpty from 'lodash/isEmpty'
import _get from 'lodash/get'
import {
  typesGenerator
} from './generator'
import {
  generalRequest
} from './generalRequest'

const isExpired = (state, id, schema, after = 60) => {
  if (state.entities &&
    state.entities[`${schema.toLowerCase()}`] &&
    state.entities[`${schema.toLowerCase()}`][id] &&
    state.entities[`${schema.toLowerCase()}`][id]._received) {
    return ((Date.now() - state.entities[`${schema.toLowerCase()}`][id]._received) / 1000) > after
  }
  return true
}

export const get = (id, requiredFields = [], schema, headers = {}, queryParams, options = {}) => (dispatch, getState) => {
  const state = getState()

  // The same request can only be made after X seconds - default is 60s
  if (!isExpired(state, id, schema, options.expire)) {
    return null
  }

  const repo = state.entities[`${schema}`] ? state.entities[`${schema}`][id] : {}

  if (repo && requiredFields.every(key => !isEmpty(_get(repo, key)))) {
    return null
  }

  return dispatch(generalRequest('GET', typesGenerator("GET", schema), schema, {
    id
  }, headers, queryParams, options))
}