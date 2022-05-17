import {
	Alert,
	AlertIcon,
	Box,
	Button,
	Center,
	Heading,
	Stack,
	Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
	useMoralis,
	useMoralisWeb3Api,
	useMoralisWeb3ApiCall,
} from 'react-moralis';

import logo from '../../images/avalanche-avax-logo.png';
import { ChainType } from '../utils/types';
import TransactionTable from '../Tables/TransactionTable';

const chain = 'avalanche';

const History = () => {
	const { user, account, Moralis } = useMoralis();
	//----------------- Setting User in state   ----------
	const [chain, setChain] = useState<ChainType | undefined>();
	const [address, setAddress] = useState(account || '');

	const Web3Api = useMoralisWeb3Api();
	//------ Moralis Web3 API methods for Native, ERC20 & NFT  ---------
	const {
		fetch: txFetch,
		data: txData,
		error: txError,
		isLoading: txLoading,
	} = useMoralisWeb3ApiCall(Web3Api.account.getTransactions, {
		chain: chain || 'avalanche',
		address,
	});

	useEffect(() => {
		if (user) {
			txFetch();
		}
		console.log(user, 'HISTORY USER');
	}, [user, address, chain]);

	//if chain is changed let the user know
	Moralis.onChainChanged(async (chain) => {
		setChain(chain as ChainType);
		txFetch();
	});

	Moralis.onAccountChanged(async (chain) => {
		setAddress(chain!);
	});

	if (!user) {
		return (
			<Stack spacing={5} p={10}>
				<Center>
					<img width={500} height={500} src={logo} alt="logo" />
				</Center>

				<Center>
					<Heading as="h2" size="3xl" p={10}>
						Avalanche Wallet Tracker
					</Heading>
				</Center>
				<Heading size={'lg'} textAlign={'center'}>
					Please sign in with Metamask
				</Heading>
			</Stack>
		);
	}

	const refetch = async () => {
		console.log('refetching');

		await txFetch();
	};

	return (
		<Box display={'block'} p={35} className="App">
			<Center>
				<img width={500} height={500} src={logo} alt="logo" />
			</Center>

			<Center>
				<Heading as="h2" size="3xl" p={10}>
					Avalanche Wallet Tracker
				</Heading>
			</Center>

			<Box h={5} />
			{/* -------------Transactions------------ */}
			<Text fontSize="3xl" my={4} fontWeight={'bold'}>
				Transaction History
			</Text>
			<Button
				colorScheme="green"
				variant="outline"
				onClick={refetch}
				disabled={txLoading}
				mb={3}
			>
				Refetch Transactions
			</Button>
			{!txLoading && txData ? (
				<TransactionTable txData={txData.result || []} />
			) : (
				<p>Loading</p>
			)}
		</Box>
	);
};

export default History;
