import { useEffect, useState } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Container, Stack } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import { NftType, NftWithOwnerType, TokenIdTypes } from './types';
import axios from 'axios';
import NFTCard from './components/NFTCard';

export const CONTRACT_ADDRESS = '0x07f4f669097d547bc708486c445288871f3cc78a';
const MORALIS_SERVER_BASE_URL = import.meta.env.VITE_MORALIS_SERVER_BASE_URL;
const MORALIS_APP_ID = import.meta.env.VITE_MORALIS_APP_ID;

const options = {
	address: CONTRACT_ADDRESS,
	chain: 'rinkeby' as const,
};

const App = () => {
	const [nfts, setNfts] = useState<NftType[]>([]);
	const Web3Api = useMoralisWeb3Api();
	const { authenticate, logout, user } = useMoralis();

	// dont need this to fetch meta data as it is already included in result
	// const fetchNFTMetadata = async (NFTs: TokenIdTypes) => {
	// 	const { result } = NFTs;
	// 	if (!result) return;

	// 	for (let i = 0; i < result.length; i++) {
	// 		const nft = result[i];

	// 		const nftId = nft.token_id;
	// 		await axios
	// 			.get(
	// 				`${MORALIS_SERVER_BASE_URL}:2053/server/functions/getNFT?_ApplicationId=${MORALIS_APP_ID}&nftId=${nftId}`
	// 			)
	// 			.then((res) => {
	// 				const { data } = res;
	// 				const { result: tokenResult } = data;
	// 				nft.metadata = tokenResult;
	// 			})
	// 			.catch((error) => console.error(error));
	// 	}
	// };

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

export default App;
