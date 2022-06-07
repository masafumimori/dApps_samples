// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Logger.sol";
import "./IFaucet.sol";

contract Faucet is IFaucet, Logger {
    uint256 public numOfFunders;
    mapping(address => bool) private funders;
    mapping(uint256 => address) private lutFunders;

    modifier limitWithdraw(uint256 withdrawAmount) {
        require(
            withdrawAmount <= 100000000000000000,
            "Cannot withdraw more than 1 ether."
        );
        _;
    }

    receive() external payable {}

    function emitLog() public pure override returns (bytes32) {
        return "Hello world";
    }

    function addFunds() external payable override {
        address funder = msg.sender;

        if (!funders[funder]) {
            funders[funder] = true;
            lutFunders[numOfFunders] = funder;
            numOfFunders++;
        }
    }

    function withdraw(uint256 withdrawAmount)
        external
        override
        limitWithdraw(withdrawAmount)
    {
        payable(msg.sender).transfer(withdrawAmount);
    }

    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numOfFunders);

        for (uint256 i = 0; i < numOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }

        return _funders;
    }

    function getFunderAtIndex(uint8 index) external view returns (address) {
        return lutFunders[index];
    }
}

/**
    let instance = await Faucet.deployed();
    instance = await Faucet.deployed();
    instance.addFunds({from: "0xF905754fAce6Efe0c682Dc5d2a73ca5F99b31943", value: "1000000000000000000"})
    instance.addFunds({from: "0x6bc3141e718DD2D3A50A33D8c9585f759924b1dF", value: "1000000000000000000"})
    instance.withdraw("500000000000000000", {from: "0xF905754fAce6Efe0c682Dc5d2a73ca5F99b31943"})
    instance.getAllFunders()
    instance.getFunderAtIndex(0)
    0x00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004
 */
