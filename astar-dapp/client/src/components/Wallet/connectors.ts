import { InjectedConnector } from '@web3-react/injected-connector';

const SHIBUYA_CHAIN = 81;
const ASTAR_CHAIN = 592;

export const injected = new InjectedConnector({
	supportedChainIds: [SHIBUYA_CHAIN, ASTAR_CHAIN],
});
