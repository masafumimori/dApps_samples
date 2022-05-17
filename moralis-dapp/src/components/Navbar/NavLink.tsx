import { useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type NavLinkProps = {
	link: string;
	children: ReactNode;
};

const NavLink = ({ link, children }: NavLinkProps) => (
	<Link to={link.toLowerCase()}>{children}</Link>
);

export default NavLink;
