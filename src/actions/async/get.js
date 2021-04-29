import isEmpty from 'lodash/isEmpty'
import _get from 'lodash/get'
import {
  typesGenerator
} from './generator'
import {
  generalRequest
} from './generalRequest'

export const get = (id, requiredFields = [], schema, headers = {}, queryParams, options = {}) => (dispatch, getState) => {
  const state = getState()

  const repo = state.entities[`${schema}`] ? state.entities[`${schema}`][id] : {}

  if (repo && requiredFields.every(key => !isEmpty(_get(repo, key)))) {
    return null
  }

  return dispatch(generalRequest('GET', typesGenerator("GET", schema), schema, {
    id
  }, headers, queryParams, options))
}