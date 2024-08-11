const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Minting Tests:", function () {
  let ChainewsToken, chainewsToken, owner, addr1, addr2;

  beforeEach(async function () {

    ChainewsToken = await ethers.getContractFactory("ChainewsToken");
    
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    chainewsToken = await ChainewsToken.deploy(owner.address);
    
    await chainewsToken.waitForDeployment();
    
    decimal = await chainewsToken.decimals();

  });


  it("[Mint Test]: Should allow owner to mint tokens", async function () {
    // Define the mint amount
    const mintAmount = ethers.parseUnits("1000",decimal);

    // Mint tokens to addr3
    await chainewsToken.mint(addr3.address, mintAmount);

    // Retrieve addr3's balance from the contract
    const addr3Balance = await chainewsToken.balanceOf(addr3.address);

    // Assert that addr3's balance is equal to the mint amount
    expect(addr3Balance).to.equal(mintAmount);
  });


  it("[Supply Exceed Test]: Should not allow total supply to exceed the limit by minting.", async function () {
    const maxSupply = await chainewsToken.MAX_SUPPLY();
    const totalSupply = await chainewsToken.totalSupply();

    // Set the minting amount the max supply
    const mintAmount = maxSupply;

    // Try to mint more tokens and expect it to fail
    await expect(chainewsToken.mint(owner.address, mintAmount))
      .to.be.revertedWith("Minting would exceed max supply");
  });


});