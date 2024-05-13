// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Inflation is ERC20 {
    constructor(
        string memory name,
        string memory symbol_,
        address initialOwner
    ) ERC20(name, symbol_) {
        owner = initialOwner;
    }

    address owner;
    error YouAreNotOwner(address);

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert YouAreNotOwner(msg.sender);
        }
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
