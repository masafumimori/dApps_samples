import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import History from './components/History';
import { Navbar } from './components/Navbar';

const App = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/history" element={<History />}></Route>
			</Routes>
		</Router>
	);
};

export default App;
