export type TokenIdTypes = {
	total?: number | undefined;
	page?: number | undefined;
	page_size?: number | undefined;
	result?:
		| {
				token_address: string;
				token_id: string;
				contract_type: string;
				token_uri?: string | undefined;
				metadata?: string | undefined;
				synced_at?: string | undefined;
				amount?: string | undefined;
				name: string;
				symbol: string;
		  }[]
		| undefined;
};

export type NftType = {
	token_address: string;
	token_id: string;
	contract_type: string;
	token_uri?: string | undefined;
	metadata?: string | undefined;
	synced_at?: string | undefined;
	amount?: string | undefined;
	name: string;
	symbol: string;
};

export type TokenOwnersType = {
	status?: string | undefined;
	total?: number | undefined;
	page?: number | undefined;
	page_size?: number | undefined;
	result?:
		| {
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
		  }[]
		| undefined;
};

export type OwnerType = {
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

export type NftWithOwnerType = NftType & {
	owners?: string[];
};
