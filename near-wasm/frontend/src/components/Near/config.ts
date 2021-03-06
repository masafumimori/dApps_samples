import { ConnectConfig } from 'near-api-js';

// Once you deploy the contract to its final account, make sure to specify it here
const CONTRACT_NAME =
	'dev-1657843053139-87159159763215'; /* TODO: Change this to the deployed account */

export const getConfig = (env: string): ConnectConfig => {
	switch (env) {
		case 'production':
		case 'mainnet':
			return {
				networkId: 'mainnet',
				nodeUrl: 'https://rpc.mainnet.near.org',
				headers: { contractName: CONTRACT_NAME },
				walletUrl: 'https://wallet.near.org',
				helperUrl: 'https://helper.mainnet.near.org',
			};
		case 'development':
		case 'testnet':
			return {
				networkId: 'testnet',
				nodeUrl: 'https://rpc.testnet.near.org',
				headers: { contractName: CONTRACT_NAME },
				walletUrl: 'https://wallet.testnet.near.org',
				helperUrl: 'https://helper.testnet.near.org',
			};
		case 'betanet':
			return {
				networkId: 'betanet',
				nodeUrl: 'https://rpc.betanet.near.org',
				headers: { contractName: CONTRACT_NAME },
				walletUrl: 'https://wallet.betanet.near.org',
				helperUrl: 'https://helper.betanet.near.org',
			};
		case 'local':
			return {
				networkId: process.env.NEAR_CLI_LOCALNET_NETWORK_ID || 'local',
				nodeUrl: process.env.NEAR_NODE_URL || 'http://localhost:3030',
				keyPath:
					process.env.NEAR_CLI_LOCALNET_KEY_PATH ||
					`${process.env.HOME}/.near/validator_key.json`,
				walletUrl:
					process.env.NEAR_WALLET_URL || 'http://localhost:4000/wallet',
				headers: { contractName: CONTRACT_NAME },
			};
		case 'test':
		case 'ci':
			return {
				networkId: 'shared-test',
				nodeUrl: 'https://rpc.ci-testnet.near.org',
				headers: { contractName: CONTRACT_NAME },
				masterAccount: 'test.near',
			};
		case 'ci-betanet':
			return {
				networkId: 'shared-test-staging',
				nodeUrl: 'https://rpc.ci-betanet.near.org',
				headers: { contractName: CONTRACT_NAME },
				masterAccount: 'test.near',
			};
		default:
			throw Error(
				`Unconfigured environment '${env}'. Can be configured in src/config.js.`
			);
	}
};
