import { Contract } from 'near-api-js';

export type CounterContract = Contract & {
	get_num(): Promise<number>;
	increment(): Promise<void>;
	decrement(): Promise<void>;
	reset(): Promise<void>;
};
