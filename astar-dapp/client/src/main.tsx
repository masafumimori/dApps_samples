import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
	const library = new ethers.providers.Web3Provider(
		provider,
		typeof provider.chainId === 'number'
			? provider.chainId
			: typeof provider.chainId === 'string'
			? parseInt(provider.chainId)
			: 'any'
	);
	return library;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Web3ReactProvider getLibrary={getLibrary}>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</Web3ReactProvider>
	</React.StrictMode>
);
