const { expect } = require('chai')
const { ethers } = require('hardhat')

describe("Dapp Contract", function (){
    let owner, user1;
    let Token, token;
    let Dapp, dapp;
    let bytes32 = ethers.utils.formatBytes32String('text')
    before(async function () {
        [owner,user1] = await ethers.getSigners();

        Token = await ethers.getContractFactory("DemoToken");
        token = await Token.connect(owner).deploy();
        
        Dapp = await ethers.getContractFactory("ChainewsDapp");
        dapp = await Dapp.connect(owner).deploy(token.address);

    })
    it("Deploys the contracts", async function() {
        expect(token.address).to.not.be.undefined;
        expect(dapp.address).to.not.be.undefined;
    })

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
          expect(await token.owner()).to.equal(owner.address);
          expect(await dapp.owner()).to.equal(owner.address);
        });
    
        it("Should assign the total supply of tokens to the owner", async function () {
          const ownerBalance = await token.balanceOf(owner.address);
          expect(await token.totalSupply()).to.equal(ownerBalance);
        });
      });

    describe("Add balance", async function(){
        before(async function(){
            const addBalance = await token.transfer(dapp.address,ethers.utils.parseEther('1000'));
            await addBalance.wait();
        })
        it("Adds token balance to dapp contract", async function() {
            let contractBalance = await token.balanceOf(dapp.address);
            expect(ethers.utils.formatEther(contractBalance)).to.be.equal('1000.0');
        })
    })

    describe("Contract Functions", async function(){
        let news1, user;
        before (async function() {
            const addNews = await dapp.connect(owner).addNews('url1',user1.address,bytes32);
            await addNews.wait();
            
            const updateNews = await dapp.connect(owner).updateNews(1,500);
            await updateNews.wait();

            const updateUser = await dapp.connect(owner).updateUser(user1.address,500);
            await updateUser.wait();

            news1 = await dapp.connect(owner).news(1);  
            user = await dapp.connect(owner).users(user1.address);  
        })
        it("Fails with wrong parameters", async function() {
            await expect( dapp.connect(owner).addNews(1,0,2)).to.be.reverted;
       })
        it("News and users added", async function() {
            expect(await dapp.currentNewsId()).to.equal(2);
            expect(await dapp.currentUserId()).to.equal(2);
        })
        it("Updates news1", async function() {
            expect(news1.id).to.be.equal(1);
            expect(news1.owner).to.be.equal(user1.address);
            expect(news1.url).to.be.equal('url1');
            expect(news1.hash).to.be.equal(bytes32);
            expect(news1.points).to.be.equal(500);
        })
        it("Updates user", async function() {
            expect(user.id).to.be.equal(1);
            expect(user.allPoints).to.be.equal(500);
            expect(user.unspentPoints).to.be.equal(500);
        })
    })
    describe("Spends points", async function(){
        let userStruct;
        before(async function(){
            const spendUserPoints = await dapp.connect(owner).spendPoints(user1.address,300);
            await spendUserPoints.wait();
            userStruct = await dapp.connect(owner).users(user1.address);
        })
        it("Spends user's points", async function() {
            expect(userStruct.id).to.be.equal(1);
            expect(userStruct.allPoints).to.be.equal(500);
            expect(userStruct.unspentPoints).to.be.equal(200);
        })
        it("Drops tokens to users account", async function() {
            let userBalance = await token.balanceOf(user1.address);
            expect(ethers.utils.formatEther(userBalance)).to.be.equal('30.0');
        })
    })
});
