import { useWeb3React } from '@web3-react/core'
import { BigNumber, ethers } from 'ethers'
import { useCallback, useEffect, useMemo } from 'react'
import {
  requestSwitchChain,
  addListenersOnConnected,
  connectIfAuthorized,
  removeAllListeners,
} from '../utils/metamask'
import useSWRImmutable from 'swr/immutable'
import { getConnector } from '../connectors'
import { WalletInterface, WalletType } from '../types/wallets'
import { CHAIN_ID } from '../constants/chains'
import { ChainId } from '../types/wallets/chains'

export const getChainInfo = (chainId: number) =>
  // @ts-expect-error
  CHIAN_INFO[chainId]

const CHIAN_INFO: Record<ChainId, AddEthereumChainParameter> = {
  [CHAIN_ID.astar]: {
    chainId: `0x${(+BigNumber.from(592)).toString(16)}`,
    chainName: 'Astar Network',
    nativeCurrency: {
      name: 'Astar',
      symbol: 'ASTR',
      decimals: 18,
    },
    rpcUrls: ['https://astar.api.onfinality.io/public'],
    blockExplorerUrls: ['https://blockscout.com/astar'],
  },
}

type ActiveWallet = {
  type: WalletType
  onDisconnect?: VoidFunction
}

const useActiveWallet = () => useSWRImmutable<ActiveWallet | null>('wallet-active')

export const useWallet = (): WalletInterface => {
  const { library, error, account, active, chainId, activate, deactivate } =
    useWeb3React<ethers.providers.Web3Provider>()

  const signer = useMemo(() => library?.getSigner(), [library])
  const { data: activeWallet, mutate: mutateActiveWallet } = useActiveWallet()

  const connect = useCallback(
    async (type: WalletType) => {
      const { connector, onConnect, onDisconnect } = getConnector(type)
      if (onConnect) await onConnect()
      await activate(connector, undefined, true)
      await mutateActiveWallet({ type, onDisconnect })
    },
    [activate]
  )

  const disconnect = useCallback(async () => {
    if (activeWallet?.onDisconnect) activeWallet.onDisconnect()
    deactivate()
    // TODO: need to fix disconnect
    await mutateActiveWallet()
    // await mutateActiveWallet(null)
  }, [activeWallet, deactivate])

  const switchChain = useCallback(
    async (chainId: ChainId) => {
      return requestSwitchChain(chainId, getChainInfo(chainId) as AddEthereumChainParameter)
    },
    [activeWallet]
  )

  useEffect(() => {
    if (library && activeWallet?.type !== 'Metamask') return

    addListenersOnConnected(connect, disconnect)
    return removeAllListeners
  }, [library, activeWallet, connect, disconnect])

  useEffect(() => {
    if (!connect || activeWallet?.type === 'Metamask') return
    connectIfAuthorized(connect)
  }, [connect, activeWallet])

  return {
    error,
    active,
    chainId,
    account: account as WalletInterface['account'],
    library,
    signer,
    activeWalletType: activeWallet?.type,
    connect,
    disconnect,
    switchChain: activeWallet?.type === 'Metamask' ? switchChain : undefined,
  }
}
