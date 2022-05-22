import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
	useMoralis,
	useWeb3ExecuteFunction,
	Web3ExecuteFunctionParameters,
} from 'react-moralis';
import { CONTRACT_ADDRESS } from '../utils/constants';
import { abi } from '../contracts/Token.json';
import { PetType } from '../utils/types';
import { BigNumber } from 'moralis/node_modules/ethers';
import Card from '../components/Card';

const App = () => {
	const {
		authenticate,
		isAuthenticated,
		isAuthenticating,
		user,
		account,
		logout,
		Moralis,
	} = useMoralis();
	const contractProcessor = useWeb3ExecuteFunction();

	const [pet, setPet] = useState<PetType>();

	useEffect(() => {
		if (isAuthenticated) {
			// add your logic here
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated]);

	const login = async () => {
		if (!isAuthenticated) {
			await authenticate({ signingMessage: 'Log in using Moralis' })
				.then((user) => {
					console.log('logged in user:', user);
					console.log(user!.get('ethAddress'));
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const logOut = async () => {
		await logout();
		console.log('logged out');
	};

	const getDetails = async () => {
		await Moralis.enableWeb3();
		const params: Web3ExecuteFunctionParameters = {
			contractAddress: CONTRACT_ADDRESS,
			functionName: 'getTokenDetails',
			abi,
			params: {
				_tokenId: 0,
			},
		};
		await contractProcessor.fetch({
			params,
			onError: (error) => {
				console.error(error);
			},
			onSuccess: (result) => {
				const pet = result as PetType;
				setPet(pet);
				console.log(pet.damage);
				console.log(pet.lastMeal);
				console.log(pet.endurance);
				console.log(pet.magic);
			},
		});
	};

	return (
		<Stack spacing={3} p={10}>
			<Heading textAlign={'center'}>Moralis Hello World!</Heading>
			{!user ? (
				<Button onClick={login} isLoading={isAuthenticating}>
					Moralis Metamask Login
				</Button>
			) : (
				<Button
					colorScheme={'gray'}
					onClick={logOut}
					isLoading={isAuthenticating}
				>
					Logout
				</Button>
			)}
			<Button onClick={getDetails}>Get detail</Button>
			{user && <>{/* <img src="../images/DEFY_mask.png" alt="" /> */}</>}
			{pet && (
				<Card
					id={user?.get('ethAddress')}
					endurance={'endurance'}
					damage={pet.damage}
					lastMeal={'last meal'}
					magic={pet.magic}
				></Card>
			)}
		</Stack>
	);
};

export default App;
