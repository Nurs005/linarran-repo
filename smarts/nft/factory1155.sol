// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./nft1155preMint.sol";

contract NFTContract1155ETH {
    PremintMult _erc1155Inctanse;

    event Deployed_Premint1155(address);

    function deployPremintERC1155(
        string memory uri,
        address account,
        uint id,
        uint amount,
        bytes memory data,
        address initialOwner
    ) external {
        _erc1155Inctanse = new PremintMult(
            uri,
            account,
            id,
            amount,
            data,
            initialOwner
        );
        emit Deployed_Premint1155(address(_erc1155Inctanse));
    }
}
