require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
	solidity: "0.8.0",
	networks: {
		ropsten: {
			url: "https://eth-ropsten.alchemyapi.io/v2/O2PmeL1IrVpWrEdcaHcycAN49CkZ7TmP",
			accounts: [process.env.KEY],
		},
	},
};
