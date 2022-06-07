// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage {
    uint8 a = 7; // 1byte
    uint16 b = 10; // 2bytes
    address c = 0x20219E84D3CBBd9038cAD5161379bc8f9672e2ea; // 20bytes
    bool d = true; // 1byte
    uint64 e = 15; // 8bytes
    // total 32bytes

    // web3.eth.getStorageAt(contractAddress, idx)の返却値
    // 0x 0f 01    20219e84d3cbbd9038cad5161379bc8f9672e2ea 000a 07
    //    15 true  address                                   10   7
}
