import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import apiMiddleware from '../middlewares/api'

const configureStore = () => {
  return createStore(
    reducer,
    applyMiddleware(thunk, apiMiddleware)
  )
}

export default configureStore
