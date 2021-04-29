import {combineReducers} from 'redux'
import serialize from '../utils/serialize'

// TODO: wrap this reducer to get a list of entities eg ["user", "bike", ..]
const idFetcher = (state = {}, action) => {
  const sufix = action.type.substr(action.type.length - 7, 7)
  const prefix = action.type.substr(0, action.type.indexOf("_"))
  const schema = action.request ? (!!action.request.schema ? (action.request.schema.key ? action.request.schema.key : "") : "") : ""
  const endpoint = action.request ? (!!action.request.endpoint ? action.request.endpoint : "") : ""
  const match = schema.match(`(^validator)`)
  
  if (match) {
    const id = endpoint
    const key = `${prefix.toLowerCase()}/${endpoint}`
    
    switch (`${prefix}_${sufix}`) {
      case "POST_REQUEST":
      case "GET_REQUEST":
      case "PUT_REQUEST":
      case "DELETE_REQUEST":
        return {
          ...state,
          [id]: 1,
          [key]: (state[key] ? state[key] : 0) + 1
        }
      case "POST_SUCCESS":
      case "GET_SUCCESS":
      case "PUT_SUCCESS":
      case "DELETE_SUCCESS":
      case "POST_FAILURE":
      case "GET_FAILURE":
      case "PUT_FAILURE":
      case "DELETE_FAILURE":
        return {
          ...state,
          [id]: 0,
          [key]: (state[key] ? state[key] : 0) - 1
        }
      default:
        return state
    }
  }
  return state
}

// TODO: wrap this reducer to get a list of entities eg ["user", "bike", ..]
const schemaFetcher = (state = {}, action) => {
  const entity = action.type.substring(action.type.indexOf("_") + 1, action.type.lastIndexOf("_"))
  const sufix = action.type.substr(action.type.length - 7, 7)
  if (entity.match(`(VALIDATOR)$`)) {
    switch (sufix) {
      case "REQUEST":
        return {
          ...state,
          [entity]: (state[entity] ? state[entity] : 0) + 1
        }
      case "SUCCESS":
      case "FAILURE":
        return {
          ...state,
          [entity]: (state[entity] ? state[entity] : 0) - 1,
        }
      default:
        return state
    }
  }
  return state
}

const queryFetcher = (state = {}, action) => {
  const entity = action.type.substring(action.type.indexOf("_") + 1, action.type.lastIndexOf("_"))
  const sufix = action.type.substr(action.type.length - 7, 7)
  const prefix = action.type.substr(0, action.type.indexOf("_")+1)
  const params = action.request ? (!!action.request.queryParams ? serialize(action.request.queryParams) : "") : ""
  if (entity.match(`(VALIDATOR)$`)) {
    const key = `${entity.toLowerCase()}?${params}`
    switch (prefix.concat(sufix)) {
      case "QUERY_REQUEST":
        return {
          ...state,
          [key]: (state[key] ? state[key] : 0) + 1
        }
      case "QUERY_SUCCESS":
      case "QUERY_FAILURE":
        return {
          ...state,
          [key]: (state[key] ? state[key] : 0) - 1,
        }
      default:
        return state
    }
  }
  return state
}

const asyncFetcher = (state = 0, action) => {
  const sufix = action.type.substr(action.type.length - 7, 7)
  switch (sufix) {
    case "REQUEST":
      return state + 1
    case "SUCCESS":
    case "FAILURE":
      return state === 0 ? 0 : state - 1
    default:
      return state
  }
}

export const fetchers = combineReducers({
  async: asyncFetcher,
  schemas: schemaFetcher,
  ids: idFetcher,
  queries: queryFetcher,
})
