import {
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Stat,
	StatGroup,
	StatLabel,
	StatNumber,
	Text,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { PetType } from '../utils/types';

type NFTCardType = {
	pet: PetType;
	feed(petId: number): Promise<void>;
	transfer(address: string, petId: number): Promise<void>;
};

const Card = ({
	pet: { id, name, damage, magic, lastMeal, endurance },
	feed,
	transfer,
}: NFTCardType) => {
	const lastMealDate = new Date(lastMeal.toNumber() * 1000).toLocaleString();

	const deathTime = new Date(
		(lastMeal.toNumber() + endurance.toNumber()) * 1000
	);
	const isDead = new Date() > deathTime;

	const { isOpen, onOpen, onClose } = useDisclosure();

	const [address, setAddress] = useState('');
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setAddress(value);
	};

	const handleTransfer = async () => {
		if (!address) {
			alert('Invalid Address.');
			return;
		}
		await transfer(address, id.toNumber())
			.then((_) => onClose())
			.catch((error) => console.error(error));
	};

	return (
		<Center py={6}>
			<Stack
				borderWidth="1px"
				borderRadius="lg"
				w={{ sm: '100%', md: '540px' }}
				maxW={'100%'}
				height={{ sm: '476px', md: '20rem' }}
				direction={{ base: 'column', md: 'row' }}
				bg={useColorModeValue('white', 'gray.900')}
				boxShadow={'2xl'}
				padding={4}
			>
				<Flex flex={1} bg="blue.200">
					<Image
						objectFit="cover"
						boxSize="100%"
						src={'https://source.unsplash.com/random&h=200&w=200'}
					/>
				</Flex>
				<Stack
					flex={1}
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					p={1}
					pt={2}
					maxW={'50%'}
				>
					<Heading fontSize={'2xl'} fontFamily={'body'}>
						{name}
					</Heading>
					<Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
						{id.toNumber()}
					</Text>
					<StatGroup maxW={'100%'}>
						<Stack flexDir={'row'} w={'100%'}>
							<Stat>
								<StatLabel>Damage</StatLabel>
								<StatNumber>{damage}</StatNumber>
							</Stat>
							<Stat>
								<StatLabel>Magic</StatLabel>
								<StatNumber>{magic}</StatNumber>
							</Stat>
						</Stack>
						<Stack flexDir={'row'} w={'100%'}>
							<Stat>
								<StatLabel>Last Meal</StatLabel>
								{isDead ? (
									<StatNumber>DEAD</StatNumber>
								) : (
									<StatNumber>{lastMealDate}</StatNumber>
								)}
							</Stat>
							<Stat>
								<StatLabel>Endurance</StatLabel>
								<StatNumber>{endurance.toNumber()}</StatNumber>
							</Stat>
						</Stack>
					</StatGroup>

					<Stack
						width={'100%'}
						mt={'2rem'}
						direction={'row'}
						padding={2}
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Button
							flex={1}
							fontSize={'sm'}
							rounded={'full'}
							_focus={{
								bg: 'gray.200',
							}}
							onClick={onOpen}
						>
							Transfer
						</Button>
						<Modal isOpen={isOpen} onClose={onClose}>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader>Transfer your pet</ModalHeader>
								<ModalCloseButton />
								<ModalBody pb={6}>
									<FormControl>
										<FormLabel>Address</FormLabel>
										<Input
											placeholder="Address"
											value={address}
											onChange={handleChange}
										/>
									</FormControl>
								</ModalBody>

								<ModalFooter>
									<Button colorScheme="blue" mr={3} onClick={handleTransfer}>
										Transfer
									</Button>
									<Button onClick={onClose}>Cancel</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>
						<Button
							flex={1}
							fontSize={'sm'}
							rounded={'full'}
							bg={'blue.400'}
							color={'white'}
							boxShadow={
								'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
							}
							_hover={{
								bg: 'blue.500',
							}}
							_focus={{
								bg: 'blue.500',
							}}
							onClick={() => feed(id.toNumber())}
						>
							Feed
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Center>
	);
};

export default Card;
