import React from 'react';

export type ToDoAppContextType = {
	todos: any[];
	currentAccount: any | null;
	isLoading: boolean;
	formData: {
		content: string;
		priority: string;
		deadline: string;
	};
	connectWallet(): Promise<void>;
	createTodo(): Promise<void>;
	handleChange(name: string, value: string): void;
	completeToDo(id: string): Promise<void>;
	children?: React.ReactNode;
};

export type ToDoType = {
	id: string;
	content: string;
	priority: number;
	completed: boolean;
	deadline: any;
	timestamp: any;
};
/**
 *  uint256 id;
        string content;
        uint8 priority;
        bool completed;
        uint256 deadline;
        uint256 timestamp;
        address owner;
 */
