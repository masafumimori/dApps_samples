import { Heading, Stack } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { ToDoAppContext } from '../context/ToDoAppProvider';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';

type Props = {};

const Home = (props: Props) => {
	// return <div>Home</div>;
	const {
		currentAccount,
		connectWallet,
		handleChange,
		createTodo,
		completeToDo,
		formData,
		todos,
	} = useContext(ToDoAppContext);
	console.log('current account : ' + currentAccount);

	return (
		<Stack>
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
