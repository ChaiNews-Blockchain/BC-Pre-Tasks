// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20Burnable {
    /**
     * @dev Burns `amount` of tokens from the caller's account.
     * @param amount The amount of tokens to be burned.
     */
    function burn(uint256 amount) external;

    /**
     * @dev Burns `amount` of tokens from `account`, deducting from the caller's allowance.
     * @param account The address from which the tokens will be burned.
     * @param amount The amount of tokens to be burned.
     */
    function burnFrom(address account, uint256 amount) external;
}
