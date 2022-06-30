import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import Home from './components/Home';

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

function App() {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<div style={{ padding: '40px 50px' }}>
				<Home />
			</div>
		</Web3ReactProvider>
	);
}

export default App;
