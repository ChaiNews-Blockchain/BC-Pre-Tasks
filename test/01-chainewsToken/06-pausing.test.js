const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Pausing Tests:", function () {
  let ChainewsToken, chainewsToken, owner, addr1, addr2;

  beforeEach(async function () {

    ChainewsToken = await ethers.getContractFactory("ChainewsToken");
    
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    chainewsToken = await ChainewsToken.deploy(owner.address);
    
    await chainewsToken.waitForDeployment();
    
    decimal = await chainewsToken.decimals();

  });


it("[Transfer Pause Test]: Should pause the token and prevent transfers while paused", async function () {

    //Transfer amount
    const transferAmount = ethers.parseUnits("50",decimal); 

    //Expected revert message
    const expcRevertMsg = "Token is paused"

    // Pause the token
    await chainewsToken.pause();

    // Attempt to transfer tokens while the token is paused and expect it to be reverted
    await expect(chainewsToken.transfer(addr1.address, transferAmount)).to.be.reverted;

    try {
      await chainewsToken.transfer(addr1.address, transferAmount);
    } catch (error) {

      // Ensure the error message contains the custom error identifier
      expect(error.message).to.include(expcRevertMsg);
    }
  })


 it("[Transfer Unpause Test]: Should unpause the token and allow transfers once unpaused", async function () {
    //Transfer amount
    const transferAmount = ethers.parseUnits("50",decimal); 

    //Expected revert message
    const expcRevertMsg = "Token is paused"

    // Pause the token
    await chainewsToken.pause();

    // Attempt to transfer tokens while the token is paused and expect it to be reverted
    await expect(chainewsToken.transfer(addr1.address, transferAmount)).to.be.reverted;

    try {
      await chainewsToken.transfer(addr1.address, transferAmount);
    } catch (error) {

      // Ensure the error message contains the custom error identifier
      expect(error.message).to.include(expcRevertMsg);
    }

  // Unpause the token
  await chainewsToken.unpause();

  // Attempt to transfer tokens after unpausing and expect it to succeed
  await expect(chainewsToken.transfer(addr1.address, transferAmount)).to.not.be.reverted;

  });



it("[Minting When Paused Test]: Should not allow minting tokens when paused", async function () {
    // Define the mint amount
    const mintAmount = ethers.parseUnits("100", decimal);

    // Pause the contract
    await chainewsToken.pause();

    // Attempt to mint tokens and expect it to be reverted
    await expect(chainewsToken.mint(owner.address, mintAmount)).to.be.revertedWith("Token is paused");
});

it("[Burning When Paused Test]: Should not allow burning tokens when paused", async function () {
    // Define the burn amountcd
    const burnAmount = ethers.parseUnits("100", decimal);

    // Pause the contract
    await chainewsToken.pause();

    // Attempt to burn tokens and expect it to be reverted
    await expect(chainewsToken.burn(burnAmount)).to.be.revertedWith("Token is paused");
});


});