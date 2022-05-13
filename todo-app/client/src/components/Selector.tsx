import { Select } from '@chakra-ui/react';
import { ToDoAppContextType } from '../types';

type InputProps = {
	name: string;
	options: string[];
	handleChange: ToDoAppContextType['handleChange'];
};

const Selector = ({ name, options, handleChange }: InputProps) => (
	<select defaultValue={options[0]} onChange={(e) => handleChange(e, name)}>
		{options.length > 0 &&
			options.map((option, idx) => {
				return (
					<option key={option + idx} value={option}>
						{option}
					</option>
				);
			})}
	</select>
);

export default Selector;
