// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "./PauseableMintBurn.sol";

contract FactoryInflationPauseableBurn {
    PausableMintBurn instance;
    event PausableMintBurnDeployed(address indexed instance);

    function deploy(
        string memory name,
        string memory symbol_,
        address initialOwner
    ) external {
        instance = new PausableMintBurn(name, symbol_, initialOwner);
        emit PausableMintBurnDeployed(address(instance));
    }
}
