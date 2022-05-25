import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { abi } from '../abi';
import Web3 from 'web3';
import { CONTRACT_ADDRESS } from '../App';
const web3 = new Web3(Web3.givenProvider);

type FormProps = {
	token_id: string;
};
const Form = ({ token_id }: FormProps) => {
	const Web3Api = useMoralisWeb3Api();

	const mintNft = async (formData: FormData) => {
		// Code to mint NFT
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			address: data.get('address'),
			amount: data.get('amount'),
		});
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Mint
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="address"
						label="Address"
						name="address"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="amount"
						label="amount"
						type="amount"
						id="amount"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Mint
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Form;
