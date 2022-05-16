import {
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	useColorModeValue,
} from '@chakra-ui/react';
import Moralis from 'moralis/types';
import { useERC20Transfers } from 'react-moralis';
import { shortenAddress } from '../utils/shortenAddress';

type HistoryTableProps = {
	user: Moralis.User;
};

const HistoryTable = ({ user }: HistoryTableProps) => {
	const address = user.get('ethAddress');

	const { data, error, isLoading } = useERC20Transfers({
		address,
	});

	if (isLoading) return <div>Loading</div>;
	if (error) return <div>Error occured</div>;

	console.log(data);

	if (!data || !data.result) return <div>No transaction</div>;

	return (
		<TableContainer maxW={'100%'}>
			<Table variant="simple">
				<Thead bgColor={useColorModeValue('gray.100', 'gray.900')}>
					<Tr>
						<Th>TX ID</Th>
						<Th>Receiver</Th>
						<Th>Value</Th>
						<Th>Timestamp</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data?.result?.length > 0 &&
						data.result.map((tx) => {
							return (
								<Tr>
									<Td>{shortenAddress(tx.transaction_hash)}</Td>
									<Td>{shortenAddress(tx.to_address)}</Td>
									<Td>{tx.value}</Td>
									<Td>{tx.block_timestamp}</Td>
								</Tr>
							);
						})}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default HistoryTable;
