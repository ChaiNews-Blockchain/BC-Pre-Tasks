const { ethers } = require("hardhat")

async function main() {
  
    const token = await ethers.getContractFactory("DemoToken")
    const Token = await token.deploy()
    // const airdrop = await ethers.getContractFactory("Airdrop",[])
    // const Airdrop = await token.deploy()

    await Token.deployed().then(async()=>{
        const address = Token.address
        const airdrop = await ethers.getContractFactory("Airdrop")
        const Airdrop = await airdrop.deploy(address)
        await Airdrop.deployed()
        console.log(`Airdrop deployed to : ${Airdrop.address}`)
    })
    console.log(`Token deployed to: "${Token.address}"`)
}

const runMain = async () => {
    try {
        await main()
        process.exit(0) // emit the exit event that ends all tasks immediately even if there still are asynchronous operations not been done. The shell that executed node should see the exit code as 0.
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain()