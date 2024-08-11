const { expect } = require("chai");
const { ethers } = require("hardhat");



describe("\n\n\t\t___Rep Token Smart Contract Tests___\n\nInıtialization Tests:", function () {

  let RepToken, repToken, owner, addr1, addr2;

  beforeEach(async function () {

    RepToken = await ethers.getContractFactory("RepToken");
    
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    repToken = await RepToken.deploy(owner.address);
    
    await repToken.waitForDeployment();
    
    decimal = await repToken.decimals();

  });


  it("[Owner Test]: Should set the right owner", async function () {
    // Retrieve the expected owner address
    const expectedOwnerAddress = owner.address;

    // Retrieve the actual owner address from the contract
    const actualOwnerAddress = await repToken.owner();

    // Assert that the actual owner address matches the expected owner address
    expect(actualOwnerAddress).to.equal(expectedOwnerAddress);
  });


  it("[Assign Supply Test]: Should assign the total supply of tokens to the owner", async function () {
    // Retrieve the total supply of tokens from the contract
    const totalSupply = await repToken.totalSupply();

    // Retrieve the owner's balance from the contract
    const ownerBalance = await repToken.balanceOf(owner.address);

    // Assert that the owner's balance is equal to the total supply of tokens
    expect(ownerBalance).to.equal(totalSupply);
  });

});