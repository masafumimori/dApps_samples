import { Heading } from '@chakra-ui/react';
import React from 'react';
import { ToDoAppContextType } from '../types';
import ToDoItem from './ToDoItem';

type ToDoListProps = {
	todos: any[];
	completeToDo: ToDoAppContextType['completeToDo'];
};

const ToDoList = ({ todos, completeToDo }: ToDoListProps) => {
	return (
		<>
			{todos.length > 0 ? (
				todos.map((todo) => {
					return (
						<ToDoItem key={todo.id} completeToDo={completeToDo} {...todo} />
					);
				})
			) : (
				<Heading>You haven't created any todos yet...</Heading>
			)}
		</>
	);
};

export default ToDoList;
