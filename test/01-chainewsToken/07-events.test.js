const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Events Tests: ", function () {
  let ChainewsToken, chainewsToken, owner, addr1, addr2;

  beforeEach(async function () {

    ChainewsToken = await ethers.getContractFactory("ChainewsToken");
    
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    chainewsToken = await ChainewsToken.deploy(owner.address);
    
    await chainewsToken.waitForDeployment();
    
    decimal = await chainewsToken.decimals();

  });

it("[Check Events Test]: Should emit correct events during transactions", async function () {
    // Define the transfer amount
    const transferAmount = ethers.parseUnits("50", decimal);

    // Transfer tokens and expect the Transfer event to be emitted
    await expect(chainewsToken.transfer(addr1.address, transferAmount))
        .to.emit(chainewsToken, 'Transfer')
        .withArgs(owner.address, addr1.address, transferAmount);

    // Approve tokens and expect the Approval event to be emitted
    await expect(chainewsToken.approve(addr1.address, transferAmount))
        .to.emit(chainewsToken, 'Approval')
        .withArgs(owner.address, addr1.address, transferAmount);

    // Pause the contract and expect the Paused event to be emitted
    await expect(chainewsToken.pause())
        .to.emit(chainewsToken, 'Paused')
        .withArgs(owner.address);

    // Unpause the contract and expect the Unpaused event to be emitted
    await expect(chainewsToken.unpause())
        .to.emit(chainewsToken, 'Unpaused')
        .withArgs(owner.address);

    // Transfer ownership and expect the OwnershipTransferred event to be emitted
    await expect(chainewsToken.transferOwnership(addr1.address))
        .to.emit(chainewsToken, 'OwnershipTransferred')
        .withArgs(owner.address, addr1.address);
});

});