import { Container, CssBaseline, Stack, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useMoralisWeb3Api, useMoralis } from 'react-moralis';
import { NftType } from '../types';
import NFTCard from './NFTCard';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import { options } from '../App';

const Home = () => {
	const [nfts, setNfts] = useState<NftType[]>([]);
	const Web3Api = useMoralisWeb3Api();
	const { authenticate, logout, user } = useMoralis();

	const fetchNfts = async () => {
		const { result: nftList } = await Web3Api.token.getAllTokenIds(options);

		if (!nftList) {
			alert('No NFT available...');
			return;
		}

		setNfts(nftList);
	};

	useEffect(() => {
		fetchNfts();
	}, [user]);

	return (
		<Container>
			<CssBaseline />
			<h1>Welcome!</h1>
			<Stack marginBottom={10} width={'300px'}>
				{!user ? (
					<Button
						onClick={() => authenticate()}
						variant="outlined"
						endIcon={<LockOpenIcon />}
						size={'small'}
					>
						Login with Metamask
					</Button>
				) : (
					<>
						<p>{user.get('ethAddress')}</p>
						<Button
							onClick={() => logout()}
							variant="outlined"
							endIcon={<LogoutIcon />}
							size={'small'}
						>
							Logout
						</Button>
					</>
				)}
			</Stack>
			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				spacing={{ xs: 3, sm: 5, md: 10 }}
			>
				{nfts.length > 0 &&
					nfts.map((nft) => {
						return <NFTCard key={nft.token_id} {...nft} />;
					})}
			</Stack>
		</Container>
	);
};

export default Home;
