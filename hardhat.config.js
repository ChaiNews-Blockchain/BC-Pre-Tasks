require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

const PRIVATE_KEY = process.env.PRIVATE_KEY;


module.exports = {
    solidity: "0.8.9",
    defaultNetwork: "goerli",
    networks: {
      sepolia: {
        url: `https://eth-sepolia.g.alchemy.com/v2/vcbcl5J3wd1EAIpXEVGLzuhZ8EiSsghi`,
        accounts: [`${PRIVATE_KEY}`,'922a22ce57256389552299b8f811acca70fab425103106e883f4bbe7ed0b94fb']
      },
      goerli: {
        url: `https://eth-goerli.g.alchemy.com/v2/3Gd7HXZEQILrdB7yMKzj0rVZSKE1yvBS`,
        accounts: [`${PRIVATE_KEY}`,'922a22ce57256389552299b8f811acca70fab425103106e883f4bbe7ed0b94fb'],
        gas: 6000000
      }
    },
    mocha: {
      timeout:1000000
    }
};