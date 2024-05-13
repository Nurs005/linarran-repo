// // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BurnDiflation.sol";

contract FactoryOfBurnableDiflation {
    BurnableDiflation instance;
    event DeployBurnableDiflation(address indexed instance);

    function deploy(
        uint amount,
        string memory name,
        string memory symbol_,
        address initialOwner
    ) external {
        instance = new BurnableDiflation(amount, name, symbol_, initialOwner);
        emit DeployBurnableDiflation(address(instance));
    }
}
