// // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./PauseableDiflBurn.sol";

contract FactoryOfBurnableDiflationPaus {
    PausableDiflationBurn instance;
    event DeployPauseableBurnableDiflation(address indexed instance);

    function deploy(
        uint amount,
        string memory name,
        string memory symbol_,
        address initialOwner
    ) external {
        instance = new PausableDiflationBurn(
            amount,
            name,
            symbol_,
            initialOwner
        );
        emit DeployPauseableBurnableDiflation(address(instance));
    }
}
