import React, { useEffect } from 'react';
import {
	Flex,
	Stack,
	Heading,
	Text,
	Input,
	Button,
	useColorModeValue,
	Image,
} from '@chakra-ui/react';
import {
	useMoralis,
	useWeb3ExecuteFunction,
	Web3ExecuteFunctionParameters,
} from 'react-moralis';
import MoralisType from 'moralis';

import { CONTRACT_ADDRESS } from '../utils/constants';
import { abi } from '../../build/contracts/Token.json';
import { getRandomNumber } from '../utils/helpers';

type CreateNFTProps = {
	user: MoralisType.User | null;
};

const CreateNFT = ({ user }: CreateNFTProps) => {
	const { Moralis } = useMoralis();
	const contractProcessor = useWeb3ExecuteFunction();

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
		};
		init();
	}, [user]);

	const mint = async () => {
		const _damage = getRandomNumber(255); // uint8
		const _magic = getRandomNumber(255); // uint8
		const _endurance = getRandomNumber(100000); // uint256

		const params: Web3ExecuteFunctionParameters = {
			contractAddress: CONTRACT_ADDRESS,
			functionName: 'mint',
			abi,
			params: {
				_damage,
				_magic,
				_endurance,
			},
		};
		await contractProcessor.fetch({
			params,
			onError: (error) => {
				console.error(error);
			},
			onSuccess: async (_) => {
				console.log('mint Success!');
			},
		});
	};

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			py={12}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			{user ? (
				<Stack
					boxShadow={'2xl'}
					bg={useColorModeValue('white', 'gray.700')}
					rounded={'xl'}
					p={10}
					spacing={8}
					align={'center'}
				>
					<Image src="../images/DEFY_mask.png" w={24} h={24} />
					<Stack align={'center'} spacing={2}>
						<Heading
							textTransform={'uppercase'}
							fontSize={'3xl'}
							color={useColorModeValue('gray.800', 'gray.200')}
						>
							Mint your adorable pet!
						</Heading>
						<Text fontSize={'lg'} color={'gray.500'}>
							You can mint by clicking "Mint" button below!
						</Text>
					</Stack>
					<Stack
						spacing={4}
						direction={{ base: 'column', md: 'row' }}
						w={'full'}
					>
						<Button
							bg={'blue.400'}
							rounded={'full'}
							color={'white'}
							flex={'1 0 auto'}
							_hover={{ bg: 'blue.500' }}
							_focus={{ bg: 'blue.500' }}
							onClick={mint}
						>
							Mint
						</Button>
					</Stack>
				</Stack>
			) : (
				<Stack spacing={5}>
					<Heading>Oops...!</Heading>
					<Text>Please Sign in with MetaMask</Text>
				</Stack>
			)}
		</Flex>
	);
};

export default CreateNFT;
