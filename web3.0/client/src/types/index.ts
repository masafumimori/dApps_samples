import { BigNumber } from "ethers";

export type TransactionType = {
	sender: string;
	receiver: string;
	amount: BigNumber;
	message: string;
	timestamp: any;
	keyword: string;
};

export type TransactionContextType = {
	transactionCount: string | null;
	connectWallet(): Promise<void>;
	transactions: any[];
	currentAccount: any | null;
	isLoading: boolean;
	sendTransaction(): Promise<void>;
	handleChange(e: React.ChangeEvent<HTMLInputElement>, name: string): void;
	formData: {
		addressTo: string;
		amount: string;
		keyword: string;
		message: string;
	};
	children?: React.ReactNode;
};
