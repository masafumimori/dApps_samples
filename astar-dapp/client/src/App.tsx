import { Button, Center, Heading, Stack } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { injected } from './components/Wallet/connectors';
import { useWallet } from './components/Wallet/useWallet';

const App = () => {
	const { account, library, connector, active, error, deactivate, activate } =
		useWeb3React();
	const {
		account: walletAccount,
		connect: walletConnect,
		disconnect,
	} = useWallet();

	const connect = async () => {
		try {
			await activate(injected, (error) => <Heading>{error.message}</Heading>);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		console.log(walletAccount);
	}, [walletAccount]);

	return (
		<Stack
			spacing={10}
			h={'100vh'}
			w={'50vw'}
			mx={'auto'}
			justifyContent={'center'}
		>
			{account ? (
				<>
					<Heading textAlign={'center'} size={'md'}>
						{account}
					</Heading>
					<Button onClick={disconnect}>Disconnect Metamask</Button>
				</>
			) : (
				<>
					<Heading textAlign={'center'}>Not Connected</Heading>
					<Button onClick={() => walletConnect('Metamask')}>
						Connect to MetaMask
					</Button>
				</>
			)}
		</Stack>
	);
};

export default App;
