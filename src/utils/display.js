
export const stashDisplay = (stash) => {
    return !!stash ? `${stash.slice(0, 6)}...${stash.slice(stash.length-6, stash.length)}` : `-`
}
  
export const nameDisplay = (name, len) => {
    if (!len) {
        len = 24
    }
    return name.length > len ? `${name.slice(0, len)}...` : name
}

export const stakeDisplay = (stake, network) => {
    if (!!network.token_decimals && !!network.token_symbol) {
        const networkDecimals = Math.pow(10, network.token_decimals)
        return `${(stake/networkDecimals).toFixed(2)} ${network.token_symbol}`
    }
    return stake
}

export const stakeDisplayNoSymbol = (stake, network) => {
    if (!!network.token_decimals) {
        const networkDecimals = Math.pow(10, network.token_decimals)
        return `${(stake/networkDecimals).toFixed(2)}`
    }
    return stake
}

export const commissionDisplay = (commission) => {
    return `${Math.round((commission/10000000)*100)/100}%`
}

export const rateDisplay = (rate) => {
    return `${Math.round(rate*100)}%`
}