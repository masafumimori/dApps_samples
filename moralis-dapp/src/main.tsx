import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MoralisProvider } from 'react-moralis';
import { ChakraProvider } from '@chakra-ui/react';

const moralisServerURL = import.meta.env.VITE_SERVER_URL;
const moralisAppId = import.meta.env.VITE_APP_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider>
			<MoralisProvider serverUrl={moralisServerURL} appId={moralisAppId}>
				<App />
			</MoralisProvider>
		</ChakraProvider>
	</React.StrictMode>
);
