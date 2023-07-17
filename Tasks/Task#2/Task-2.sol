// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract ApartmanYonetTask2 {

    address public administor;
    constructor() {
        administor = msg.sender;
    }
    struct aidat {
        uint payAmount;
        uint payDate;
        bool isPaid;
    }

    event rentPaid(address indexed resident, uint rent);
    event rentWithdraw(address indexed resident, uint rent);

    mapping(address => aidat) payList;

    function odemeYap() public payable {
        require(!payList[msg.sender].isPaid, "Already paid.");

        uint miktar = msg.value;
        payList[msg.sender] = aidat(miktar, block.timestamp, true);
        emit rentPaid(msg.sender, miktar);
    }
    function sonOdemeTarihiniSorgula(address _res) public view returns (uint) {
        return payList[_res].payDate;
    }

    function birikenAidatlariCek() public onlyAdministor {

        require(payList[msg.sender].isPaid, "Not paid yet.");

        uint miktar = payList[msg.sender].payAmount;
        payList[msg.sender].payAmount = 0;

        emit rentWithdraw(msg.sender, miktar);
        payable(msg.sender).transfer(miktar);
    }

    modifier onlyAdministor() {
        require(msg.sender == administor, "Only administor can do this transaction.");
        _;
    }
}
/*
Task #2
 Bir apartman yöneticisi aylık aidatları toplamak için bir akıllı kontrat yazmak istiyor. Bu kontratı yazmanız beklenmektedir:
 Apartman sakinleri için ödeme, apartman yöneticisi için bir apartman sakinin en son ödeme yaptığı tarihi sorgulama ve biriken aidatları kendi hesabına çekme özelllikleri olmalıdır.
 Ayrıca ödeme ve çekim işlemleri için eventler oluşturup bunu ilgili fonksiyonlarda emit yapmanız beklenmektedir.
 Son olaraki kodlarınızı kendi branchinize pushlayın
 */