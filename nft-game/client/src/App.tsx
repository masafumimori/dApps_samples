import { Button, Text, Heading, Stack, Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

import WithSubnavigation from '../components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, MyNFT, CreateNFT, Navbar } from '../components';

const App = () => {
	const { isAuthenticated, user, account, Moralis } = useMoralis();

	useEffect(() => {
		if (isAuthenticated) {
		} else {
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated]);

	return (
		<Stack spacing={3} p={10}>
			<Navbar />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route
						path="/mynft"
						element={<MyNFT {...{ user, account }} />}
					></Route>
					<Route path="/create" element={<CreateNFT {...{ user }} />}></Route>
				</Routes>
			</BrowserRouter>
		</Stack>
	);
};

export default App;
