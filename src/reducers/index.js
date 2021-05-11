import { combineReducers } from 'redux'
import { collection } from './collections'
import { entities } from './entities'
import { fetchers } from './fetchers'
import { errors } from './errors'

const collections = combineReducers({
  validator: collection("validator"),
})

const reducer = combineReducers({
  entities,
  fetchers,
  collections,
  errors,
})

export default reducer
