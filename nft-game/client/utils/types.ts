import { BigNumber } from 'ethers';

export type PetType = {
	id: BigNumber;
	name: string;
	damage: string;
	magic: string;
	lastMeal: BigNumber;
	endurance: BigNumber;
};
