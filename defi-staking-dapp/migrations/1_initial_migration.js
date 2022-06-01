// eslint-disable-next-line
const Migrations = artifacts.require('Migrations');

module.exports = function (deployer) {
	deployer.deploy(Migrations);
};
