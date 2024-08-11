const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Transfer Tests:", function () {
  let ChainewsToken, chainewsToken, owner, addr1, addr2;

  beforeEach(async function () {

    ChainewsToken = await ethers.getContractFactory("ChainewsToken");
    
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    chainewsToken = await ChainewsToken.deploy(owner.address);
    
    await chainewsToken.waitForDeployment();
    
    decimal = await chainewsToken.decimals();

  });

  it("[Transfer Test]: Should transfer tokens between accounts", async function () {
    // Define transfer amount
    const transferAmount = ethers.parseUnits("50",decimal);

    // Transfer tokens from owner to addr1
    await chainewsToken.transfer(addr1.address, transferAmount);

    // Retrieve addr1's balance from the contract
    const addr1Balance = await chainewsToken.balanceOf(addr1.address);

    // Assert that addr1's balance is equal to the transfer amount
    expect(addr1Balance).to.equal(transferAmount);

    // Transfer tokens from addr1 to addr2
    await chainewsToken.connect(addr1).transfer(addr2.address, transferAmount);

    // Retrieve addr2's balance from the contract
    const addr2Balance = await chainewsToken.balanceOf(addr2.address);

    // Assert that addr2's balance is equal to the transfer amount
    expect(addr2Balance).to.equal(transferAmount);
  });



  it("[Zero Address Test]: Should not allow transfers to the zero address", async function () {
    // Define the zero address
    const zeroAddress = ethers.ZeroAddress;

    //Transfer amount
    const transferAmount = ethers.parseUnits("50",decimal); 

    //Expected revert message
    const expcRevertMsg = 'Transfer to the zero address'

    // Attempt to transfer tokens to the zero address and capture the error
    await expect(chainewsToken.transfer(zeroAddress, transferAmount))
      .to.be.revertedWith(expcRevertMsg)
      .catch((error) => {
        // Ensure the error message contains the custom error identifier
        expect(error.message).to.include(expcRevertMsg);
      });
  });


  it("[Transfer Zero Tokens Test]: Should allow transferring zero amount tokens", async function () {
      // Transfer zero tokens from owner to addr1
      await chainewsToken.transfer(addr1.address, ethers.parseUnits("0", decimal));

      // Retrieve the balances of owner and addr1
      const ownerBalance = await chainewsToken.balanceOf(owner.address);
      const addr1Balance = await chainewsToken.balanceOf(addr1.address);

      // Assert that the balances remain unchanged
      expect(ownerBalance).to.equal(await chainewsToken.totalSupply());
      expect(addr1Balance).to.equal(ethers.parseUnits("0", decimal));
  });


  it("[Transfer To Self Test]: Should allow transferring tokens to self", async function () {
      // Define the transfer amount
      const transferAmount = ethers.parseUnits("100", decimal);

      // Transfer tokens from owner to owner
      await chainewsToken.transfer(owner.address, transferAmount);

      // Retrieve the balance of owner
      const ownerBalance = await chainewsToken.balanceOf(owner.address);

      // Assert that the balance remains unchanged
      expect(ownerBalance).to.equal(await chainewsToken.totalSupply());
  });


});