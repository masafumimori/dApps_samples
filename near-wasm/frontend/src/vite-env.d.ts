/// <reference types="vite/client" />

import { Contract, WalletConnection } from 'near-api-js';

declare global {
	interface Window {
		walletConnection: WalletConnection;
		accountId: any;
		contract: Contract;
	}
}
