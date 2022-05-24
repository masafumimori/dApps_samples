import { useState } from 'react';
import { useMoralis } from 'react-moralis';

const App = () => {
	const { authenticate, isAuthenticated, user } = useMoralis();

	if (!isAuthenticated) {
		return (
			<div>
				<button onClick={() => authenticate()}>Authenticate</button>
			</div>
		);
	}

	return (
		<div>
			<h1>Welcome {user?.get('username')}</h1>
		</div>
	);
};

export default App;
