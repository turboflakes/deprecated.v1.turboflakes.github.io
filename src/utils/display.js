import { NETWORK, networkPrefixes } from '../constants'
import { encodeAddress } from '@polkadot/util-crypto'

export const stashDisplay = (stash) => {
    return `${stash.slice(0, 6)}...${stash.slice(stash.length-6, stash.length)}`
}
  
export const nameDisplay = (name) => {
    return name.length > 24 ? `${name.slice(0, 24)}...` : name
}
  
export const networkDisplay = (stash) => {
    if (NETWORK in networkPrefixes) {
      return encodeAddress(stash, networkPrefixes[NETWORK])
    }
    return stash
}
