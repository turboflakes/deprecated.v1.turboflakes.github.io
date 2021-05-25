import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import apiMiddleware from '../middlewares/api'
import validatorMiddleware from '../middlewares/validator'

const configureStore = () => {
  return createStore(
    reducer,
    applyMiddleware(thunk, apiMiddleware, validatorMiddleware)
  )
}

export default configureStore
