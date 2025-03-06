import { createPublicClient } from 'viem';
import { http, createConfig } from 'wagmi'
import { base, baseSepolia, mainnet, sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
})

export const viemClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});