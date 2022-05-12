import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Center, Heading } from "@chakra-ui/react";

const App = () => {
	return (
		<Center minH={"100vh"} minW={"100vw"} flexDirection={"column"}>
			<Heading color={"teal"}>Hello world</Heading>
			<Heading size={"lg"}>This is a todo app</Heading>
		</Center>
	);
};

export default App;
