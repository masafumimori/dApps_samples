import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Web3ReactProvider } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { ethers } from 'ethers'

// Set for customise your theme if needed
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}
const theme = extendTheme({ colors })

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 12000

  return library
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Web3ReactProvider>
  </React.StrictMode>
)
