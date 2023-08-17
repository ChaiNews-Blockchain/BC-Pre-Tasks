// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract ApartmanYonetTask2 {

    address public administor;
    uint public aidatmiktar;
    uint public kasaMiktar;

    constructor() {
        administor = msg.sender;
    }

    struct aidat {
        uint payAmount;
        uint payDate;
    }

    event rentPaid(address indexed resident, uint rent);
    event rentWithdraw(address indexed resident, uint rent);

    mapping(address => aidat[]) payList;

    function setAidatMiktar(uint _miktar) public onlyAdministor{
        aidatmiktar = _miktar;
    }

    function odemeYap() public payable {
        require(msg.value == aidatmiktar, "Lutfen dogru miktarda odeme yapin.");
        
        uint miktar = msg.value;        uint payDate = block.timestamp;    kasaMiktar += miktar;

        aidat memory newPayment = aidat(miktar, payDate);
        payList[msg.sender].push(newPayment);
        
        emit rentPaid(msg.sender, miktar);
    }

    function sonOdemeTarihiniSorgula(address _res) public view returns (uint) {
    require(_res != address(0), "Boyle bir adres bulunamadi.");
    
    uint numberOfPayments = payList[_res].length;
        if (numberOfPayments > 0) {
            aidat[] storage payments = payList[_res];

            return payments[numberOfPayments - 1].payDate;
        } else {
            revert("Odeme yapilmadi");
        }
    }

    function birikenAidatlariCek() public onlyAdministor {

        require(kasaMiktar < 0, "Odeme yapilmadi.");


        emit rentWithdraw(msg.sender, kasaMiktar);
        payable(msg.sender).transfer(kasaMiktar);
        kasaMiktar = 0 ;
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