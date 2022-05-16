import { Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { useMoralis } from 'react-moralis';
import Card from '../Card';
import HistoryTable from '../HistoryTable';

type Props = {};

const Home = () => {
	const { user } = useMoralis();

	if (!user) return null;

	return (
		<>
			<Card user={user} />
			<Stack px={5}>
				<HistoryTable user={user} />
			</Stack>
		</>
	);
};

export default Home;
