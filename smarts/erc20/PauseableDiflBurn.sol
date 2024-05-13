// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";

contract PausableDiflationBurn is ERC20, ERC20Pausable {
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
        if (msg.sender != owner) {
            revert YouAreNotOwner(msg.sender);
        }
        _;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }

    function burn(address acount, uint256 amount) external onlyOwner {
        _burn(acount, amount);
    }
}
