import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React from 'react';
import './App.css';
import SolanaProvider from './context/SolanaContext';

const App = () => {
	return (
		<SolanaProvider>
			<div>Hello world</div>
			<WalletMultiButton></WalletMultiButton>
		</SolanaProvider>
	);
};

export default App;
