import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import apiMiddleware from '../middlewares/api'
import validatorMiddleware from '../middlewares/validator'
import layoutMiddleware from '../middlewares/layout'

const configureStore = () => {
  return createStore(
    reducer,
    applyMiddleware(thunk, apiMiddleware, validatorMiddleware, layoutMiddleware)
  )
}

export default configureStore
