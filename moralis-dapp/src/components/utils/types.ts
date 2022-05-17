export type TokenDataType = {
	token_address: string;
	name: string;
	symbol: string;
	logo?: string | undefined;
	thumbnail?: string | undefined;
	decimals: string;
	balance: string;
};

export type NFTDataType = {
	token_address: string;
	token_id: string;
	contract_type: string;
	owner_of: string;
	block_number: string;
	block_number_minted: string;
	token_uri?: string | undefined;
	metadata?: string | undefined;
	synced_at?: string | undefined;
	amount?: string | undefined;
	name: string;
	symbol: string;
};

export type TransactionDataType = {
	hash: string;
	nonce: string;
	transaction_index: string;
	from_address: string;
	to_address: string;
	value: string;
	gas: string;
	gas_price: string;
	input: string;
	receipt_cumulative_gas_used: string;
	receipt_gas_used: string;
	receipt_contract_address: string;
	receipt_root: string;
	receipt_status: string;
	block_timestamp: string;
	block_number: string;
	block_hash: string;
};

export type ChainType =
	| 'eth'
	| '0x1'
	| 'ropsten'
	| '0x3'
	| 'rinkeby'
	| '0x4'
	| 'goerli'
	| '0x5'
	| 'kovan'
	| '0x2a'
	| 'polygon'
	| '0x89'
	| 'mumbai'
	| '0x13881'
	| 'bsc'
	| '0x38'
	| 'bsc testnet'
	| '0x61'
	| 'avalanche'
	| '0xa86a'
	| 'avalanche testnet'
	| '0xa869'
	| 'fantom'
	| '0xfa'
	| undefined;
