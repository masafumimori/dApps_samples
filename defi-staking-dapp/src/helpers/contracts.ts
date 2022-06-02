import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

interface IContract {
	[key: string]: any;
}
export const createContract = async (contractJson: {
	abi: any;
	networks: any;
}) => {
	const web3 = new Web3(Web3.givenProvider);
	const networkId = await web3.eth.net.getId();

	const { networks }: IContract = contractJson;

	const data = networks[networkId];

	if (data) {
		const contract = new web3.eth.Contract(
			contractJson.abi as AbiItem[],
			data.address
		);
		return contract;
	}

	return null;
};
