import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';

import { ToDoAppProvider } from '../src/context/ToDoAppProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ToDoAppProvider>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</ToDoAppProvider>
	</React.StrictMode>
);
