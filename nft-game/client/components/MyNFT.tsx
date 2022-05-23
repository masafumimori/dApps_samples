import { Button, Text, Heading, Stack, Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
	useMoralis,
	useWeb3ExecuteFunction,
	Web3ExecuteFunctionParameters,
} from 'react-moralis';
import MoralisType from 'moralis';
import { CONTRACT_ADDRESS } from '../utils/constants';
import { abi } from '../../build/contracts/Token.json';
import { PetType } from '../utils/types';
import { BigNumber } from 'moralis/node_modules/ethers';
import Card from '../components/Card';

type MyNFTProps = {
	user: MoralisType.User | null;
	account: string | null;
};

const MyNFT = ({ user, account }: MyNFTProps) => {
	const contractProcessor = useWeb3ExecuteFunction();
	const { Moralis } = useMoralis();

	const [pets, setPets] = useState<PetType[]>([]);

	const enableWeb3 = async () => {
		await Moralis.enableWeb3();
	};
	const disableWeb3 = async () => {
		await Moralis.deactivateWeb3();
	};

	useEffect(() => {
		const init = async () => {
			if (!user) {
				await disableWeb3();
				return;
			}
			await enableWeb3();
			await getAllTokens();
		};
		init();
	}, [user, account]);

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

	const transfer = async (address: string, petId: number) => {
		const params: Web3ExecuteFunctionParameters = {
			contractAddress: CONTRACT_ADDRESS,
			functionName: 'transfer',
			abi,
			params: {
				_receiver: address,
				_tokenId: petId,
			},
		};
		await contractProcessor.fetch({
			params,
			onError: (error) => {
				console.error(error);
			},
			onSuccess: async (_) => {
				console.log('transfer success');
				await getAllTokens();
			},
		});
	};

	return (
		<Stack spacing={5} justifyContent={'center'} alignItems={'center'}>
			{user && (
				<>
					<Heading textAlign={'center'}>My NFT</Heading>
					<Grid templateColumns="repeat(2, 1fr)" gap={6}>
						{pets.length > 0 &&
							pets.map((pet) => {
								return (
									<Card
										pet={pet}
										feed={feed}
										transfer={transfer}
										key={pet.id.toNumber()}
									/>
								);
							})}
					</Grid>
				</>
			)}
		</Stack>
	);
};

export default MyNFT;
