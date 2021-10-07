
const hosts = {
  polkadot: "localhost:5002",
  kusama: "localhost:5001",
  westend: "localhost:5000"
}

const getHost = (network) => hosts[network]

export default getHost
