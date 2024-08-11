const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Minting Tests:", function () {
  let RepToken, repToken, owner, addr1, addr2;

  beforeEach(async function () {

    RepToken = await ethers.getContractFactory("RepToken");
    
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    repToken = await RepToken.deploy(owner.address);
    
    await repToken.waitForDeployment();
    
    decimal = await repToken.decimals();

  });


  it("[Mint Test]: Should allow owner to mint tokens", async function () {
    // Define the mint amount
    const mintAmount = ethers.parseUnits("1000",decimal);

    // Mint tokens to addr3
    await repToken.mint(addr3.address, mintAmount);

    // Retrieve addr3's balance from the contract
    const addr3Balance = await repToken.balanceOf(addr3.address);

    // Assert that addr3's balance is equal to the mint amount
    expect(addr3Balance).to.equal(mintAmount);
  });




});