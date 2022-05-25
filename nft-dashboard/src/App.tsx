import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Mint from './components/Mint';

export const CONTRACT_ADDRESS = '0x07f4f669097d547bc708486c445288871f3cc78a';
const MORALIS_SERVER_BASE_URL = import.meta.env.VITE_MORALIS_SERVER_BASE_URL;
const MORALIS_APP_ID = import.meta.env.VITE_MORALIS_APP_ID;

export const options = {
	address: CONTRACT_ADDRESS,
	chain: 'rinkeby' as const,
};

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/mint" element={<Mint />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
