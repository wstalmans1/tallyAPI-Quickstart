import { createConfig, http } from 'wagmi'
import { sepolia, polygon } from 'wagmi/chains'

export const config = createConfig({
  chains: [sepolia, polygon],
  transports: {
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
})
