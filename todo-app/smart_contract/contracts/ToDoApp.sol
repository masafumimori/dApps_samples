//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ToDoApp {
    struct ToDoStruct {
        uint256 id;
        string content;
        string priority;
        bool completed;
        string deadline;
        uint256 timestamp;
        address owner;
    }

    ToDoStruct[] public todos;

    mapping(uint256 => address) public toDoToOwner;
    mapping(address => uint256[]) public ownerToIds;

    function createTodo(
        string memory _content,
        string memory _priority,
        string memory _deadline
    ) public {
        // Only allows maximum 10 todos (Not necessary)
        require(ownerToIds[msg.sender].length <= 10, "You have already created enough todos.");

        todos.push(ToDoStruct(todos.length, _content, _priority, false, _deadline, block.timestamp, msg.sender));
        uint256 id = todos.length - 1;

        toDoToOwner[id] = msg.sender;
        ownerToIds[msg.sender].push(id);
    }

    function completeToDo(uint256 _id) external {
        require(todos[_id].owner == msg.sender, "You cannot complete todo task that does not belongs to you.");

        todos[_id].completed = true;
        // TODO: might send ETH to task complete?
    }

    function getAllToDos() external view returns (ToDoStruct[] memory) {
        ToDoStruct[] memory todoList = new ToDoStruct[](ownerToIds[msg.sender].length);

        for (uint256 i = 0; i < ownerToIds[msg.sender].length; i++) {
            uint256 id = ownerToIds[msg.sender][i];
            todoList[i] = todos[id];
        }

        return todoList;
    }

    function getToDoCount() external view returns (uint256) {
        return ownerToIds[msg.sender].length;
    }
}
