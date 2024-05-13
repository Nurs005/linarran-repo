// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./nft721Premint.sol";

contract NFTContract721MintSepolia {
    Premint721 _erc721Inctanse;

    event Deployed_Pemint721(address);

    function deployPremintERC721(
        address initialOwner,
        string memory _name,
        string memory _symbol,
        address to,
        string memory _tokenURI
    ) external {
        _erc721Inctanse = new Premint721(
            initialOwner,
            _name,
            _symbol,
            to,
            _tokenURI
        );
        emit Deployed_Pemint721(address(_erc721Inctanse));
    }
}
