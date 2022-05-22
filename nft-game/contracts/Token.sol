// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC721, Ownable {
    struct Pet {
        uint256 id;
        uint8 damage;
        uint8 magic;
        uint256 lastMeal;
        uint256 endurance; // how long this pet survives after lastMeal. eg) 24hrs
        // Some other properties
    }

    uint256 nextId = 0;
    mapping(uint256 => Pet) private _tokenDetails;

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    function mint(
        uint8 _damage,
        uint8 _magic,
        uint256 _endurance
    ) public onlyOwner {
        _tokenDetails[nextId] = Pet(
            nextId,
            _damage,
            _magic,
            block.timestamp,
            _endurance
        );
        _safeMint(msg.sender, nextId);
        nextId++;
    }

    function feed(uint256 _tokenId) public {
        Pet storage pet = _tokenDetails[_tokenId];
        // Check if feeding within endurance since last meal
        require(pet.lastMeal + pet.endurance > block.timestamp);
        _tokenDetails[_tokenId].lastMeal = block.timestamp;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal view override {
        Pet storage pet = _tokenDetails[tokenId];
        require(to != from);
        // Pet still alive
        require(pet.lastMeal + pet.endurance > block.timestamp);
    }

    function getTokenDetails(uint256 _tokenId)
        public
        view
        returns (Pet memory)
    {
        return _tokenDetails[_tokenId];
    }
}
