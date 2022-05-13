import { Select } from '@chakra-ui/react';
import { ToDoAppContextType } from '../types';

type SelectorProps = {
	name: string;
	options: string[];
	handleChange: ToDoAppContextType['handleChange'];
};

const Selector = ({ name, options, handleChange }: SelectorProps) => (
	<Select
		defaultValue={''}
		onChange={(e) => handleChange(name, e.target.value)}
	>
		<option value="" disabled>
			Choose here
		</option>
		{options.length > 0 &&
			options.map((option, idx) => {
				return (
					<option key={option + idx} value={option}>
						{option}
					</option>
				);
			})}
	</Select>
);

export default Selector;
