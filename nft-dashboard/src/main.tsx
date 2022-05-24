import React from 'react';
import ReactDOM from 'react-dom/client';
import { MoralisProvider } from 'react-moralis';
import App from './App';

const MORALIS_SERVER_URL = import.meta.env.VITE_MORALIS_SERVER_URL;
const MORALIS_APP_ID = import.meta.env.VITE_MORALIS_APP_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MoralisProvider serverUrl={MORALIS_SERVER_URL} appId={MORALIS_APP_ID}>
			<App />
		</MoralisProvider>
	</React.StrictMode>
);
