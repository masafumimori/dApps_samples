import { AbstractConnector } from '@web3-react/abstract-connector'
import { WalletConnector, WalletType } from '../types/wallets'
import { getMetamaskConnector } from './metaMask'

export const getConnector = (type: WalletType): WalletConnector<AbstractConnector> => {
  switch (type) {
    case 'Metamask':
      return getMetamaskConnector()
    default:
      throw new Error('Not supported wallets.')
  }
}
