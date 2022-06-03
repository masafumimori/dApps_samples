import useWeb3 from '../hooks/useWeb3';
import TetherLogo from '../images/tether.png';
import React, { SyntheticEvent } from 'react';
import { ContractType } from '@/../types/ContractType';

export type MainType = {
	address: string;
	stakingBalance: string;
	rewardBalance: string;
	tetherBalance: string;
	contracts: ContractType;
};

const Main = ({
	address,
	stakingBalance,
	rewardBalance,
	tetherBalance,
	contracts,
}: MainType) => {
	const { web3 } = useWeb3();

	if (!web3 || !contracts) return null;
	const { decentralBank, tether } = contracts;

	const stakeTokens = async (e: SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			amount: { value: string };
		};
		const amount = web3.utils.toWei(target.amount.value);
		await tether.methods
			.approve(decentralBank.options.address, amount)
			.send({ from: address });
		await decentralBank.methods.deposit(amount).send({ from: address });
		window.location.reload();
	};

	const handleUnstake = async () => {
		await decentralBank.methods
			.withdraw(web3.utils.toWei(stakingBalance))
			.send({ from: address });
		window.location.reload();
	};

	return (
		<div id="content" className="mt-3">
			<table className="table text-muted text-center">
				<thead>
					<tr>
						<th scope="col">Staking Balance</th>
						<th scope="col">Reward Balance</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{stakingBalance} USDT</td>
						<td>{rewardBalance} RWD</td>
					</tr>
				</tbody>
			</table>
			<div className="card mb-2" style={{ opacity: '.9' }}>
				<form onSubmit={stakeTokens} className="mb-3">
					<div style={{ borderSpacing: '0 1em' }}>
						<label className="float-left" style={{ marginLeft: '15px' }}>
							<b>Stake Tokens</b>
						</label>
						<span className="float-right" style={{ marginRight: '8px' }}>
							Balance: {tetherBalance}
						</span>
						<div className="input-group mb-4">
							<input type="text" placeholder="0" required name="amount" />
							<div className="input-group-open">
								<div className="input-group-text">
									<img src={TetherLogo} alt="tether" height="32" />
									&nbsp;&nbsp;&nbsp; USDT
								</div>
							</div>
						</div>
						<button type="submit" className="btn btn-primary btn-lg btn-block">
							DEPOSIT
						</button>
					</div>
				</form>
				<button
					type="submit"
					onClick={handleUnstake}
					className="btn btn-primary btn-lg btn-block"
				>
					WITHDRAW
				</button>
				<div className="card-body text-center" style={{ color: 'blue' }}>
					AIRDROP{' '}
					{/* <Airdrop
						stakingBalance={this.props.stakingBalance}
						decentralBankContract={this.props.decentralBankContract}
					/> */}
				</div>
			</div>
		</div>
	);
};

export default Main;
