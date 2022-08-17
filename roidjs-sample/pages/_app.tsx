import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Roid } from "roidjs";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Roid defaults={{ state_1: 1, state_2: "two" }}>
			<Component {...pageProps} />
		</Roid>
	);
}

export default MyApp;
