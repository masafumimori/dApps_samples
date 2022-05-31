import { AbstractConnector } from '@web3-react/abstract-connector'
import { ethers } from 'ethers'
import { EthereumAddress } from './address'
import { ChainId } from './chains'

export type WalletType = 'Metamask'

export type WalletConnector<T extends AbstractConnector = AbstractConnector> = {
  type: WalletType
  connector: T
  onConnect?: () => Promise<void>
  onDisconnect?: VoidFunction
}

export type WalletInterface = {
  error: Error | undefined
  active: boolean
  chainId: number | undefined
  account: EthereumAddress | null | undefined
  library: ethers.providers.Web3Provider | undefined
  signer: ethers.providers.JsonRpcSigner | undefined
  activeWalletType: WalletType | null | undefined
  connect: (type: WalletType) => Promise<void>
  disconnect: () => void
  switchChain?: (chainId: ChainId) => Promise<{ error?: string }>
}
