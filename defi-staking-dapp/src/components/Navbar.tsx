import bank from '../images/bank.png';

const Navbar = ({ address }: { address: string | undefined }) => {
	if (!address) return null;

	return (
		<nav
			className="navbar navbar-dark fixed-top shadow px-2 py-0"
			style={{ backgroundColor: 'black', height: '50px' }}
		>
			<a
				href="/#"
				className="navbar-brand mr-0"
				style={{ color: 'white', textDecoration: 'none' }}
			>
				{/* dApp Yield Staking (Decentralised Banking){' '} */}
				<img
					src={bank}
					alt="bank logo"
					width={30}
					height={30}
					className="d-inline-block align-top ml-4"
				/>
			</a>
			<ul className="navbar-nav px-3">
				<li className="text-nowrap nav-item d-sm-none d-md-block">
					<small style={{ color: 'white' }}>ACCOUNT NUMBER:{address}</small>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
