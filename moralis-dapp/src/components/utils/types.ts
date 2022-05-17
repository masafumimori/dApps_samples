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
