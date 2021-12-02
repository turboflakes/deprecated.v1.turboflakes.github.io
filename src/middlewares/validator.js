import { getValidatorRank } from '../actions/validator'

 const middleware = store => next => action => {
  let nextAction = next(action)
  
  if (action.type === "GET_VALIDATOR_SUCCESS" && action.request.endpoint === `/validator/${action.response.result}/rank`) {
    switch (action.response.entities["validator"][action.response.result].status) {
      case "NotReady": {
        const timerId = setTimeout(() => {
          store.dispatch(getValidatorRank(action.response.result,  action.request.queryParams))
          clearTimeout(timerId)
        }, 1000)
        break
      }
      case "NotFound": {
        // Try to search the validator rank without filters
        const params = {
          q: action.request.queryParams.q,
          w: action.request.queryParams.w
        }
        const timerId = setTimeout(() => {
          store.dispatch(getValidatorRank(action.response.result,  params))
          clearTimeout(timerId)
        }, 500)
        break
      }
      
      default: {
          return nextAction
      }
    }
  }
  return nextAction
}

export default middleware