import { getAddress, isAddress } from '@ethersproject/address';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers } from 'ethers';
import React, { useEffect, useMemo, useState } from 'react';
import { abi as AgreementABI } from '../../artifacts/contracts/Agreement.sol/AgreementContract.json';
import { abi as TokenABI } from '../../artifacts/contracts/Token.sol/Token.json';
import { AgreementContract } from '../../typechain/AgreementContract';
import { Token } from '../../typechain/Token';
import {
	AGREEMENT_CONTRACT_ADDRESS,
	TOKEN_CONTRACT_ADDRESS,
	VESTING_CONTRACT_ADDRESS,
} from '../utils/constants';

const DAO_NAME_PARAM = ethers.utils.zeroPad(
	ethers.utils.toUtf8Bytes('daoName'),
	22
);

const now = () => {
	return Math.floor(new Date().getTime() / 1000);
};

export type AgreementType = {
	id: string;
	daoName: string;
	startTime: number;
	endTime: number;
	isCompleted: boolean;
	rewardAmount: BigNumber;
	founder: string;
	moderator: string;
};

export function shortenAddress(address: string, chars = 4): string {
	const parsed = getAddress(address);
	if (!parsed) {
		throw Error(`Invalid 'address' parameter '${address}'.`);
	}
	return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

const Agreement = () => {
	const { account, library } = useWeb3React<ethers.providers.Web3Provider>();
	const [error, setError] = useState<string | null>(null);

	// contract data
	const [total, setTotal] = useState(0);
	const [ids, setIds] = useState<string[]>([]);
	const [agreements, setAgreements] = useState<AgreementType[]>([]);
	const [detail, setDetail] = useState<AgreementType>();

	const [text, setText] = useState('');
	const [text2, setText2] = useState('');
	const [text3, setText3] = useState('');
	const [text4, setText4] = useState('');

	const AgContract = useMemo(() => {
		if (!account) return null;
		return new ethers.Contract(
			AGREEMENT_CONTRACT_ADDRESS,
			AgreementABI,
			library?.getSigner(account)
		) as AgreementContract;
	}, [account]);
	const TokenContract = useMemo(() => {
		if (!account) return null;
		return new ethers.Contract(
			TOKEN_CONTRACT_ADDRESS,
			TokenABI,
			library?.getSigner(account)
		) as Token;
	}, [account]);

	const approve = async () => {
		if (!TokenContract) return;
		await TokenContract.approve(
			VESTING_CONTRACT_ADDRESS,
			ethers.utils.parseEther('5000')
		);
	};

	const createAgreement = async () => {
		if (!text || !AgContract) return;
		await AgContract.createAgreement(
			text,
			DAO_NAME_PARAM,
			now() + 120,
			now() + 300,
			ethers.utils.parseEther('1000'),
			60,
			{
				gasLimit: 5000000,
			}
		);
	};

	const updateAgreement = async () => {
		if (!text2 || !AgContract) return;
		await AgContract.updateAgreement(
			text2,
			now() + 60,
			now() + 90,
			// ethers.utils.parseEther('1200'),
			0,
			{
				gasLimit: 5000000,
			}
		);
	};

	const completeAgreement = async () => {
		if (!account || !AgContract || !text3) return;
		await AgContract.completeAgreement(text3, 'This is review! Well done!!', {
			gasLimit: 600000,
		}).catch((e) => {
			console.log('e', typeof e);
			if (e instanceof Error) {
				setError(e.message);
			}
		});
	};

	const getAllAgreements = async () => {
		if (!account || !AgContract) return;

		const res = await AgContract.getAllAgreements(account);
		setAgreements(res);
	};

	const getAllIds = async () => {
		if (!account || !AgContract) return;

		const ids = await AgContract.getAllIds(account);
		setIds(ids);
	};

	const getAgreementDetail = async () => {
		if (!account || !AgContract || !text4) return;
		const code = await library?.getCode(AGREEMENT_CONTRACT_ADDRESS);
		console.log('code : ', code);
		const res = await AgContract.getAgreementDetail(text4);
		setDetail(res);
	};

	useEffect(() => {
		const load = async () => {
			if (!account || !AgContract) {
				setIds([]);
				setAgreements([]);
				return;
			}
			const res = await AgContract.getTotalAgreements();
			setTotal(res.toNumber());
		};
		load();
	}, [account, AgContract]);

	return (
		<div style={{ margin: '10px 0' }}>
			<h1>AGREEMENT</h1>
			<h3>TOTAL AGREEMENT : {total}</h3>
			{error && <p>{error}</p>}
			<button onClick={approve}>Approve 5000NEW</button>
			<div style={{ margin: '10px 0' }}>
				<input
					type="text"
					value={text}
					placeholder={'mod address'}
					onChange={(e) => setText(e.target.value)}
				/>
				<button onClick={createAgreement}>Create Agreement</button>
			</div>
			<div style={{ margin: '10px 0' }}>
				<input
					type="text"
					value={text2}
					placeholder={'agreementId'}
					onChange={(e) => setText2(e.target.value)}
				/>
				<button onClick={updateAgreement}>Update Agreement</button>
			</div>
			<div style={{ margin: '10px 0' }}>
				<input
					type="text"
					value={text3}
					placeholder={'agreementId'}
					onChange={(e) => setText3(e.target.value)}
				/>
				<button onClick={completeAgreement}>Complete Agreement</button>
			</div>
			<div style={{ margin: '10px 0' }}>
				<input
					type="text"
					value={text4}
					placeholder={'agreementId'}
					onChange={(e) => setText4(e.target.value)}
				/>
				{detail && (
					<div
						style={{
							margin: '10px 0',
						}}
					>
						<pre>ID: {detail.id}</pre>
						<pre>DAO: {ethers.utils.hexlify(detail.daoName)}</pre>
						<pre>FOUNDER: {detail.founder}</pre>
						<pre>MODERATOR: {detail.moderator}</pre>
						<pre>START TIME: {detail.startTime}</pre>
						<pre>END TIME: {detail.endTime}</pre>
						<pre>ISCOMPLETED: {detail.isCompleted ? 'TRUE' : 'FALSE'}</pre>
						<pre>REWARD: {detail.rewardAmount.toString()}</pre>
					</div>
				)}
				<button onClick={getAgreementDetail}>getAgreementDetail</button>
			</div>
			<div style={{ margin: '10px 0' }}>
				<div style={{ margin: '10px 0', display: 'flex', flexWrap: 'wrap' }}>
					{agreements.map((agreement) => (
						<AgreementDetail
							agreement={agreement}
							key={agreement.id}
						></AgreementDetail>
					))}
				</div>
				<button onClick={getAllAgreements}>getAllAgreements</button>
			</div>
			<div style={{ margin: '10px 0' }}>
				{ids.map((id) => (
					<p key={id}>{id}</p>
				))}
				<button onClick={getAllIds}>getAllIds</button>
			</div>
		</div>
	);
};

const AgreementDetail = ({ agreement }: { agreement: AgreementType }) => {
	return (
		<div style={{ width: '45%', margin: '0 10px' }}>
			<pre>ID: {agreement.id}</pre>
			<pre>DAO: {agreement.daoName}</pre>
			<pre>FOUNDER: {agreement.founder}</pre>
			<pre>MODERATOR: {agreement.moderator}</pre>
			<pre>START TIME: {agreement.startTime}</pre>
			<pre>END TIME: {agreement.endTime}</pre>
			<pre>ISCOMPLETED: {agreement.isCompleted ? 'TRUE' : 'FALSE'}</pre>
			<pre>REWARD: {agreement.rewardAmount.toString()}</pre>
		</div>
	);
};

export default Agreement;
