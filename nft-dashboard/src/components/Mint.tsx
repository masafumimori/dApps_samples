import { Button, Container, Stack } from '@mui/material';
import { Link, useLocation, useParams } from 'react-router-dom';
import Form from './Form';

type MintProps = {
	token_id: string;
};

const Mint = () => {
	const { state } = useLocation();
	console.log(state);

	return (
		<Container>
			<Stack width={'150px'} marginRight={'auto'}>
				<Link to={'/'} style={{ textDecoration: 'none', color: '#fff' }}>
					<Button variant={'contained'} color={'success'}>
						Home
					</Button>
				</Link>
			</Stack>
			<Form token_id={'1'} />
		</Container>
	);
};

export default Mint;
