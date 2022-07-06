import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers } from 'ethers';
import React, { useEffect, useMemo, useState } from 'react';
import { abi as PoMABI } from '../../artifacts/contracts/PoM.sol/PoM.json';
import { PoM } from '../../typechain/PoM';
import { POM_CONTRACT_ADDRESS } from '../utils/constants';

const DAO_NAME_PARAM = ethers.utils.zeroPad(
	ethers.utils.toUtf8Bytes('daoName'),
	22
);
export type ProofType = {
	founder: string;
	startTime: number;
	endTime: number;
	daoName: string;
	rewardAmount: BigNumber;
	review: string;
};

const POM = () => {
	const { account, library } = useWeb3React<ethers.providers.Web3Provider>();
	const [error, setError] = useState(null);

	// contract data
	const [ids, setIds] = useState<string[]>([]);
	const [detail, setDetail] = useState<ProofType | null>(null);
	const [tokenId, setTokenId] = useState('');
	const [total, setTotal] = useState(0);

	const [text, setText] = useState('');
	const [text2, setText2] = useState('');
	const [text3, setText3] = useState('');

	const PoMContract = useMemo(() => {
		if (!account) return null;
		return new ethers.Contract(
			POM_CONTRACT_ADDRESS,
			PoMABI,
			library?.getSigner(account)
		) as PoM;
	}, [account]);

	const burnToken = async () => {
		if (!account || !PoMContract || !text) return;
		await PoMContract.burnToken(text, {
			gasLimit: 5000000,
		});
	};

	const getProofDetail = async () => {
		if (!account || !PoMContract || !text2) return;
		const detail = await PoMContract.getProofDetail(text2).catch((e) =>
			console.error(e)
		);

		if (detail) setDetail(detail);
	};

	const getAllTokenIds = async () => {
		if (!account || !PoMContract) return;
		const ids = await PoMContract.getAllTokenIds(account).catch((e) =>
			console.error(e)
		);
		console.log('ids : ', ids);

		if (!ids) return;
		const tokenIds = ids.map((id: BigNumber) => id.toString());
		setIds(tokenIds);
	};

	const tokenID = async () => {
		if (!account || !PoMContract || !text3) return;
		const id = await PoMContract.tokenID(text3);

		setTokenId(id.toString());
	};

	useEffect(() => {
		const load = async () => {
			if (!PoMContract) {
				setTokenId('');
				setIds([]);
				setDetail(null);
				return;
			}

			const count = await PoMContract?.totalSupply();
			setTotal(count.toNumber());
		};
		load();
	}, [account, PoMContract]);

	return (
		<div style={{ margin: '10px 0' }}>
			<h1>POM</h1>
			<h3>TOTAL TOKEN COUNT: {total}</h3>
			<div style={{ margin: '10px 0' }}>
				<input
					type="text"
					value={text}
					placeholder={'proofId or agreementId'}
					onChange={(e) => setText(e.target.value)}
				/>
				<button onClick={burnToken}>Burn</button>
			</div>
			<div style={{ margin: '10px 0' }}>
				<input
					type="text"
					value={text2}
					placeholder={'tokenId'}
					onChange={(e) => setText2(e.target.value)}
				/>
				<button onClick={getProofDetail}>getProofDetail</button>
				{detail && <ProofDetail proof={detail} />}
			</div>
			<div style={{ margin: '10px 0' }}>
				<input
					type="text"
					value={text3}
					placeholder={'proofId or agreementId'}
					onChange={(e) => setText3(e.target.value)}
				/>
				<button onClick={tokenID}>tokenID</button>
				{tokenId && <p>TOKEN ID: {tokenId}</p>}
			</div>
			<div style={{ margin: '10px 0' }}>
				<button onClick={getAllTokenIds}>getAllTokenIds</button>
				{ids.map((id, idx) => (
					<p key={id}>
						index{idx} : {id}
					</p>
				))}
			</div>
		</div>
	);
};

const ProofDetail = ({ proof }: { proof: ProofType }) => {
	return (
		<div style={{ margin: '10px 0' }}>
			<pre>FOUNDER: {proof.founder}</pre>
			<pre>DAONAME: {proof.daoName}</pre>
			<pre>START TIME: {proof.startTime}</pre>
			<pre>END TIME: {proof.endTime}</pre>
			<pre>REWARD: {proof.rewardAmount.toString()}</pre>
			<pre>REVIEW: {proof.review || 'NO REVIEW YET'}</pre>
		</div>
	);
};

export default POM;
