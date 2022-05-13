import { ToDoAppContextType } from '../types';

type InputProps = {
	placeholder: string;
	name: string;
	type: string;
	value: string;
	handleChange: ToDoAppContextType['handleChange'];
};

const Input = ({
	placeholder,
	name,
	type,
	value,
	handleChange,
}: InputProps) => (
	<input
		placeholder={placeholder}
		type={type}
		value={value}
		onChange={(e) => handleChange(e, name)}
	/>
);

export default Input;
