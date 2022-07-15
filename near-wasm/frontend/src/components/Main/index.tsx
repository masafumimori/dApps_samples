import { useEffect, useState } from 'react';
import useNear from '../Near/Near';

const Main = () => {
	const { accountId, walletConnection, get_num, increment, decrement } =
		useNear();
	const [count, setCount] = useState(0);
	console.log('walletConnection : ', walletConnection);

	const login = async () => {
		await walletConnection?.requestSignIn();
	};
	const logout = async () => {
		await walletConnection?.signOut();
		window.location.replace(window.location.origin + window.location.pathname);
	};

	useEffect(() => {
		const load = async () => {
			const num = await get_num();
			console.log('num : ', num);

			setCount(num);
		};
		load();
	}, []);

	const plus = async () => {
		// debugger;
		await increment();
	};

	return (
		<div>
			{accountId ? (
				<>
					<h3>Count: {count}</h3>
					<div>
						<button onClick={decrement}>-</button>
						<button onClick={plus}>+</button>
					</div>
					<button onClick={logout}>Logout</button>
				</>
			) : (
				<button onClick={login}>Login</button>
			)}
			<p>ACCOUNT : {accountId || 'NOT DEFINED'}</p>
		</div>
	);
};

export default Main;
