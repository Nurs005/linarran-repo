// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BurnableDiflation is ERC20 {
    constructor(
        uint amount,
        string memory name,
        string memory symbol_,
        address initialOwner
    ) ERC20(name, symbol_) {
        owner = initialOwner;
        _mint(owner, amount * 10 ** decimals());
    }

    address owner;
    error YouAreNotOwner(address);

    modifier onlyOwner() {
        if (msg.sender == owner) {
            revert YouAreNotOwner(msg.sender);
        }
        _;
    }

    function burn(address acount, uint256 amount) external onlyOwner {
        _burn(acount, amount);
    }
}
