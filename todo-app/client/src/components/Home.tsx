import { Heading, Stack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ToDoAppContext } from '../context/ToDoAppProvider';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';

const Home = () => {
	const {
		currentAccount,
		connectWallet,
		handleChange,
		createTodo,
		completeToDo,
		formData,
		todos,
	} = useContext(ToDoAppContext);

	return (
		<Stack>
			<Heading textAlign={'center'} p={2}>
				dApp ToDo
			</Heading>
			{!currentAccount ? (
				<button type="button" onClick={connectWallet}>
					<p className="text-white text-base font-semibold">Connect Wallet</p>
				</button>
			) : (
				<>
					<ToDoForm {...{ formData, handleChange, createTodo }} />
					<ToDoList {...{ todos, completeToDo }} />
				</>
			)}
		</Stack>
	);
};

export default Home;
