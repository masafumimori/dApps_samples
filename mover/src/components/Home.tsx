import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { BigNumber, ethers } from 'ethers';
import React, { useEffect, useMemo, useState } from 'react';
import { abi as AgreementABI } from '../../artifacts/contracts/Agreement.sol/AgreementContract.json';
import { abi as PoMABI } from '../../artifacts/contracts/PoM.sol/PoM.json';
import { AgreementContract } from '../../typechain/AgreementContract';
import { PoM } from '../../typechain/PoM';

const DAO_NAME_PARAM = ethers.utils.zeroPad(
	ethers.utils.toUtf8Bytes('daoName'),
	22
);
const AGREEMENT_CONTRACT_ADDRESS = '0xC7896Bf05ceA4d457Cff9FD14456Da2bC224dBb4';
const POM_CONTRACT_ADDRESS = '0x0C21FEa1026A6d529E2DECf5604f55C4D16E813D';
const MetaMask = new InjectedConnector({ supportedChainIds: [80001, 31337] });

const Home = () => {
	const { account, activate, deactivate, library } =
		useWeb3React<ethers.providers.Web3Provider>();
	const [error, setError] = useState(null);
	const [ids, setIds] = useState<string[]>([]);
	const [text, setText] = useState('');
	const [text2, setText2] = useState('');
	const [detail, setDetail] = useState<{
		founder: string;
		startTime: number;
		endTime: number;
		daoName: string;
		rewardAmount: BigNumber;
		review: string;
	}>();
	const signIn = async () => {
		await activate(MetaMask);
	};

	console.log('library : ', library);

	return (
		<div style={{ margin: '10px 0' }}>
			{account ? <p>current address : {account}</p> : <p>Please signin</p>}
			{!account ? (
				<button onClick={signIn}>Login</button>
			) : (
				<button onClick={deactivate}>Logout</button>
			)}
		</div>
	);
};

export default Home;
