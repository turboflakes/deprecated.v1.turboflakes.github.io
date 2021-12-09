import { getValidatorRank } from '../actions/validator'

 const middleware = store => next => action => {
  let nextAction = next(action)
  
  if (action.type === "GET_VALIDATOR_SUCCESS" && action.request.endpoint === `/validator/${action.response.result}/rank`) {
    switch (action.response.entities["validator"][action.response.result].status) {
      case "NotReady": {
        // Retry (maximum 10 times)
        const retry = !!action.request.queryParams.r ? Number(action.request.queryParams.r) + 1 : 1
        if (retry > 10) {
          break
        }
        const params = {
          ...action.request.queryParams,
          r: retry,
        }
        const timerId = setTimeout(() => {
          store.dispatch(getValidatorRank(action.response.result,  params))
          clearTimeout(timerId)
        }, 1000)
        break
      }
      case "NotFound": {
        // Retry and search the validator rank without filters (maximum 3 times)
        const retry = !!action.request.queryParams.r ? Number(action.request.queryParams.r) + 1 : 1
        if (retry > 3) {
          break
        }
        const params = {
          q: action.request.queryParams.q,
          w: action.request.queryParams.w,
          r: retry,
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