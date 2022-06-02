/* eslint-disable */

const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function issueReward(callback) {
	const decentralBank = await DecentralBank.deployed();
	await decentralBank.issueReward();

	console.log('Tokens have been issued successfully.');
	callback();
};
