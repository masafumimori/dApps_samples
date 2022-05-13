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
	Input,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { ToDoAppContextType } from '../types';
import Selector from './Selector';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type ToDoFormProps = {
	formData: ToDoAppContextType['formData'];
	handleChange: ToDoAppContextType['handleChange'];
	createTodo(): Promise<void>;
};

const options = ['High', 'Middle', 'Low'];

const ToDoForm = ({ formData, handleChange, createTodo }: ToDoFormProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [endDate, setEndDate] = useState(new Date());

	const handleSubmit = async () => {
		const { content, priority, deadline } = formData;

		if (!content || !priority || !deadline) {
			alert('Fill all input field.');
			return;
		}

		await createTodo().catch((err) => console.error(err));
	};

	const handleDateChange = (date: Date) => {
		setEndDate(date);
		handleChange('deadline', date.toString());
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
								onChange={(e) => handleChange('content', e.target.value)}
								value={formData.content}
							/>
						</FormControl>
						<FormControl id="deadline">
							<FormLabel>Deadline</FormLabel>
							<DatePicker selected={endDate} onChange={handleDateChange} />
						</FormControl>
						<FormControl id="priprity">
							<FormLabel>Priority</FormLabel>
							<Selector name={'priority'} {...{ options, handleChange }} />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme={'gray'} onClick={onClose}>
							Cancel
						</Button>

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
