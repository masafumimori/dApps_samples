const { assert } = require('chai');

/* eslint-disable */
const Tether = artifacts.require('Tether');
const Reward = artifacts.require('Reward');
const DecentralBank = artifacts.require('DecentralBank');

require('chai').use(require('chai-as-promised'));

contract('DecentralBank', ([owner, customer, other]) => {
	let tether, rwd, decentralBank;

	function tokens(number) {
		return web3.utils.toWei(number, 'ether');
	}

	before(async () => {
		tether = await Tether.new();
		rwd = await Reward.new();
		decentralBank = await DecentralBank.new(tether.address, rwd.address);

		await rwd.transfer(decentralBank.address, tokens('1000000'));
		await tether.transfer(customer, tokens('100'), { from: owner });
	});

	describe('Mock Tether Deployment', async () => {
		it('matched name successfully', async () => {
			const name = await tether.name();
			assert.equal(name, 'Mock Tether');
		});
	});

	describe('Reward Token Deployment', async () => {
		it('matched name successfully', async () => {
			const name = await rwd.name();
			assert.equal(name, 'Reward Token');
		});
	});

	describe('Decentral Bank Deployment', async () => {
		it('matched name successfully', async () => {
			const name = await decentralBank.name();
			assert.equal(name, 'Decentral Bank');
		});

		it('contract has tokens', async () => {
			const balance = await rwd.balanceOf(decentralBank.address);
			assert.equal(balance, tokens('1000000'));
		});

		it('customer has tokens', async () => {
			const balance = await tether.balanceOf(customer);
			assert.equal(balance, tokens('100'));
		});

		it('other dor NOT have tokens', async () => {
			const balance = await tether.balanceOf(other);
			assert.equal(balance, tokens('0'));
		});

		describe('Yield Farming', async () => {
			it('rewards tokens for staking', async () => {
				const beforeStakingBalance = await tether.balanceOf(customer);
				assert.equal(beforeStakingBalance, tokens('100'));

				await tether.approve(decentralBank.address, tokens('100'), {
					from: customer,
				});
				await decentralBank.deposit(tokens('100'), { from: customer });

				const afterStakingBalance = await tether.balanceOf(customer);
				assert.equal(afterStakingBalance, tokens('0'));

				const stakedBalance = await decentralBank.stakingBalance(customer);
				assert.equal(stakedBalance, tokens('100'));

				const stakingBalance = await tether.balanceOf(decentralBank.address);
				assert.equal(stakingBalance, tokens('100'));

				const isStaking = await decentralBank.isStaking(customer);
				assert.equal(isStaking.toString(), 'true');

				await decentralBank.issueReward({ from: owner });
				// await expect(
				// 	decentralBank.issueReward({ from: customer })
				// ).to.be.eventually.rejectedWith(
				// 	'Only owner of the contract can call this transaction'
				// );

				await decentralBank.withdraw(tokens('100'), { from: customer });
				const isUnstaked = await decentralBank.isStaking(customer);
				assert.equal(isUnstaked.toString(), 'false');
			});
		});
	});
});

/* eslint-enable */
