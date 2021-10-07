
const hosts = {
    polkadot: "polkadot-api.turboflakes.com",
    kusama: "kusama-api.turboflakes.com",
    westend: "westend-api.turboflakes.com"
}

const getHost = (network) => hosts[network]

export default getHost
