import Main from './components/Main';
import { NearProvider } from './components/Near/Near';

function App() {
	return (
		<NearProvider>
			<div>Hello NEAR PROTOCOL</div>
			<Main />
		</NearProvider>
	);
}

export default App;
