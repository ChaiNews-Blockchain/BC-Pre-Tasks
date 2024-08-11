const { network, ethers } = require("hardhat");

module.exports = async (hre) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    try {
  

        const chainewsToken = await deploy("ChainewsToken", { 
            from: deployer,
            log: true,
            args: [deployer],
            waitConfirmations: chainId === 31337 ? 1 : 6, 
        });

        log(`ChainewsToken deployed at ${chainewsToken.address}\n\n`);
    } catch (error) {
        log(`Deployment failed: ${error.message}\n\n`);
    }
};

module.exports.tags = ["all", "chainewsToken"];
