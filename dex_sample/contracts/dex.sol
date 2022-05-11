// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC20.sol";

contract Dex {

    event Buy(address _account, address _tokenAddr, uint256 _cost, uint256 _amount);
    event Sell(address _account, address _tokenAddr, uint256 _cost, uint256 _amount);

    mapping(address => bool) public supportedTokenAddress;

    modifier supportsToken(address _tokenAddr) {
        require(supportedTokenAddress[_tokenAddr], "This token is not supported");
        _;
    }

    constructor(address[] memory _tokenAddr) {
        for (uint i = 0; i < _tokenAddr.length; i++) {
            supportedTokenAddress[_tokenAddr[i]] = true;
        }
    }

    function buyToken(address _tokenAddr, uint256 _cost, uint256 _amount) external payable supportsToken(_tokenAddr) {
        ERC20 token = ERC20(_tokenAddr);
        require(msg.value == _cost, "Insufficient fund");
        require(token.balanceOf(address(this)) >= _amount, "Token sold out");
        token.transfer(msg.sender, _amount);

        emit Buy(msg.sender, _tokenAddr, _cost, _amount);
    }

    function sellToken(address _tokenAddr, uint256 _cost, uint256 _amount) external payable supportsToken(_tokenAddr) {
        ERC20 token = ERC20(_tokenAddr);
        require(token.balanceOf(msg.sender) >= _cost, "Insufficient token balance");
        require(address(this).balance >= _amount, "Dex does not have enough balance");
        token.transferFrom(msg.sender, address(this), _cost);

        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "ETH transfer failed");

        emit Sell(msg.sender, _tokenAddr, _cost, _amount);
    }
}