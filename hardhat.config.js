require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

const PRIVATE_KEY = process.env.PRIVATE_KEY;


module.exports = {
    solidity: "0.8.9",
    defaultNetwork: "sepolia",
    networks: {
      sepolia: {
        url: `https://eth-sepolia.g.alchemy.com/v2/vcbcl5J3wd1EAIpXEVGLzuhZ8EiSsghi`,
        accounts: [`${PRIVATE_KEY}`]
      }
    }
};