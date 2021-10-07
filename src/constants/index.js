import iconPolkadotSVG from '../assets/polkadot_icon.svg';
import logoPolkadotSVG from '../assets/polkadot_logotype_white.svg';
import iconKusamaSVG from '../assets/kusama_icon.svg';
import logoKusamaSVG from '../assets/kusama_logo.svg';
import iconWestendSVG from '../assets/westend_icon.svg';
import logoWestendSVG from '../assets/westend_icon.svg'; 

// Define Network settings
const networkSettings = {
  polkadot: {
    endpoint: process.env.REACT_APP_POLKADOT_API_ENDPOINT,
    externalWSS: "wss://rpc.polkadot.io",
    icon: iconPolkadotSVG,
    logo: logoPolkadotSVG,
  },
  kusama: {
    endpoint: process.env.REACT_APP_KUSAMA_API_ENDPOINT,
    externalWSS: "wss://rpc-kusama.polkadot.io",
    icon: iconKusamaSVG,
    logo: logoKusamaSVG,
  },
  westend: {
    endpoint: process.env.REACT_APP_WESTEND_API_ENDPOINT,
    externalWSS: "wss://rpc-westend.polkadot.io",
    icon: iconWestendSVG,
    logo: logoWestendSVG,
  }
}
export const getNetworkHost = (network) => networkSettings[network].endpoint
// Useful to open https://polkadot.js.org/apps/ with the right network
export const getNetworkWSS = (network) => networkSettings[network].externalWSS
export const getNetworkIcon = (network) => networkSettings[network].icon
export const getNetworkLogo = (network) => networkSettings[network].logo
// Useful for the leaderboard tabs selection
export const getNetworkIndex = (network) => Object.keys(networkSettings).findIndex(n => n === network)
export const getNetworkKey = (index) => Object.keys(networkSettings)[index]


export const WEIGHTS = [7,8,6,10,6,4,3,7,5,9]
export const RANGES = ["0:100","0:100","0:100","0:100","0:100","0:100","0:100","0:100","0:100","0:100"]
