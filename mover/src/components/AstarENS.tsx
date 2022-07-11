import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

import { getAstrDomainSDK } from 'astrdomaints-ethers';
import { Address, ConfigType } from 'astrdomaints-ethers/dist/types';

const config: ConfigType = {
	testnet: {
		rpcUrl: undefined,
		contractAddress: undefined,
	},
	mainnet: {
		rpcUrl: 'https://rpc.astar.network:8545',
		contractAddress: '0xA1019535E6b364523949EaF45F4B17521c1cb074',
	},
	defaultNetwork: 'mainnet',
};

const AstarENS = () => {
	const [ens, setEns] = useState('');

	const { account, library } = useWeb3React<ethers.providers.Web3Provider>();

	useEffect(() => {
		if (!account) {
			setEns('');
			return;
		}

		const load = async () => {
			const sdk = await getAstrDomainSDK(config);

			const ens = await sdk.getDomain(account as Address);

			console.log('ens : ', ens);

			setEns(ens ?? '');
		};
		load();
	}, [account]);

	return <h3>{ens || `No Astar ENS detected`}</h3>;
};

export default AstarENS;
