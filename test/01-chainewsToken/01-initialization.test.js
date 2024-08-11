const { expect } = require("chai");
const { ethers } = require("hardhat");



describe("\n\n\t\t___Chainnews Token Smart Contract Tests___\n\nInıtialization Tests:", function () {

  let ChainewsToken, chainewsToken, owner, addr1, addr2;

  beforeEach(async function () {

    ChainewsToken = await ethers.getContractFactory("ChainewsToken");
    
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    chainewsToken = await ChainewsToken.deploy(owner.address);
    
    await chainewsToken.waitForDeployment();
    
    decimal = await chainewsToken.decimals();

  });


  it("[Owner Test]: Should set the right owner", async function () {
    // Retrieve the expected owner address
    const expectedOwnerAddress = owner.address;

    // Retrieve the actual owner address from the contract
    const actualOwnerAddress = await chainewsToken.owner();

    // Assert that the actual owner address matches the expected owner address
    expect(actualOwnerAddress).to.equal(expectedOwnerAddress);
  });


  it("[Assign Supply Test]: Should assign the total supply of tokens to the owner", async function () {
    // Retrieve the total supply of tokens from the contract
    const totalSupply = await chainewsToken.totalSupply();

    // Retrieve the owner's balance from the contract
    const ownerBalance = await chainewsToken.balanceOf(owner.address);

    // Assert that the owner's balance is equal to the total supply of tokens
    expect(ownerBalance).to.equal(totalSupply);
  });

});