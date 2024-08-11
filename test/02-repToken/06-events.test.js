const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Events Tests: ", function () {
  let RepToken, repToken, owner, addr1, addr2;

  beforeEach(async function () {

    RepToken = await ethers.getContractFactory("RepToken");
    
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    repToken = await RepToken.deploy(owner.address);
    
    await repToken.waitForDeployment();
    
    decimal = await repToken.decimals();

  });

it("[Check Events Test]: Should emit correct events during transactions", async function () {
    // Define the transfer amount
    const transferAmount = ethers.parseUnits("50", decimal);

    // Transfer tokens and expect the Transfer event to be emitted
    await expect(repToken.transfer(addr1.address, transferAmount))
        .to.emit(repToken, 'Transfer')
        .withArgs(owner.address, addr1.address, transferAmount);

    // Approve tokens and expect the Approval event to be emitted
    await expect(repToken.approve(addr1.address, transferAmount))
        .to.emit(repToken, 'Approval')
        .withArgs(owner.address, addr1.address, transferAmount);


    // Transfer ownership and expect the OwnershipTransferred event to be emitted
    await expect(repToken.transferOwnership(addr1.address))
        .to.emit(repToken, 'OwnershipTransferred')
        .withArgs(owner.address, addr1.address);
});

});