/* eslint-disable */
const Tether = artifacts.require('Tether');
const Reward = artifacts.require('Reward');
const DecentralBank = artifacts.require('DecentralBank');
/* eslint-enable */

module.exports = async function (deployer, network, accounts) {
	await deployer.deploy(Tether);
	const tether = await Tether.deployed();

	await deployer.deploy(Reward);
	const rwd = await Reward.deployed();

	await deployer.deploy(DecentralBank, tether.address, rwd.address);
	const db = await DecentralBank.deployed();

	// Transfer RWD tokens to Decentral Bank
	await rwd.transfer(db.address, '1000000000000000000000000');

	// Distribute 100 tether to invenstors
	await tether.transfer(accounts[1], '100000000000000000000');
};
