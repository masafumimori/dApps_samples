import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { abi } from '../utils/ToDoApp.json';
import { ToDoAppContextType, ToDoType } from '../types';

export const ToDoAppContext = React.createContext<ToDoAppContextType>({
	connectWallet: async () => undefined,
	todos: [],
	currentAccount: null,
	isLoading: false,
	createTodo: async () => undefined,
	handleChange: () => undefined,
	completeToDo: async () => undefined,
	formData: {
		content: '',
		priority: '',
		deadline: '',
	},
	children: undefined,
});

// Only works when Metamask extension is installed in browser
// To make this work, need react-app-env.d.ts file to define the type
const { ethereum } = window;

const createEthereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const todoContract = new ethers.Contract(
		import.meta.env.VITE_CONTRACT_ADDRESS,
		abi,
		signer
	);

	return todoContract;
};

type TodoAppProviderProps = {
	children: React.ReactNode;
};

export const ToDoAppProvider = ({ children }: TodoAppProviderProps) => {
	const [formData, setformData] = useState({
		content: '',
		priority: '',
		deadline: '',
	});
	const [currentAccount, setCurrentAccount] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [todos, setToDos] = useState<ToDoType[]>([]);
	const [todoCount, setTodoCount] = useState(localStorage.getItem('todoCount'));

	const handleChange = (name: string, value: string) => {
		setformData((prevState) => ({ ...prevState, [name]: value }));
	};

	const completeToDo = async (id: string) => {
		try {
			if (ethereum) {
				const todoContract = createEthereumContract();

				await todoContract.completeToDo(id);
				await getAllToDos();
				window.location.reload();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getAllToDos = async () => {
		try {
			if (ethereum) {
				const todoContract = createEthereumContract();

				const todos = await todoContract.getAllToDos();

				const structuredToDos = todos.map((todo: ToDoType) => ({
					id: todo.id,
					content: todo.content,
					priority: todo.priority,
					completed: todo.completed,
					deadline: todo.deadline,
					timestamp: new Date(
						todo.timestamp.toNumber() * 1000
					).toLocaleString(),
				}));

				console.log(structuredToDos);

				setToDos(structuredToDos);
			} else {
				console.log('Ethereum is not present');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const checkIfWalletIsConnect = async () => {
		try {
			if (!ethereum) return alert('Please install MetaMask.');

			const accounts = await ethereum.request({ method: 'eth_accounts' });

			if (accounts.length) {
				setCurrentAccount(accounts[0]);

				getAllToDos();
			} else {
				console.log('No accounts found');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const checkIfToDosExist = async () => {
		try {
			if (ethereum) {
				const todoContract = createEthereumContract();
				const todoCount = await todoContract.getToDoCount();

				window.localStorage.setItem('todoCount', todoCount);
			}
		} catch (error) {
			console.log(error);

			throw new Error('No ethereum object');
		}
	};

	const connectWallet = async () => {
		console.log('connect');

		try {
			if (!ethereum) return alert('Please install MetaMask.');

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});

			setCurrentAccount(accounts[0]);
			window.location.reload();
		} catch (error) {
			console.log(error);

			throw new Error('No ethereum object');
		}
	};

	const createTodo = async () => {
		try {
			if (ethereum) {
				const { content, priority, deadline } = formData;
				const todoContract = createEthereumContract();

				const transactionHash = await todoContract.createTodo(
					content,
					priority,
					deadline
				);

				setIsLoading(true);
				console.log(`Loading - ${transactionHash.hash}`);
				await transactionHash.wait();
				console.log(`Success - ${transactionHash.hash}`);
				setIsLoading(false);

				const todoCount = await todoContract.getToDoCount();

				setTodoCount(todoCount.toNumber());
				window.location.reload();
			} else {
				console.log('No ethereum object');
			}
		} catch (error) {
			console.log(error);

			throw new Error('No ethereum object');
		}
	};

	useEffect(() => {
		checkIfWalletIsConnect();
		checkIfToDosExist();
	}, [todoCount]);

	return (
		<ToDoAppContext.Provider
			value={{
				todos,
				currentAccount,
				isLoading,
				formData,
				createTodo,
				handleChange,
				completeToDo,
				connectWallet,
			}}
		>
			{children}
		</ToDoAppContext.Provider>
	);
};
