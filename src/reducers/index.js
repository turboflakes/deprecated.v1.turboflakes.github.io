import { combineReducers } from 'redux'
import { collection } from './collections'
import { entities } from './entities'
import { fetchers } from './fetchers'
import { leaderboard } from './leaderboard'
import { web3 } from './web3'
import { notifications } from './notifications'

const collections = combineReducers({
  validator: collection("validator"),
})

const reducer = combineReducers({
  entities,
  fetchers,
  collections,
  leaderboard,
  web3,
  notifications,
})

export default reducer
