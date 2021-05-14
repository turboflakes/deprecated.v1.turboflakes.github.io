import merge from 'lodash/merge'
import zipObject from 'lodash/zipObject'
import serialize from '../utils/serialize'

export const collection = (entity) => {
  if (!entity) {
    console.error("entity not defined!")
    return
  }
  const collectionReducer = (state = {}, action) => {
    switch (action.type) {
      case `QUERY_${entity.toUpperCase()}_SUCCESS`: {
        const key = serialize(action.request.queryParams)
        const other = zipObject([key], [action.response.result])
        return merge({}, state, other, {"last":key})
      }
      case `INVALIDATE_QUERY_${entity.toUpperCase()}`:{
        return Object.assign({}, state, {"last":""})
      }
      case `POST_${entity.toUpperCase()}_SUCCESS`: {
        if (state[`${state.last}`]){
          if (state[`${state.last}`][`${entity}s`]) {
            const current = state[state.last][`${entity}s`]
            return {
              ...state,
              [`${state.last}`]: {
                [`${entity}s`] : [...current, action.response.result]
              }
            }
          }
        }
        return state
      }
      default:
        return state
    }
  }
  return collectionReducer
}
