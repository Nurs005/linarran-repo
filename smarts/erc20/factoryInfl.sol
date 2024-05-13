// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "./Inflation.sol";

contract FactoryInflation {
    Inflation instance;
    event InflationDeployed(address indexed instance);

    function deploy(
        string memory name,
        string memory symbol_,
        address initialOwner
    ) external {
        instance = new Inflation(name, symbol_, initialOwner);
        emit InflationDeployed(address(instance));
    }
}
