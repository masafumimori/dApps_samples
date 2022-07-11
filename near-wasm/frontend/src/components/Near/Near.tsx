import { WalletConnection } from 'near-api-js';
import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	counterDecrement,
	counterIncrement,
	counterReset,
	getCounter,
	initContract,
} from './contract';
import { CounterContract } from './type';

type NearContextType = {
	walletConnection: WalletConnection | undefined;
	accountId: any;
	contract: CounterContract | undefined;
} & Pick<CounterContract, 'get_num' | 'increment' | 'decrement' | 'reset'>;

const initialValues: NearContextType = {
	walletConnection: undefined,
	accountId: undefined,
	contract: undefined,
	get_num: async () => 0,
	increment: async () => undefined,
	decrement: async () => undefined,
	reset: async () => undefined,
};

const NearContext = createContext<NearContextType>(initialValues);

export const NearProvider = ({ children }: { children: ReactNode }) => {
	const [walletConnection, setWalletConnection] = useState<WalletConnection>();
	const [accountId, setAccountId] = useState<any>();
	const [contract, setContract] = useState<CounterContract>();

	useEffect(() => {
		const load = async () => {
			const { walletConnection, accountId, contract } = await initContract();
			setWalletConnection(walletConnection);
			setAccountId(accountId);
			setContract(contract);
		};
		load();
	}, []);

	const memoisedValues = useMemo(() => {
		if (!contract) return initialValues;

		return {
			walletConnection,
			accountId,
			contract,
			get_num: getCounter(contract),
			increment: counterIncrement(contract),
			decrement: counterDecrement(contract),
			reset: counterReset(contract),
		};
	}, [walletConnection, accountId, contract]);

	return (
		<NearContext.Provider value={memoisedValues}>
			{children}
		</NearContext.Provider>
	);
};

export default function useNear() {
	return useContext(NearContext);
}
