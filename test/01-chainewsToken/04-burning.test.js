const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Burning Tests:", function () {
  let ChainewsToken, chainewsToken, owner, addr1, addr2;

  beforeEach(async function () {

    ChainewsToken = await ethers.getContractFactory("ChainewsToken");
    
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    chainewsToken = await ChainewsToken.deploy(owner.address);
    
    await chainewsToken.waitForDeployment();
    
    decimal = await chainewsToken.decimals();

  });



  it("[Burn Test]: Should allow owner to burn their own tokens", async function () {
    // Burn 1000 tokens
    const burnAmount = ethers.parseUnits("1000",decimal);

    // Owner burns 1000 tokens
    await chainewsToken.connect(owner).burn(burnAmount);

    // Check the total supply and owner's balance
    const totalSupply = await chainewsToken.totalSupply();
    const ownerBalance = await chainewsToken.balanceOf(owner.address);


    // The total supply should be reduced by 1000 tokens
    expect(totalSupply).to.equal(ethers.parseUnits("999000", decimal));
    expect(ownerBalance).to.equal(ethers.parseUnits("999000", decimal));
  });


  it("[Burn From Test]: Should allow burning tokens from an approved account", async function () {
    // Owner approves addr1 to burn 50 tokens on their behalf
    await chainewsToken.approve(addr1.address, ethers.parseUnits("50",decimal));

    // addr1 burns 50 tokens from owner's balance
    await chainewsToken.connect(addr1).burnFrom(owner.address, ethers.parseUnits("50",decimal));

    // Check the total supply and owner's balance
    const totalSupply = await chainewsToken.totalSupply();
    const ownerBalance = await chainewsToken.balanceOf(owner.address);

    expect(totalSupply).to.equal(ethers.parseUnits("999950"),decimal);
    expect(ownerBalance).to.equal(ethers.parseUnits("999950"),decimal);
  });



});