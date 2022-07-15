import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NearProvider } from './components/Near/Near';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<NearProvider>
			<App />
		</NearProvider>
	</React.StrictMode>
);
