import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

const ENS = () => {
	const [ens, setEns] = useState('');

	const { account, library } = useWeb3React<ethers.providers.Web3Provider>();

	useEffect(() => {
		if (!account) {
			setEns('');
			return;
		}

		const load = async () => {
			if (!library) {
				return;
			}
			const ens = await library.lookupAddress(account);

			setEns(ens ?? '');
		};
		load();
	}, [account]);

	return <h3>{ens || `No ENS detected`}</h3>;
};

export default ENS;
