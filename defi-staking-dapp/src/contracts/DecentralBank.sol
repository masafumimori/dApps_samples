// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Tether.sol";
import "./Reward.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    Reward public reward;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(Tether _tether, Reward _reward) {
        tether = _tether;
        reward = _reward;
        owner = msg.sender;
    }

    function deposit(uint256 _amount) public {
        require(0 < _amount, "Deposit has to be greater than 0.");

        // Transfer tether tokens to this contract for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // update stakig balance
        stakingBalance[msg.sender] += _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;
    }

    function issueReward() public {
        require(
            msg.sender == owner,
            "Only owner of the contract can call this transaction"
        );
        for (uint256 i = 0; i < stakers.length; i++) {
            address receipent = stakers[i];
            uint256 balance = stakingBalance[receipent] / 9; // 9 percent of staking will be given to stakers
            if (balance > 0) {
                reward.transfer(receipent, balance);
            }
        }
    }

    function withdraw(uint256 _amount) public {
        require(
            stakingBalance[msg.sender] >= _amount,
            "Cannot withdraw more than you staked."
        );

        tether.transfer(msg.sender, _amount);

        stakingBalance[msg.sender] -= _amount;

        if (stakingBalance[msg.sender] == 0) {
            isStaking[msg.sender] = false;
        }
    }
}
