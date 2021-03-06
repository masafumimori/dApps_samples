import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import {
	HARDHAT_CONTRACT_ADDRESS,
	CONTRACT_ADDRESS,
	CONTRACT_ABI,
} from "../utils/constants";
import { TransactionContextType, TransactionType } from "../types";

export const TransactionContext = React.createContext<TransactionContextType>({
	transactionCount: "",
	connectWallet: async () => undefined,
	transactions: [],
	currentAccount: null,
	isLoading: false,
	sendTransaction: async () => undefined,
	handleChange: () => undefined,
	formData: {
		addressTo: "",
		amount: "",
		keyword: "",
		message: "",
	},
	children: undefined,
});

// Only works when Metamask extension is installed in browser
// To make this work, need react-app-env.d.ts file to define the type
const { ethereum } = window;

const createEthereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const transactionsContract = new ethers.Contract(
		HARDHAT_CONTRACT_ADDRESS,
		CONTRACT_ABI,
		signer
	);

	return transactionsContract;
};

type TransactionsProviderProps = {
	children: React.ReactNode;
};

export const TransactionsProvider = ({
	children,
}: TransactionsProviderProps) => {
	const [formData, setformData] = useState({
		addressTo: "",
		amount: "",
		keyword: "",
		message: "",
	});
	const [currentAccount, setCurrentAccount] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [transactionCount, setTransactionCount] = useState(
		localStorage.getItem("transactionCount")
	);
	const [transactions, setTransactions] = useState([]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		name: string
	) => {
		setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
	};

	const getAllTransactions = async () => {
		try {
			if (ethereum) {
				const transactionsContract = createEthereumContract();

				const availableTransactions =
					await transactionsContract.getAllTransactions();

				const structuredTransactions = availableTransactions.map(
					(transaction: TransactionType) => ({
						addressTo: transaction.receiver,
						addressFrom: transaction.sender,
						timestamp: new Date(
							transaction.timestamp.toNumber() * 1000
						).toLocaleString(),
						message: transaction.message,
						keyword: transaction.keyword,
						amount: parseInt(transaction.amount._hex) / 10 ** 18,
					})
				);

				console.log(structuredTransactions);

				setTransactions(structuredTransactions);
			} else {
				console.log("Ethereum is not present");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const checkIfWalletIsConnect = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask.");

			const accounts = await ethereum.request({ method: "eth_accounts" });

			if (accounts.length) {
				setCurrentAccount(accounts[0]);

				getAllTransactions();
			} else {
				console.log("No accounts found");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const checkIfTransactionsExists = async () => {
		try {
			if (ethereum) {
				const transactionsContract = createEthereumContract();
				const currentTransactionCount =
					await transactionsContract.getTransactionCount();

				window.localStorage.setItem(
					"transactionCount",
					currentTransactionCount
				);
			}
		} catch (error) {
			console.log(error);

			throw new Error("No ethereum object");
		}
	};

	const connectWallet = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask.");

			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});

			setCurrentAccount(accounts[0]);
			window.location.reload();
		} catch (error) {
			console.log(error);

			throw new Error("No ethereum object");
		}
	};

	const sendTransaction = async () => {
		try {
			if (ethereum) {
				const { addressTo, amount, keyword, message } = formData;
				const transactionsContract = createEthereumContract();
				const parsedAmount = ethers.utils.parseEther(amount);

				await ethereum.request({
					method: "eth_sendTransaction",
					params: [
						{
							from: currentAccount,
							to: addressTo,
							gas: "0x5208", // hex value (21,000 wei: 0.000021ETH)
							value: parsedAmount._hex,
						},
					],
				});

				const transactionHash = await transactionsContract.addToBlockchain(
					addressTo,
					parsedAmount,
					message,
					keyword
				);

				setIsLoading(true);
				console.log(`Loading - ${transactionHash.hash}`);
				await transactionHash.wait();
				console.log(`Success - ${transactionHash.hash}`);
				setIsLoading(false);

				const transactionsCount =
					await transactionsContract.getTransactionCount();

				setTransactionCount(transactionsCount.toNumber());
				window.location.reload();
			} else {
				console.log("No ethereum object");
			}
		} catch (error) {
			console.log(error);

			throw new Error("No ethereum object");
		}
	};

	useEffect(() => {
		checkIfWalletIsConnect();
		checkIfTransactionsExists();
	}, [transactionCount]);

	return (
		<TransactionContext.Provider
			value={{
				transactionCount,
				connectWallet,
				transactions,
				currentAccount,
				isLoading,
				sendTransaction,
				handleChange,
				formData,
			}}
		>
			{children}
		</TransactionContext.Provider>
	);
};
