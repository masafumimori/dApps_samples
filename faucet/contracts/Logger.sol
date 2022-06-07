// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

abstract contract Logger {
    function emitLog() public pure virtual returns (bytes32);

    function sayHello() public pure returns (bytes32) {
        return "Hello";
    }
}
