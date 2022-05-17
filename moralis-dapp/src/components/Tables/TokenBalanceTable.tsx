import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import React from 'react';
import { TokenDataType } from '../utils/types';

type TokenBalanceTableProps = {
	tokenData: TokenDataType[];
};
const TokenBalanceTable = ({ tokenData }: TokenBalanceTableProps) => {
	return (
		<Table variant="simple">
			<Thead>
				<Tr>
					<Th>Token Name</Th>
					<Th>Balance</Th>
					<Th>Symbol</Th>
				</Tr>
			</Thead>
			<Tbody>
				{tokenData.length > 0 ? (
					tokenData.map((element: any, i: number) => {
						return (
							<React.Fragment key={i}>
								<Tr>
									<Td>{element.name}</Td>
									<Td>{element.balance / Number('1e' + element.decimals)}</Td>
									<Td>{element.symbol}</Td>
								</Tr>
							</React.Fragment>
						);
					})
				) : (
					<Tr>
						<Td></Td>
						<Td>No Tokens</Td>
						<Td></Td>
					</Tr>
				)}
			</Tbody>
		</Table>
	);
};

export default TokenBalanceTable;
