import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import Home from './components/Home';
import { Navbar } from './components/Navbar';

const App = () => {
	const { isAuthenticated } = useMoralis();

	useEffect(() => {
		if (isAuthenticated) {
			// add your logic here
			console.log('You are logged in');
		} else {
			console.log('You are not logged in');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated]);

	return (
		<div>
			<Navbar />
			<Home />
		</div>
	);
};

export default App;
