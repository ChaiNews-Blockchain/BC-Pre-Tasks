// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    /**
     * @dev Returns the total token supply.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the account balance of another account with address `account`.
     * @param account The address from which the balance will be retrieved.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Transfers `amount` of tokens to address `recipient`, and MUST fire the Transfer event. The
     * function SHOULD throw if the `sender` account balance does not have enough tokens to spend.
     * @param recipient The address of the recipient.
     * @param amount The amount of token to be transferred.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the amount which `spender` is still allowed to withdraw from `owner`.
     * @param owner The address of the account owning tokens.
     * @param spender The address of the account able to transfer the tokens.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Allows `spender` to withdraw from your account multiple times, up to
     * the `amount` amount. If this function is called again it overwrites the current
     * allowance with `amount`.
     * @param spender The address of the account able to transfer the tokens.
     * @param amount The amount of tokens to be approved for transfer.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Transfers `amount` of tokens from address `sender` to address `recipient`, and MUST fire the
     * Transfer event.
     * @param sender The address of the sender.
     * @param recipient The address of the recipient.
     * @param amount The amount of token to be transferred.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Triggers when tokens are transferred, including zero value transfers.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Triggers on any successful call to approve(address spender, uint256 amount).
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
