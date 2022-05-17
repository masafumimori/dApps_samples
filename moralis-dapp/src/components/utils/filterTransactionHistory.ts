import { TransactionDataType } from './types';

export const filterTransactionHistory = (
	dataArray: TransactionDataType[],
	targetAddress: string,
	isSendHistory = true
) => {
	return isSendHistory
		? dataArray.filter((data) => data.from_address === targetAddress)
		: dataArray.filter((data) => data.to_address === targetAddress);
};
