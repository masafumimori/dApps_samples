type MetamaskEventHandler = {
  (event: 'chainChanged', callback: (chainId: number) => void): void
  (event: 'accountsChanged', callback: (accounts: string[]) => void): void
}
