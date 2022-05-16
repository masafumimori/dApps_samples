import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MoralisProvider } from 'react-moralis';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MoralisProvider
			serverUrl={import.meta.env.VITE_SERVER_URL}
			appId={import.meta.env.VITE_APP_ID}
		>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</MoralisProvider>
	</React.StrictMode>
);
