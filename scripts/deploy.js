const { ethers } = require("hardhat")

async function main() {
    const dapp = await ethers.getContractFactory("ChainewsDapp")
    const Dapp = await dapp.deploy('0x03A92D9Be3710447b9A8EF0b825c2aE8DBCe0A94')
    await Dapp.deployed()
    console.log(`Dapp deployed to: ${Dapp.address}`)

    // const token = await ethers.getContractFactory("DemoToken")
    // const Token = await token.deploy()
    // await Token.deployed().then(async()=>{
    //     const address = Token.address 
    //     const dapp = await ethers.getContractFactory("ChainewsDapp")
    //     const Dapp = await dapp.deploy(address)
    //     await Dapp.deployed()
    //     console.log(`Dapp deployed to: ${Dapp.address}`)
    // })
    // console.log(`Token deployed to: ${Token.address}`)
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