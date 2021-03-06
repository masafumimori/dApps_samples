import {
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	useClipboard,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import { shortenAddress } from '../utils/shortenAddress';
import { TransactionDataType } from '../utils/types';

type TransactionTableProps = {
	side: 'From' | 'To';
	txData: TransactionDataType[];
};
const TransactionTable = ({ side, txData }: TransactionTableProps) => {
	return (
		<Table variant="simple">
			<Thead>
				<Tr>
					<Th>TX ID</Th>
					<Th>{side} Address</Th>
					<Th>Value</Th>
					<Th>Timestamp</Th>
				</Tr>
			</Thead>
			<Tbody>
				{txData.length > 0 ? (
					txData.map((element: TransactionDataType, i: number) => {
						const { hasCopied, onCopy } = useClipboard(element.hash);

						return (
							<React.Fragment key={i}>
								<Tr>
									<Td
										_hover={{ cursor: 'pointer' }}
										onClick={() => {
											navigator.clipboard.writeText(element.hash);
											onCopy();
										}}
									>
										{hasCopied ? (
											<Text>Copied!</Text>
										) : (
											shortenAddress(element.hash)
										)}
									</Td>
									<Td>
										{side === 'From'
											? shortenAddress(element.from_address)
											: shortenAddress(element.to_address)}
									</Td>
									<Td>{Number(element.value) / 10 ** 18}</Td>
									<Td>{element.block_timestamp}</Td>
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

export default TransactionTable;
