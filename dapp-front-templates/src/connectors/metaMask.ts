import { WalletConnector } from '../types/wallets'
import { InjectedConnector } from '@web3-react/injected-connector'

// TODO: Add other supported chains accordingly (ETH and ASTR and local now)
const connector = new InjectedConnector({ supportedChainIds: [1, 592, 1337] })

const onConnect = async () => {
  const { ethereum } = window
  if (!(ethereum && ethereum.isMetaMask)) return Promise.reject('Please allow access to MetaMask.')
  await ethereum.request({ method: 'eth_requestAccounts' })
}

export const getMetamaskConnector = (): WalletConnector<InjectedConnector> => {
  return {
    type: 'Metamask',
    connector,
    onConnect,
  }
}
