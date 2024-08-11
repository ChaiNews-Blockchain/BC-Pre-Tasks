const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Allowance Tests:", function () {
  let RepToken, repToken, owner, addr1, addr2;

  beforeEach(async function () {

    RepToken = await ethers.getContractFactory("RepToken");
    
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    repToken = await RepToken.deploy(owner.address);
    
    await repToken.waitForDeployment();
    
    decimal = await repToken.decimals();

  });


	it("[Approval Test]: Should correctly set allowance for a spender", async function () {
	    // Define the allowance amount
	    const allowanceAmount = ethers.parseUnits("100", decimal);

	    // Approve addr1 to spend allowanceAmount on behalf of the owner
	    await repToken.approve(addr1.address, allowanceAmount);

	    // Retrieve the allowance for addr1 from the owner's account
	    const allowance = await repToken.allowance(owner.address, addr1.address);

	    // Assert that the allowance is correctly set
	    expect(allowance).to.equal(allowanceAmount);
	});

	it("[Allowance Reduction Test]: Should correctly reduce allowance after transferFrom", async function () {
	    // Define the initial allowance amount
	    const initialAllowance = Number(ethers.parseUnits("100", decimal).toString());

	    // Define the transfer amount
	    const transferAmount = Number(ethers.parseUnits("50", decimal).toString());

	    // Approve addr1 to spend initialAllowance on behalf of the owner
	    await repToken.approve(addr1.address, ethers.parseUnits("100", decimal));

	    // Transfer tokens from owner to addr2 using addr1's allowance
	    await repToken.connect(addr1).transferFrom(owner.address, addr2.address, ethers.parseUnits("50", decimal));

	    // Retrieve the remaining allowance for addr1 from the owner's account
	    const remainingAllowance = await repToken.allowance(owner.address, addr1.address);

	    // Calculate the expected remaining allowance using JavaScript numbers
	    const expectedRemainingAllowance = initialAllowance - transferAmount;

	    // Assert that the allowance is correctly reduced
	    expect(Number(remainingAllowance.toString())).to.equal(expectedRemainingAllowance);
	});


	it("[Reset Allowance Test]: Should allow changing and resetting the allowance", async function () {
	    // Define the initial allowance amount
	    const initialAllowance = ethers.parseUnits("100", decimal);

	    // Define the new allowance amount
	    const newAllowance = ethers.parseUnits("200", decimal);

	    // Approve addr1 to spend initialAllowance on behalf of the owner
	    await repToken.approve(addr1.address, initialAllowance);

	    // Change the allowance for addr1 to newAllowance
	    await repToken.approve(addr1.address, newAllowance);

	    // Retrieve the updated allowance for addr1 from the owner's account
	    const allowance = await repToken.allowance(owner.address, addr1.address);

	    // Assert that the allowance is correctly updated
    expect(allowance).to.equal(newAllowance);
});

});