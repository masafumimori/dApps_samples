import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import Web3 from 'web3';

export type Web3ContextType = {
	web3?: Web3;
};
export const Web3Context = createContext<Web3ContextType>({ web3: undefined });

export const Web3Provider = ({ children }: { children: ReactNode }) => {
	const [web3, setWeb3] = useState<Web3 | undefined>();

	useEffect(() => {
		if (!web3) {
			setWeb3(new Web3(Web3.givenProvider));
		}
	}, []);

	return (
		<Web3Context.Provider value={{ web3 }}>{children}</Web3Context.Provider>
	);
};

const useWeb3 = () => {
	const context = useContext(Web3Context);
	const { web3 } = context;
	return { web3 };
};

export default useWeb3;
