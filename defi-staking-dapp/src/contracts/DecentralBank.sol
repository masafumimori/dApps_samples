// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Tether.sol";
import "./Reward.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    Reward public reward;

    constructor(Tether _tether, Reward _reward) {
        tether = _tether;
        reward = _reward;
    }
}
