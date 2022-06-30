import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import React, { useMemo, useState } from 'react';
import { abi as AgreementABI } from '../../artifacts/contracts/Agreement.sol/AgreementContract.json';
import { abi as VestingABI } from '../../artifacts/contracts/Vesting.sol/Vesting.json';
import { AgreementContract } from '../../typechain/AgreementContract';
import { Vesting } from '../../typechain/Vesting';

const DAO_NAME_PARAM = ethers.utils.zeroPad(
	ethers.utils.toUtf8Bytes('daoName'),
	22
);
const AGREEMENT_CONTRACT_ADDRESS = '0xC7896Bf05ceA4d457Cff9FD14456Da2bC224dBb4';
const VESTING_CONTRACT_ADDRESS = '0x1D933E3d67a9ED692B027154Bb988a93EeA7DDc6';

const Home2 = () => {
	const { account, library } = useWeb3React<ethers.providers.Web3Provider>();
	const [error, setError] = useState<string | null>(null);
	const [text, setText] = useState('');
	const [text2, setText2] = useState('');

	console.log('web3 error : ', error);

	const AgContract = useMemo(() => {
		if (!account) return null;
		return new ethers.Contract(
			AGREEMENT_CONTRACT_ADDRESS,
			AgreementABI,
			library?.getSigner(account)
		) as AgreementContract;
	}, [account]);

	const VestingContract = useMemo(() => {
		if (!account) return null;
		return new ethers.Contract(
			VESTING_CONTRACT_ADDRESS,
			VestingABI,
			library?.getSigner(account)
		) as Vesting;
	}, [account]);

	const completeAgreement = async () => {
		if (!account || !AgContract || !text) return;
		await AgContract.completeAgreement(text, text).catch((e) => {
			console.log('e', typeof e);
			if (e instanceof Error) {
				setError(e.message);
			}
		});
	};

	const release = async () => {
		if (!VestingContract || !text2) return;
		await VestingContract.release(text2, { gasLimit: 100000 }).catch((e) => {
			console.log('e', typeof e);
			if (e instanceof Error) {
				setError(e.message);
			}
		});
	};

	return (
		<div>
			<div>
				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button onClick={completeAgreement}>Complete Agreement</button>
				{error && <p>{error}</p>}
			</div>
			<div>
				<input
					type="text"
					value={text2}
					onChange={(e) => setText2(e.target.value)}
				/>
				<button onClick={release}>Release</button>
			</div>
		</div>
	);
};

export default Home2;
