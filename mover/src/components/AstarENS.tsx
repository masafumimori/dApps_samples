import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

import domainjs from 'astrdomainjs-ethers';

const config = {
	testnet: {
		rpcUrl: 'https://evm.shibuya.astar.network',
		contractAddress: '',
	},
	mainnet: {
		rpcUrl: 'https://rpc.astar.network:8545',
		contractAddress: '0xA1019535E6b364523949EaF45F4B17521c1cb074',
	},
	defaultNetwork: 'mainnet',
};

const sdk = domainjs.SDK(config);

const AstarENS = () => {
	const [ens, setEns] = useState('');

	const { account, library } = useWeb3React<ethers.providers.Web3Provider>();

	useEffect(() => {
		if (!account) {
			setEns('');
			return;
		}

		const load = async () => {
			const ens = await sdk.getDomain(account);

			console.log('ens : ', ens);

			setEns(ens ?? '');
		};
		load();
	}, [account]);

	return <h3>{ens || `No Astar ENS detected`}</h3>;
};

export default AstarENS;
