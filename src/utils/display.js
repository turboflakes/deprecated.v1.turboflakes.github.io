import { NETWORK, networkPrefixes, networkDecimals, networkCodes } from '../constants'
import { encodeAddress } from '@polkadot/util-crypto'

export const stashDisplay = (stash) => {
    return !!stash ? `${stash.slice(0, 6)}...${stash.slice(stash.length-6, stash.length)}` : `-`
}
  
export const nameDisplay = (name, len) => {
    if (!len) {
        len = 24
    }
    return name.length > len ? `${name.slice(0, len)}...` : name
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
    return `${Math.round((commission/10000000)*100)/100}%`
}

export const rateDisplay = (rate) => {
    return `${Math.round(rate*100)}%`
}