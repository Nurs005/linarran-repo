// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "./PauseableInflation.sol";

contract FactoryInflationPauseable {
    PausableInflation instance;
    event PausableInflationDeployed(address indexed instance);

    function deploy(
        string memory name,
        string memory symbol_,
        address initialOwner
    ) external {
        instance = new PausableInflation(name, symbol_, initialOwner);
        emit PausableInflationDeployed(address(instance));
    }
}
