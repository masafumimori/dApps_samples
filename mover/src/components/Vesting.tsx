import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import React, { useMemo, useState } from 'react';
import { abi as VestingABI } from '../../artifacts/contracts/Vesting.sol/Vesting.json';
import { Vesting as VestingContract } from '../../typechain/Vesting';
import { VESTING_CONTRACT_ADDRESS } from '../utils/constants';

const Vesting = () => {
	const { account, library } = useWeb3React<ethers.providers.Web3Provider>();
	const [text, setText] = useState('');

	const VestingContract = useMemo(() => {
		if (!account) return null;
		return new ethers.Contract(
			VESTING_CONTRACT_ADDRESS,
			VestingABI,
			library?.getSigner(account)
		) as VestingContract;
	}, [account]);

	const release = async () => {
		if (!VestingContract || !text) return;
		try {
			const tx = await VestingContract.release(text, { gasLimit: 100000 });
			await tx.wait();

			console.log('tx : ', tx);
		} catch (e) {
			if (e instanceof Error) {
				console.log('release error');

				console.error(e);
				console.log('e.message');
				console.log(e.message);
			}
		}
	};

	return (
		<div>
			<h1>VESTING</h1>
			<input
				type="text"
				value={text}
				placeholder={'proofId'}
				onChange={(e) => setText(e.target.value)}
			/>
			<button onClick={release}>Release</button>
		</div>
	);
};

export default Vesting;
