import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { AccountType } from '../types/AccountType';
import { ContractType } from '../types/ContractType';
import Tether from './truffle_abis/Tether.json';
import Reward from './truffle_abis/Reward.json';
import DecentralBank from './truffle_abis/DecentralBank.json';
import { createContract } from './helpers/contracts';
import Main from './components/Main';
import useWeb3 from './hooks/useWeb3';
import Airdrop from './components/Airdrop';

const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [account, setAccount] = useState<AccountType>({
		address: undefined,
		tetherBalance: undefined,
		rewardBalance: undefined,
		stakingBalance: undefined,
	});

	const [contract, setContract] = useState<ContractType>();

	const { web3 } = useWeb3();

	const handleAccountChange = (accounts: string[]) => {
		setAccount({ ...account, address: accounts[0] });
		window.location.reload();
	};

	const init = async () => {
		const address = await getAccountAddress();
		if (!address) return;

		const contracts = await loadContracts(address);
		if (!contracts) return;

		const { tether, reward, decentralBank } = contracts;
		setContract({ tether, reward, decentralBank });

		try {
			const tetherBalance = await tether.methods.balanceOf(address).call();

			const rewardBalance = await reward.methods.balanceOf(address).call();

			const stakingBalance = await decentralBank.methods
				.stakingBalance(address)
				.call();

			setAccount({
				address,
				tetherBalance: web3?.utils.fromWei(tetherBalance, 'ether'),
				rewardBalance: web3?.utils.fromWei(rewardBalance, 'ether'),
				stakingBalance: web3?.utils.fromWei(stakingBalance, 'ether'),
			});
		} catch (e) {
			console.error(e);
		}
	};

	const loadContracts = async (address: string) => {
		const tether = await createContract(Tether).catch((e) =>
			console.error('TETHER', e)
		);
		const reward = await createContract(Reward).catch((e) =>
			console.error('REWARD', e)
		);
		const decentralBank = await createContract(DecentralBank);

		if (!tether || !reward || !decentralBank) {
			alert(
				`Contract of ${!tether ? 'Tether, ' : ''} ${
					!reward ? 'Reward, ' : ''
				} ${
					!decentralBank ? 'DecentralBank' : ''
				} not deployed. Please make sure all the contracts are deployed.`
			);
			return;
		}

		return { tether, reward, decentralBank };
	};

	const getAccountAddress = async () => {
		setIsLoading(true);
		if (!web3) {
			return;
		}

		const accounts = await web3.eth.getAccounts();
		if (!accounts || accounts.length === 0) return;

		const address = accounts[0];

		setIsLoading(false);

		return address;
	};

	useEffect(() => {
		(async () => {
			await init();
			// setIsLoading(false);
		})();

		const { ethereum } = window;
		if (!ethereum) return;

		ethereum.on('accountsChanged', handleAccountChange);

		return () => {
			ethereum.removeAllListeners('accountsChanged');
		};
	}, [web3]);

	if (!account) return null;
	if (isLoading) return <h1>Loading...</h1>;

	console.log('account ; ', account);

	return (
		<div className="App">
			<Navbar address={account.address} />
			<div className="container-fluid mt-5">
				<div className="row">
					<main
						role={'main'}
						className="col-lg-12 mx-auto"
						style={{ maxWidth: '600px', maxHeight: '100vh' }}
					>
						<div>
							<Main
								address={account.address ? account.address : ''}
								tetherBalance={
									account.tetherBalance ? account.tetherBalance : '0'
								}
								rewardBalance={
									account.rewardBalance ? account.rewardBalance : '0'
								}
								stakingBalance={
									account.stakingBalance ? account.stakingBalance : '0'
								}
								contracts={contract!}
							/>
							<Airdrop
								address={account.address || ''}
								decentralBank={contract?.decentralBank}
							/>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default App;
