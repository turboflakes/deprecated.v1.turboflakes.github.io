import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'

export const entities = (state = {}, action) => {
  if (action.response && action.response.entities) {
    // return merge({}, state, action.response.entities)
    return mergeWith({}, state, action.response.entities, (objValue, srcValue, key) => {
      // console.log("objValue", objValue, "srcValue", srcValue, "key", key);
      if (isArray(objValue) && isArray(srcValue)) {
        //console.log('in the if', "objValue", objValue, "srcValue", srcValue);
        return srcValue.slice(0)
      }
      // return the empty object for state to be updated
      if (!isEmpty(objValue) && isEmpty(srcValue)) {
          return srcValue
      }
    })
  }
  if (action.type === "CLEAR_STORE") {
    return {}
  }
  return state
}
