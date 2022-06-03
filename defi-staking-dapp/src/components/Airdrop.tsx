import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Contract } from 'web3-eth-contract';
import Timer from './Timer';

type AirdropProps = {
	address: string;
	decentralBank: Contract;
};

const OWNER_ADDRESS = '0xA9A673C2fDf50Cc12f1bc1eB556FA1b0Fc4B9de2';
const INTERVAL_TIME = 10;
// const INTERVAL_TIME = 60 * 60 * 5;

const Airdrop = ({ address, decentralBank }: AirdropProps) => {
	const [airdropInterval, setAirdropInterval] = useState(INTERVAL_TIME);
	const [airDropped, setAirDropped] = useState(true);

	const handleAirDrop = async () => {
		await decentralBank.methods.issueReward().send({ from: address });
		window.location.reload();
	};

	useEffect(() => {
		if (airdropInterval === 0) {
			setAirDropped(false);
			return;
		}

		const intervalId = setInterval(() => {
			setAirdropInterval((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [airdropInterval]);

	if (address !== OWNER_ADDRESS) return null;

	return (
		<>
			<Timer seconds={airdropInterval} />
			<Button onClick={handleAirDrop} disabled={airDropped}>
				Airdrop
			</Button>
		</>
	);
};

export default Airdrop;
