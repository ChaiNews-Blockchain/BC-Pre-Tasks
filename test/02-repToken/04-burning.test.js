const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Burning Tests:", function () {
  let RepToken, repToken, owner, addr1, addr2;

  beforeEach(async function () {

    RepToken = await ethers.getContractFactory("RepToken");
    
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    repToken = await RepToken.deploy(owner.address);
    
    await repToken.waitForDeployment();
    
    decimal = await repToken.decimals();

  });



  it("[Burn Test]: Should allow owner to burn their own tokens", async function () {
    // Burn 1000 tokens
    const burnAmount = ethers.parseUnits("1000",decimal);

    // Owner burns 1000 tokens
    await repToken.connect(owner).burn(burnAmount);

    // Check the total supply and owner's balance
    const totalSupply = await repToken.totalSupply();
    const ownerBalance = await repToken.balanceOf(owner.address);


    // The total supply should be reduced by 1000 tokens
    expect(totalSupply).to.equal(ethers.parseUnits("999000", decimal));
    expect(ownerBalance).to.equal(ethers.parseUnits("999000", decimal));
  });


  it("[Burn From Test]: Should allow burning tokens from an approved account", async function () {
    // Owner approves addr1 to burn 50 tokens on their behalf
    await repToken.approve(addr1.address, ethers.parseUnits("50",decimal));

    // addr1 burns 50 tokens from owner's balance
    await repToken.connect(addr1).burnFrom(owner.address, ethers.parseUnits("50",decimal));

    // Check the total supply and owner's balance
    const totalSupply = await repToken.totalSupply();
    const ownerBalance = await repToken.balanceOf(owner.address);

    expect(totalSupply).to.equal(ethers.parseUnits("999950"),decimal);
    expect(ownerBalance).to.equal(ethers.parseUnits("999950"),decimal);
  });



});