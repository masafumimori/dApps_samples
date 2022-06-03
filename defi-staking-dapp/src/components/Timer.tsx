import { useEffect, useState } from 'react';

const Timer = ({ seconds }: { seconds: number }) => {
	const [timeLeft, setTimeLeft] = useState(seconds);

	useEffect(() => {
		if (!timeLeft) return;

		const intervalId = setInterval(() => {
			setTimeLeft(timeLeft - 1);
		}, 1000);
		console.log('TIMER');

		return () => clearInterval(intervalId);
	}, [timeLeft]);

	return <h1>{timeLeft}</h1>;
};

export default Timer;
