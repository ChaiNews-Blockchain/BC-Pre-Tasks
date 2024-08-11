// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20Pausable {
    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function paused() external view returns (bool);

    /**
     * @dev Triggers stopped state.
     */
    function pause() external;

    /**
     * @dev Returns to normal state.
     */
    function unpause() external;

    /**
     * @dev Emitted when the pause is triggered by `account`.
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event Unpaused(address account);
}
