require("@nomicfoundation/hardhat-toolbox")
require('hardhat-deploy');

const { privateKey } = require('./secrets.json'); 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    arbitrumSepolia: {
      url: 'https://sepolia-rollup.arbitrum.io/rpc',
      chainId: 421614,
      accounts: [privateKey]
    },
    arbitrumMainnet: {
      url: 'https://arb1.arbitrum.io/rpc',
      chainId: 42161,
      accounts: [privateKey]
    }
  },
  namedAccounts: {
    deployer: {
      default: 0
    },
  },
};
