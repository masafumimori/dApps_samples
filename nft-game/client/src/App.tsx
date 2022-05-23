import { Button, Text, Heading, Stack, Grid } from '@chakra-ui/react';
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
import WithSubnavigation from '../components/Navbar';

const App = () => {
	const { isAuthenticated, user, account, Moralis } = useMoralis();
	const contractProcessor = useWeb3ExecuteFunction();

	const [pets, setPets] = useState<PetType[]>([]);

	const enableWeb3 = async () => {
		await Moralis.enableWeb3();
	};
	const disableWeb3 = async () => {
		await Moralis.deactivateWeb3();
	};

	useEffect(() => {
		if (isAuthenticated) {
			enableWeb3();
		} else {
			setPets([]);
			disableWeb3();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated]);

	const getDetails = async (tokenId: number) => {
		const params: Web3ExecuteFunctionParameters = {
			contractAddress: CONTRACT_ADDRESS,
			functionName: 'getTokenDetails',
			abi,
			params: {
				_tokenId: tokenId,
			},
		};
		await contractProcessor.fetch({
			params,
			onError: (error) => {
				console.error(error);
			},
			onSuccess: (result) => {
				const pet = result as PetType;
				if (pets.length > 0) {
				} else {
					setPets((prev) => [...prev, pet]);
				}
			},
		});
	};

	const getAllTokens = async () => {
		setPets([]);
		const params: Web3ExecuteFunctionParameters = {
			contractAddress: CONTRACT_ADDRESS,
			functionName: 'getAllTokensForUser',
			abi,
			params: {
				user: account,
			},
		};
		await contractProcessor.fetch({
			params,
			onError: (error) => {
				console.error(error);
			},
			onSuccess: (result) => {
				const petIdArray = result as BigNumber[];
				if (petIdArray.length === 0) return;

				petIdArray.forEach(async (petId) => {
					await getDetails(petId.toNumber());
				});
			},
		});
	};

	const feed = async (petId: number) => {
		const params: Web3ExecuteFunctionParameters = {
			contractAddress: CONTRACT_ADDRESS,
			functionName: 'feed',
			abi,
			params: {
				_tokenId: petId,
			},
		};
		await contractProcessor.fetch({
			params,
			onError: (error) => {
				console.error(error);
			},
			onSuccess: async (_) => {
				console.log('success');
			},
		});
	};

	return (
		<Stack spacing={3} p={10}>
			<WithSubnavigation />
			<Heading textAlign={'center'}>Moralis Hello World!</Heading>
			<Stack spacing={5} justifyContent={'center'} alignItems={'center'}>
				{user && (
					<>
						<Button onClick={getAllTokens}>Get ALL</Button>
						<Grid templateColumns="repeat(2, 1fr)" gap={6}>
							{pets.length > 0 &&
								pets.map((pet) => {
									return <Card pet={pet} feed={feed} key={pet.id.toNumber()} />;
								})}
						</Grid>
					</>
				)}
			</Stack>
		</Stack>
	);
};

export default App;
