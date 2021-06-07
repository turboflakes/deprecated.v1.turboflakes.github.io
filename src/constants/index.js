export const NETWORK = !!process.env.REACT_APP_NETWORK ? process.env.REACT_APP_NETWORK : 'westend'

export const networkPrefixes = {
  "polkadot": 0,
  "kusama": 2
}

export const networkCodes = {
  "polkadot": "DOT",
  "kusama": "KSM",
  "westend": "WND"
}

export const networkWSS = {
  "polkadot": "wss://rpc.polkadot.io",
  "kusama": "wss://kusama-rpc.polkadot.io",
  "westend": "wss://westend-rpc.polkadot.io"
}

export const networkDecimals = {
  "polkadot": 10000000000,
  "kusama": 1000000000000,
  "westend": 1000000000000,
}

export const WEIGHTS = [7,8,6,10,6,4,3,7,5,9]
export const RANGES = ["0:100","0:100","0:100","0:100","0:100","0:100","0:100","0:100","0:100","0:100"]
