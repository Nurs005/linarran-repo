// // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./PauseableDifl.sol";

contract FactoryOfPauseableDifl {
    PauseableDiflation instance;
    event DeployPauseableDiflation(address indexed instance);

    function deploy(
        uint amount,
        string memory name,
        string memory symbol_,
        address initialOwner
    ) external {
        instance = new PauseableDiflation(amount, name, symbol_, initialOwner);
        emit DeployPauseableDiflation(address(instance));
    }
}
