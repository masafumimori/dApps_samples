import React from 'react';

import {
	Heading,
	Box,
	Center,
	Text,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react';
import Moralis from 'moralis/types';
import { shortenAddress } from '../utils/shortenAddress';

type CardProps = {
	user: Moralis.User;
};

const Card = ({ user }: CardProps) => {
	if (!user) return null;

	return (
		<Center py={6}>
			<Box
				maxW={'270px'}
				w={'full'}
				bg={useColorModeValue('white', 'gray.800')}
				boxShadow={'2xl'}
				rounded={'md'}
				overflow={'hidden'}
			>
				<Box p={6} textAlign={'center'}>
					<Text color={'gray.500'} pb={2}>
						Wallet Address
					</Text>
					<Heading fontSize={'2xl'} fontWeight={500}>
						{shortenAddress(user.get('ethAddress'))}
					</Heading>
				</Box>
			</Box>
		</Center>
	);
};

export default Card;
