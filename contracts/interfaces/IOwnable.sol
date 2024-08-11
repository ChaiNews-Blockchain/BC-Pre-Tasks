// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IOwnable {
    /**
     * @dev Returns the address of the current owner.
     */
    function owner() external view returns (address);

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * @param newOwner The address of the new owner.
     */
    function transferOwnership(address newOwner) external;

    /**
     * @dev Emitted when ownership of the contract is transferred from `previousOwner` to `newOwner`.
     */
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
}
