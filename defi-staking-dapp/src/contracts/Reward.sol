// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Reward {
    string public name = "Reward Token";
    string public symbol = "RWD";
    uint256 public totalSupply = 1000000000000000000000000; // 1 milliton tokens
    uint256 public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 indexed _value
    );

    event Approval(
        address indexed _owner,
        address indexed _to,
        uint256 indexed _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance.");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(balanceOf[_from] >= _value, "Insufficient balance.");
        require(
            allowance[_from][msg.sender] >= _value,
            "Insufficient balance."
        );

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}
