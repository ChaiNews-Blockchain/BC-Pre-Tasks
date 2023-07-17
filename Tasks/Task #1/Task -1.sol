// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract trackUsers {

    mapping(address => uint) private userInfo;
    
    function resetUser(address to) public {
    // Modifier eklenebilir
        userInfo[to] = 0;
    }

    function activiteUser() public {
        userInfo[msg.sender]++;
    }

    function getUser(address to) public view returns (uint256) {
        return userInfo[to];
    }
}