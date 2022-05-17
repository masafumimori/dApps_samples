import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { NFTDataType } from '../utils/types';

type NFTBalanceTableProp = {
	NFTData: NFTDataType[];
};

const NFTBalanceTable = ({ NFTData }: NFTBalanceTableProp) => {
	return (
		<Table variant="simple">
			<Thead>
				<Tr>
					<Th>NFT Name</Th>
					<Th>Token Address</Th>
					<Th>Token ID</Th>
					<Th>Contract Type</Th>
					{NFTData.length === 0 && <Th></Th>}
				</Tr>
			</Thead>
			<Tbody>
				{NFTData.length > 0 ? (
					NFTData.map((element: NFTDataType, i: number) => {
						return (
							<Tr key={element.name + i}>
								<Td>{element.name}</Td>
								<Td>{element.token_address}</Td>
								<Td style={{ lineBreak: 'anywhere' }}>{element.token_id}</Td>
								<Td>{element.contract_type}</Td>
							</Tr>
						);
					})
				) : (
					<Tr>
						<Td></Td>
						<Td textAlign={'end'}>No NFT</Td>
						<Td></Td>
						<Td></Td>
					</Tr>
				)}
			</Tbody>
		</Table>
	);
};

export default NFTBalanceTable;
