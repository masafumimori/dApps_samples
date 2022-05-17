import { Modal, Button } from '@chakra-ui/react';
import { useMoralis } from 'react-moralis';

const Account = () => {
	const { authenticate, isAuthenticated, isAuthenticating, user, logout } =
		useMoralis();

	const login = async () => {
		try {
			await authenticate();
		} catch (error) {
			console.error(error);
		}
	};

	const logOut = async () => {
		await logout();
	};

	if (!isAuthenticated || !user) {
		return (
			<Button
				onClick={login}
				colorScheme={'orange'}
				isLoading={isAuthenticating}
			>
				Connect Wallet
			</Button>
		);
	}

	return (
		<>
			<Button colorScheme={'gray'} onClick={logOut}>
				Disconnect Wallet
			</Button>
		</>
	);
};

export default Account;
