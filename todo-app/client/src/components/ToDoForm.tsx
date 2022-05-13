import {
	FormControl,
	FormLabel,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	Select,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ToDoAppContextType } from '../types';
import Input from './Input';
import Selector from './Selector';

type ToDoFormProps = {
	formData: ToDoAppContextType['formData'];
	handleChange: ToDoAppContextType['handleChange'];
	createTodo(): Promise<void>;
};

const options = ['High', 'Middle', 'Low'];

const ToDoForm = ({ formData, handleChange, createTodo }: ToDoFormProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleSubmit = async () => {
		const { content, priority, deadline } = formData;

		if (!content || !priority || !deadline) return;

		await createTodo().catch((err) => console.error(err));
	};

	const initialRef = React.useRef(null);

	return (
		<>
			<Button onClick={onOpen}>Add ToDo</Button>

			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add your task</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl id="content">
							<FormLabel>ToDo</FormLabel>
							<Input
								placeholder="run errands..."
								name="content"
								type="text"
								handleChange={handleChange}
								value={formData.content}
							/>
						</FormControl>
						<FormControl id="deadline">
							<FormLabel>Deadline</FormLabel>
							<Input
								placeholder="2 days"
								name="deadline"
								type="text"
								handleChange={handleChange}
								value={formData.deadline}
							/>
						</FormControl>
						<FormControl id="priprity">
							<FormLabel>Priority</FormLabel>
							<Input
								placeholder="2 days"
								name="priority"
								type="text"
								handleChange={handleChange}
								value={formData.priority}
							/>
							{/* <Selector name={'priority'} {...{ options, handleChange }} /> */}
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button onClick={onClose}>Cancel</Button>

						<Button
							bg={'blue.400'}
							color={'white'}
							_hover={{
								bg: 'blue.500',
							}}
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ToDoForm;
