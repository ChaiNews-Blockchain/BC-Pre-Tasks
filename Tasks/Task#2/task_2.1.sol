pragma solidity ^0.8.9;

contract Management {
    address public manager;
    uint256 public monthlyFee;
    uint256 public totalCollectedFees; // Toplam biriken aidat miktarını tanımladım


    struct Payment {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => Payment[]) public payments;
    
    event PaymentMade(address indexed payer, uint256 amount, uint256 timestamp);
    event Withdrawal(address indexed manager, uint256 amount, uint256 timestamp);

    modifier onlyManager() {
        require(msg.sender == manager, "You are not an authorized user.");
        _;
    }
    
    constructor(uint256 _monthlyFee) {
        manager = msg.sender;
        monthlyFee = _monthlyFee;
    }
    
    function makePayment() external payable {
        require(msg.value == monthlyFee, "Incorrect payment amount.");
        
        Payment memory newPayment = Payment({
            amount: msg.value,
            timestamp: block.timestamp
        });
        payments[msg.sender].push(newPayment);

        // Toplam biriken aidat miktarını güncelleme
        totalCollectedFees += msg.value;
        
        
        emit PaymentMade(msg.sender, msg.value, block.timestamp);
    }
    
    function getLastPaymentTimestamp(address payer) external view returns (uint256) {
        uint256 paymentCount = payments[payer].length;
        require(paymentCount > 0, "No payments found for the given address.");
        
        return payments[payer][paymentCount - 1].timestamp;
    }
    
    function withdrawFunds(uint256 amount) external onlyManager {
        require(amount <= address(this).balance, "Insufficient contract balance.");
        
        payable(manager).transfer(amount);
        totalCollectedFees -= amount; //Ödeme yapma
        
        emit Withdrawal(manager, amount, block.timestamp);
    }
}
