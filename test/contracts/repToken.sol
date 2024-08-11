// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IERC20.sol";
import "./interfaces/IERC20Burnable.sol";
import "./interfaces/IOwnable.sol";

contract RepToken is IERC20, IERC20Burnable, IOwnable {

    /**
     * Token name.
     */
    string public name = "RepToken";

    /**
     * Token symbol.
     */
    string public symbol = "REP";

    /**
     * Number of decimals.
     */
    uint8 public decimals = 18;

    /**
     * Total supply of the token.
     */
    uint256 private _totalSupply;

    /**
     * Initial supply.
     */
    uint256 private constant INITIAL_SUPPLY = 1000000 * 10**18;

    /**
     * Balances of accounts.
     */
    mapping(address => uint256) private _balances;

    /**
     * Allowances for accounts.
     */
    mapping(address => mapping(address => uint256)) private _allowances;

    /**
     * Contract owner.
     */
    address private _contractOwner;

    /**
     * @dev Modifier to check if the caller is the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == _contractOwner, "Not the contract owner");
        _;
    }

    /**
     * @dev Constructor that initializes the contract.
     * @param initialOwner Address of the initial owner.
     */
    constructor(address initialOwner) {
        _contractOwner = initialOwner;
        _mint(initialOwner, INITIAL_SUPPLY);  // Initial supply is 0
        emit OwnershipTransferred(address(0), initialOwner);
    }

    // IERC20 implementation

    /**
     * @dev Returns the total supply of tokens.
     */
    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev Returns the balance of a specific account.
     * @param account Address of the account to query.
     */
    function balanceOf(address account) external view override returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev Transfers tokens to a specified address.
     * @param recipient The address to transfer to.
     * @param amount The amount to be transferred.
     */
    function transfer(address recipient, uint256 amount) external override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    /**
     * @dev Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner`.
     * @param tokenOwner The address which owns the funds.
     * @param spender The address which will spend the funds.
     */
    function allowance(address tokenOwner, address spender) external view override returns (uint256) {
        return _allowances[tokenOwner][spender];
    }

    /**
     * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
     * @param spender The address which will spend the funds.
     * @param amount The amount of tokens to be spent.
     */
    function approve(address spender, uint256 amount) external override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    /**
     * @dev Transfers tokens from one address to another.
     * @param sender The address which you want to send tokens from.
     * @param recipient The address which you want to transfer to.
     * @param amount The amount of tokens to be transferred.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
        require(_allowances[sender][msg.sender] >= amount, "RepToken: transfer amount exceeds allowance");
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender] - amount);
        return true;
    }

    // IERC20Burnable implementation

    /**
     * @dev Burns a specific amount of tokens.
     * @param amount The amount of token to be burned.
     */
    function burn(uint256 amount) external override {
        _burn(msg.sender, amount);
    }

    /**
     * @dev Burns a specific amount of tokens from the specified address and decrements allowance.
     * @param account The address to burn tokens from.
     * @param amount The amount of token to be burned.
     */
    function burnFrom(address account, uint256 amount) external override {
        uint256 decreasedAllowance = _allowances[account][msg.sender] - amount;
        _approve(account, msg.sender, decreasedAllowance);
        _burn(account, amount);
    }

    // IOwnable implementation

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() external view override returns (address) {
        return _contractOwner;
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * @param newOwner The address of the new owner.
     */
    function transferOwnership(address newOwner) external override onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        emit OwnershipTransferred(_contractOwner, newOwner);
        _contractOwner = newOwner;
    }

    // Public mint function

    /**
     * @dev Function to mint tokens.
     * @param account The address that will receive the minted tokens.
     * @param amount The amount of tokens to mint.
     */
    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    // Internal functions

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     * @param sender The address to send tokens from.
     * @param recipient The address to transfer to.
     * @param amount The amount of tokens to be transferred.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "Transfer from the zero address");
        require(recipient != address(0), "Transfer to the zero address");

        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }

    /**
     * @dev Creates `amount` tokens and assigns them to `account`, increasing the total supply.
     * @param account The address that will receive the minted tokens.
     * @param amount The amount of tokens to mint.
     */
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "Mint to the zero address");

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the total supply.
     * @param account The address that will have the tokens burned.
     * @param amount The amount of tokens to be burned.
     */
    function _burn(address account, uint256 amount) internal {
        require(account != address(0), "Burn from the zero address");

        _balances[account] -= amount;
        _totalSupply -= amount;
        emit Transfer(account, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `tokenOwner`'s tokens.
     * @param tokenOwner The owner of the tokens.
     * @param spender The spender who will be allowed to spend the tokens.
     * @param amount The amount of tokens to approve.
     */
    function _approve(address tokenOwner, address spender, uint256 amount) internal {
        require(tokenOwner != address(0), "Approve from the zero address");
        require(spender != address(0), "Approve to the zero address");

        _allowances[tokenOwner][spender] = amount;
        emit Approval(tokenOwner, spender, amount);
    }
}
