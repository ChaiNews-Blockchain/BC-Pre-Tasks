// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DemoToken.sol";


contract Airdrop is Ownable {
    using SafeMath for uint;

    address public tokenAddr;
    
    constructor(address _tokenAddr) {
        tokenAddr = _tokenAddr;
    }

    function batchDropTokens(address[] memory _recipients, uint256[] memory _amount) public onlyOwner returns (bool) {
       
        for (uint i = 0; i < _recipients.length; i++) {
            require(_recipients[i] != address(0));
            require(DemoToken(tokenAddr).transfer(_recipients[i], _amount[i]));
        }

        return true;
    }

    function dropTokens(address _recipient, uint256 _amount) public onlyOwner returns (bool) {
            require(_recipient != address(0));
            require(DemoToken(tokenAddr).transfer(_recipient, _amount));
        return true;
    }

    function updateTokenAddress(address newTokenAddr) public onlyOwner {
        tokenAddr = newTokenAddr;
    }

    function withdrawTokens(address beneficiary) public onlyOwner {
        require(DemoToken(tokenAddr).transfer(beneficiary, DemoToken(tokenAddr).balanceOf(address(this))));
    }
}