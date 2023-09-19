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
        expect(token.address).to.not.be.undefined;
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

    describe("Contract Functions", async function(){
        let news1, ownerStruct, news2, userStruct;
        before (async function() {
            const addNews = await dapp.connect(owner).addNews('url1',owner.address,bytes32);
            await addNews.wait();
            
            const updateNews1 = await dapp.connect(owner).updateNews(1,200);
            await updateNews1.wait();

            const updateOwner = await dapp.connect(owner).updateUser(owner.address,200);
            await updateOwner.wait();

            const addNews2 = await dapp.connect(owner).addNews('url2',user1.address,bytes32);
            await addNews2.wait();

            const updateNews2 = await dapp.connect(owner).updateNews(2,350);
            await updateNews2.wait();

            const updateUser = await dapp.connect(owner).updateUser(user1.address,350);
            await updateUser.wait();

            const spendUserPoints = await dapp.connect(owner).spendPoints(user1.address,300)
            await spendUserPoints.wait()

            news1 = await dapp.connect(owner).news(1);
            ownerStruct = await dapp.connect(owner).users(owner.address)

            news2 = await dapp.connect(owner).news(2);
            userStruct = await dapp.connect(owner).users(user1.address)
            
        })
        
        it("News and users added", async function() {
            expect(await dapp.currentNewsId()).to.equal(3);
            expect(await dapp.currentUserId()).to.equal(3);
        })
        it("Fails with wrong parameters", async function() {
             await expect( dapp.connect(owner).addNews(1,0,2)).to.be.reverted;
        })
        it("Updates news1", async function() {
            expect(news1.id).to.be.equal(1);
            expect(news1.owner).to.be.equal(owner.address);
            expect(news1.url).to.be.equal('url1');
            expect(news1.hash).to.be.equal(bytes32);
            expect(news1.points).to.be.equal(200);
        })
        it("Updates owner", async function() {
            expect(ownerStruct.id).to.be.equal(1);
            expect(ownerStruct.allPoints).to.be.equal(200);
            expect(ownerStruct.unspentPoints).to.be.equal(200);
        })
        it("Updates news2", async function() {
            expect(news2.id).to.be.equal(2);
            expect(news2.owner).to.be.equal(user1.address);
            expect(news2.url).to.be.equal('url2');
            expect(news2.hash).to.be.equal(bytes32);
            expect(news2.points).to.be.equal(350);
        })
        it("Spends user's points", async function() {
            expect(userStruct.id).to.be.equal(2);
            expect(userStruct.allPoints).to.be.equal(350);
            expect(userStruct.unspentPoints).to.be.equal(50);
        })
        it("Drops tokens to users account", async function() {
            let userBalance = await token.balanceOf(user1.address);
            await userBalance.wait();
            expect(ethers.utils(userBalance)).to.be.equal(300/10);
        })
    })

});
