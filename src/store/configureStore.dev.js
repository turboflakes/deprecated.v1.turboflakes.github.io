import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers'
import apiMiddleware from '../middlewares/api'
import validatorMiddleware from '../middlewares/validator'


const configureStore = () => {
  const store = createStore(
    reducer, /* preloadedState, */
    composeWithDevTools(applyMiddleware(thunk, apiMiddleware, validatorMiddleware, createLogger())
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
