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
import NFTBalanceTable from '../Tables/NFTBalanceTable';
import TokenBalanceTable from '../Tables/TokenBalanceTable';

import logo from '../../images/avalanche-avax-logo.png';
import Moralis from 'moralis/types';

type HomeProps = {
	isOnAvax: boolean;
	isLoading: boolean;
};

const chain = 'avalanche';

const Home = () => {
	const { user, Moralis } = useMoralis();
	//----------------- Setting User in state   ----------
	const [userState, setUserState] = useState<Moralis.User | null>(null);
	const [isOnAvax, setIsOnAvax] = useState(true);
	const [address, setAddress] = useState(user?.get('ethAddress'));

	const Web3Api = useMoralisWeb3Api();
	//------ Moralis Web3 API methods for Native, ERC20 & NFT  ---------
	const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
		Web3Api.account.getNativeBalance,
		{
			chain: chain,
			address: user?.get('ethAddress'),
		}
	);
	const {
		fetch: tokenFetch,
		data: tokenData,
		error: tokenError,
		isLoading: tokenIsLoading,
	} = useMoralisWeb3ApiCall(Web3Api.account.getTokenBalances, {
		chain,
		address,
	});

	const {
		fetch: nftFetch,
		data: nftData,
		error: nftError,
		isLoading: nftLoading,
	} = useMoralisWeb3ApiCall(Web3Api.account.getNFTs, {
		chain,
		address,
	});

	useEffect(() => {
		console.log('user or address changed');

		if (user) {
			setUserState(user);
			fetch();
			tokenFetch();
			nftFetch();
		}
		console.log(user, 'USER');
	}, [user, address]);

	//if chain is changed let the user know
	Moralis.onChainChanged(async (chain) => {
		if (chain === '0xa86a') {
			setIsOnAvax(true);
		} else {
			setIsOnAvax(false);
		}
	});

	Moralis.onAccountChanged(async (chain) => {
		setAddress(chain);
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

	return (
		<Box display={'block'} p={35} className="App">
			{!isOnAvax && (
				<Alert status="error">
					<AlertIcon />
					Please switch to Avalanche Network
				</Alert>
			)}
			<Center>
				<img width={500} height={500} src={logo} alt="logo" />
			</Center>

			<Center>
				<Heading as="h2" size="3xl" p={10}>
					Avalanche Wallet Tracker
				</Heading>
			</Center>
			{/* ------  Native Balance -------- */}
			{!isLoading && data !== null ? (
				<Stack direction={['column', 'row']} spacing="24px">
					<Text
						fontSize="2xl"
						style={{
							padding: '10px',
							textAlign: 'initial',
							fontWeight: 'bold',
						}}
					>
						AVAX Balance : {Number(data.balance) / Number('1e' + 18)}
					</Text>
					<Button
						style={{ display: 'block' }}
						colorScheme="green"
						variant="outline"
						onClick={() => fetch()}
						disabled={isLoading}
					>
						Refetch Native balance
					</Button>
				</Stack>
			) : (
				<p>Loading</p>
			)}

			{/* -------------Tokens------------ */}
			<Text fontSize="3xl" my={4} fontWeight={'bold'}>
				Wallet Tokens
			</Text>
			<Button
				colorScheme="green"
				variant="outline"
				onClick={() => tokenFetch()}
				disabled={tokenIsLoading}
				mb={3}
			>
				Refetch Tokens
			</Button>
			{!tokenIsLoading && tokenData !== null ? (
				<TokenBalanceTable tokenData={tokenData} />
			) : (
				<p>Loading</p>
			)}
			<Box h={5} />
			{/* -------------NFTs------------ */}
			<Text fontSize="3xl" my={4} fontWeight={'bold'}>
				Wallet NFTs
			</Text>
			<Button
				colorScheme="green"
				variant="outline"
				onClick={() => nftFetch()}
				disabled={nftLoading}
				mb={3}
			>
				Refetch NFTs
			</Button>
			{!nftLoading && nftData !== null ? (
				<NFTBalanceTable NFTData={nftData.result || []} />
			) : (
				<p>Loading</p>
			)}
		</Box>
	);
};

export default Home;
