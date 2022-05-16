import {
	Box,
	Flex,
	HStack,
	IconButton,
	Button,
	useDisclosure,
	useColorModeValue,
	Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NavLink from './NavLink';
import { useMoralis } from 'react-moralis';

const Links = ['Dashboard', 'Projects', 'Team'];

const Navbar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		authenticate,
		isAuthenticated,
		isAuthenticating,
		user,
		_setUser,
		logout,
	} = useMoralis();

	const login = async () => {
		const { ethereum } = window;

		if (!ethereum) {
			alert('You need to install MetaMask on browser.');
			return;
		}

		if (!isAuthenticated) {
			await authenticate({
				signingMessage: 'Log in using Moralis',
			})
				.then(function (user) {
					if (user) {
						_setUser(user);
					}
					console.log('logged in user:', user);
					console.log(user!.get('ethAddress'));
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	};

	const logOut = async () => {
		await logout();
		console.log('logged out');
	};

	return (
		<>
			<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<IconButton
						size={'md'}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={'Open Menu'}
						display={{ md: 'none' }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={'center'}>
						<Box>HOME</Box>
						<HStack
							as={'nav'}
							spacing={4}
							display={{ base: 'none', md: 'flex' }}
						>
							{Links.map((link) => (
								<NavLink key={link}>{link}</NavLink>
							))}
						</HStack>
					</HStack>
					<Flex alignItems={'center'}>
						{isAuthenticated ? (
							<Button
								bg={useColorModeValue('#151f21', 'gray.900')}
								color={'white'}
								onClick={logOut}
								disabled={isAuthenticating}
								rounded={'md'}
								_hover={{
									transform: 'translateY(-2px)',
									boxShadow: 'lg',
								}}
							>
								Disconnect
							</Button>
						) : (
							<Button
								colorScheme={'teal'}
								onClick={login}
								disabled={isAuthenticating}
								rounded={'md'}
								_hover={{
									transform: 'translateY(-2px)',
									boxShadow: 'lg',
								}}
							>
								Connect Metamask
							</Button>
						)}
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack as={'nav'} spacing={4}>
							{Links.map((link) => (
								<NavLink key={link}>{link}</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
};

export default Navbar;
