// eslint-disable-next-line no-undef
const Storage = artifacts.require('Storage');

module.exports = function (deployer) {
	deployer.deploy(Storage);
};
