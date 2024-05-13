// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "./BurnInflation.sol";

contract FactoryBurnableInflation {
    BurnableInflation instance;
    event BurnableInflationDeployed(address indexed instance);

    function deploy(
        string memory name,
        string memory symbol_,
        address initialOwner
    ) external {
        instance = new BurnableInflation(name, symbol_, initialOwner);
        emit BurnableInflationDeployed(address(instance));
    }
}
