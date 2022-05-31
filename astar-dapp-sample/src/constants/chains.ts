import { BigNumber } from 'ethers'
import { ChainId } from '@/types/wallets/chains'

export const CHAIN_ID = {
  eth: 1,
  astar: 592,
  local: 1337,
} as const

export const CHIAN_INFO: Record<ChainId, AddEthereumChainParameter> = {
  [CHAIN_ID.eth]: {
    chainId: `0x${(+BigNumber.from(CHAIN_ID.eth)).toString(16)}`,
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  [CHAIN_ID.astar]: {
    chainId: `0x${(+BigNumber.from(CHAIN_ID.astar)).toString(16)}`,
    chainName: 'Astar Network',
    nativeCurrency: {
      name: 'Astar',
      symbol: 'ASTR',
      decimals: 18,
    },
    rpcUrls: ['https://astar.api.onfinality.io/public'],
    blockExplorerUrls: ['https://blockscout.com/astar'],
  },
  [CHAIN_ID.local]: {
    chainId: `0x${(+BigNumber.from(CHAIN_ID.local)).toString(16)}`,
    chainName: 'Local Network',
    nativeCurrency: {
      name: 'Local',
      symbol: 'LOCAL',
      decimals: 18,
    },
    rpcUrls: ['http://localhost:8545'],
    blockExplorerUrls: [''],
  },
}
