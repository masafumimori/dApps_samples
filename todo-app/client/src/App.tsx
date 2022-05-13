import './App.css';
import { Center, Heading } from '@chakra-ui/react';

import { Home } from './components';

const App = () => {
	return (
		<Center minH={'100vh'} minW={'100vw'} flexDirection={'column'}>
			<Home />
		</Center>
	);
};

export default App;
