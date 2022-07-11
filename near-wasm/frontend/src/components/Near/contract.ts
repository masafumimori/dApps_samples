import { connect, Contract, WalletConnection } from 'near-api-js/lib';
import { getConfig } from './config';
import { CounterContract } from './type';

const nearConfig = getConfig(process.env.NODE_ENV || 'development');

// Initialize contract & set global variables
export async function initContract() {
	// Initialize connection to the NEAR testnet
	const near = await connect(nearConfig);

	// Initializing Wallet based Account. It can work with NEAR testnet wallet that
	// is hosted at https://wallet.testnet.near.org
	const walletConnection = new WalletConnection(near, null);

	// Getting the Account ID. If still unauthorized, it's just empty string
	const accountId = walletConnection.getAccountId();

	// Initializing our contract APIs by contract name and configuration
	const contract = (await new Contract(
		walletConnection.account(),

		nearConfig.headers.contractName as string,
		{
			// View methods are read only. They don't modify the state, but usually return some value.
			viewMethods: ['get_num'],
			// Change methods can modify the state. But you don't receive the returned value when called.
			changeMethods: ['increment', 'decrement', 'reset'],
		}
	)) as CounterContract;

	return { walletConnection, accountId, contract };
}

export function logout() {
	window.walletConnection.signOut();
	// reload page
	window.location.replace(window.location.origin + window.location.pathname);
}

export function login() {
	// Allow the current app to make calls to the specified contract on the
	// user's behalf.
	// This works by creating a new access key for the user's account and storing
	// the private key in localStorage.
	window.walletConnection.requestSignIn(
		nearConfig.headers.contractName as string
	);
}

export const getCounter = (contract: CounterContract) => async () => {
	const count = ((await contract) as CounterContract)
		.get_num()
		.catch((err: any) => {
			errorHelper(err);
			return 0;
		});
	return count;
};

export const counterIncrement = (contract: CounterContract) => async () => {
	await contract.increment();
};

export const counterDecrement = (contract: CounterContract) => async () => {
	await contract.decrement();
};

export const counterReset = (contract: CounterContract) => async () => {
	await contract.reset();
};

function errorHelper(err: any) {
	// if there's a cryptic error, provide more helpful feedback and instructions here
	// TODO: as soon as we get the error codes propagating back, use those
	if (err.message.includes('Cannot deserialize the contract state')) {
		console.warn(
			'NEAR Warning: the contract/account seems to have state that is not (or no longer) compatible.\n' +
				'This may require deleting and recreating the NEAR account as shown here:\n' +
				'https://stackoverflow.com/a/60767144/711863'
		);
	}
	if (err.message.includes('Cannot deserialize the contract state')) {
		console.warn(
			'NEAR Warning: the contract/account seems to have state that is not (or no longer) compatible.\n' +
				'This may require deleting and recreating the NEAR account as shown here:\n' +
				'https://stackoverflow.com/a/60767144/711863'
		);
	}
	console.error(err);
}
