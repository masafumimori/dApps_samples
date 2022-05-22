import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MoralisProvider } from 'react-moralis';
import { ChakraProvider } from '@chakra-ui/react';

const MORALIS_SEVER_URL = import.meta.env.VITE_MORALIS_SERVER_URL;
const MORALIS_APP_ID = import.meta.env.VITE_MORALIS_APP_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider>
			<MoralisProvider serverUrl={MORALIS_SEVER_URL} appId={MORALIS_APP_ID}>
				<App />
			</MoralisProvider>
		</ChakraProvider>
	</React.StrictMode>
);
