import {
  normalize
} from 'normalizr'
import serialize from '../utils/serialize'
import { selectors } from '../selectors'

// const API_ROOT = process.env.REACT_APP_API_ENDPOINT ? `https://${process.env.REACT_APP_API_ENDPOINT}` : 'http://localhost:5000

const isContentTypeJson = (value) => {
  value = value ? value : ''
  return !!value.match(/^(application\/json)/g)
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const fetchApi = async (host, method, headers, endpoint, queryParams, body, schema, id) => {

  // let url = (endpoint.indexOf(API_ROOT) === -1) ? `${API_ROOT}/api/v1${endpoint}` : endpoint
  let url = `//${host}/api/v1${endpoint}`

  if (queryParams !== undefined) {
    url = url + `?` + serialize(queryParams)
  }

  let options = {
    method,
    headers: {
      ...headers,
      Accept: 'application/json'
    },
    credentials: 'include'
  }

  if (body) {

    if (isContentTypeJson(headers['Content-Type']) && (method !== 'GET' || method !== 'HEAD')) {
      delete body._didInvalidate
      body = JSON.stringify(body)
    }
    options = {
      ...options,
      body
    }

  }

  try {
    // await response of fetch call
    let response = await fetch(url, options)

    if (!isContentTypeJson(response.headers.get("content-type"))) {
      console.error(`Failed to fetch: Content-Type ${response.headers.get("content-type")} not supported.`);
      return Promise.reject("It seems that something went wrong. Please just wait a few seconds and try again!")
    }

    // NOTE: Resolve Json response
    let data = {}
    
    // only proceed once promise is resolved
    data = await response.json()

    if (!response.ok) {

      return Promise.reject(data)
    }

    if (method === "DELETE") {
      data = {
        ...data,
        _deleted: Date.now()
      }
    }

    if (id) {
      return {
        ...normalize({
          id,
          ...data,
          _didInvalidate: false,
          _received: Date.now()
        }, schema),
        headers: response.headers
      }
    }

    return {
      ...normalize({
        ...data,
        _didInvalidate: false,
        _received: Date.now()
      }, schema),
      headers: response.headers
    }

  } catch (e) {
    if (e instanceof DOMException) {
      // NOTE: fail silenty request deliberately cancelled
      return
    }
    return Promise.reject("It seems that something went wrong. Please just wait a few seconds and try again!")
  }
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'CALL_API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
const apiMiddleware = store => next => action => {

  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const host = selectors.getApiHost(store.getState());

  let {
    endpoint,
    body
  } = callAPI

  const {
    method,
    queryParams,
    schema,
    headers,
    types,
    id
  } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!method) {
    throw new Error('Specify a request method GET|POST|PUT|DELETE.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }
  // if (typeof body !== 'undefined') {
  //   body = denormalize(body, schema, store.getState().entities)
  // }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType] = types

  const request = {
    endpoint,
    method,
    body,
    queryParams,
    schema,
    headers
  }
  next(actionWith({
    type: requestType,
    request
  }))

  return fetchApi(host, method, headers, endpoint, queryParams, body, schema, id)
    .then(response => next(actionWith({
        type: successType,
        response,
        request
      })),
      error => {
        return next(actionWith({
          type: failureType,
          error,
          request
        }))
      })
}

export default apiMiddleware