import { NETWORK, networkPrefixes, networkDecimals, networkCodes } from '../constants'
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

export const stakeDisplay = (stake) => {
    if (NETWORK in networkDecimals && NETWORK in networkCodes) {
      return `${(stake/networkDecimals[NETWORK]).toFixed(4)} ${networkCodes[NETWORK]}`
    }
    return stake
}

export const commissionDisplay = (commission) => {
    return `${(commission/10000000).toFixed(2)}%`
}

export const rateDisplay = (rate) => {
    return `${(rate*100).toFixed(2)}%`
}