// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract UserReg {
    
    mapping(address => uint256) public userEntries;

    function recordEntry() public {
        userEntries[msg.sender]++;
    }

    function getEntryCount(address userAddress) public view returns (uint256) {
        return userEntries[userAddress];
    }

}
