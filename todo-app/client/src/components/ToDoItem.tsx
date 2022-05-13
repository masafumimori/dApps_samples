import {
	Text,
	Flex,
	Box,
	useColorModeValue,
	Stack,
	FormLabel,
	Switch,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import { ToDoAppContextType, ToDoType } from '../types';

type ToDoItemType = ToDoType & {
	completeToDo: ToDoAppContextType['completeToDo'];
};

const ToDoItem = ({
	id,
	content,
	priority,
	completed,
	deadline,
	timestamp,
	completeToDo,
}: ToDoItemType) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleComplete = async () => {
		await completeToDo(id);
		onClose();
	};

	return (
		<Flex p={50} w="full" alignItems="center" justifyContent="center">
			<Box
				bg={useColorModeValue('white', 'gray.800')}
				maxW="md"
				borderWidth="1px"
				rounded="lg"
				shadow="lg"
				position="relative"
			>
				<Box p="6">
					<Stack
						mt="1"
						direction={'column'}
						justifyContent="space-between"
						alignContent="center"
						spacing={5}
					>
						<Box
							fontSize="2xl"
							fontWeight="semibold"
							as="h4"
							lineHeight="tight"
						>
							{content}
						</Box>
						<Text color={'gray.500'}>{timestamp}</Text>
						<Text>Completed : </Text>
						<input
							type="checkbox"
							onChange={onOpen}
							checked={completed}
							disabled={completed}
						/>
					</Stack>
				</Box>
			</Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Complete the todo?</ModalHeader>
					<ModalCloseButton />
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleComplete}>
							Complete
						</Button>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default ToDoItem;
