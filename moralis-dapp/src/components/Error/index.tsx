import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Text,
} from '@chakra-ui/react';

type ErrorOverlay = {
	error: Error;
	isOpen: boolean;
	onClose(): void;
};
const ErrorOverlay = ({ error, isOpen, onClose }: ErrorOverlay) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Something went wront...</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text color={'red'}>{error.message}</Text>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ErrorOverlay;
