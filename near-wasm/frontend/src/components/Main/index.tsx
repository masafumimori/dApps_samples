import React, { useContext } from 'react';
import useNear from '../Near/Near';

type Props = {};

const Main = () => {
	const { accountId } = useNear();
	console.log('accountId : ', accountId);

	return <div>{accountId || 'NOT DEFINED'}</div>;
};

export default Main;
