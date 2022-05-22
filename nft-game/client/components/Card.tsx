import {
	Button,
	Center,
	Flex,
	Heading,
	Image,
	Stack,
	Stat,
	StatGroup,
	StatLabel,
	StatNumber,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { PetType } from '../utils/types';

type NFTCardType = {
	pet: PetType;
	feed(): Promise<void>;
};

const Card = ({
	pet: { id, damage, magic, lastMeal, endurance },
	feed,
}: NFTCardType) => {
	const lastMealDate = new Date(lastMeal.toNumber() * 1000).toString();

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
						Lindsey James
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
								<StatNumber>{lastMealDate}</StatNumber>
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
						>
							Message
						</Button>
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
							onClick={feed}
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
