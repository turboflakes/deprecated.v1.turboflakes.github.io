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

