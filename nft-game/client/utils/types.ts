import { BigNumber } from 'ethers';

export type PetType = {
	id: BigNumber;
	damage: string;
	magic: string;
	lastMeal: BigNumber;
	endurance: BigNumber;
};
