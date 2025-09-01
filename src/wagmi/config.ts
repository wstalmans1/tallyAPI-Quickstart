import { createConfig, http } from 'wagmi'
import { sepolia, polygon } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
  appName: 'Tally API Quickstart',
  projectId: '86598f4c6a0ab87d412ae9f722a3c07d', // You'll need to get this from WalletConnect Cloud
  chains: [sepolia, polygon],
  transports: {
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
})
