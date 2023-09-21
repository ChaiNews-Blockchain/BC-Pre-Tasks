require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

const account_1 = process.env.PRIVATE_KEY_1;
const account_2 = process.env.PRIVATE_KEY_2;


module.exports = {
    solidity: "0.8.9",
    defaultNetwork: "goerli",
    networks: {
      sepolia: {
        url: `https://eth-sepolia.g.alchemy.com/v2/vcbcl5J3wd1EAIpXEVGLzuhZ8EiSsghi`,
        accounts: [account_1,account_2]
      },
      goerli: {
        url: `https://eth-goerli.g.alchemy.com/v2/3Gd7HXZEQILrdB7yMKzj0rVZSKE1yvBS`,
        accounts: [account_1,account_2],
        gas: 10000000
      }
    },
    mocha: {
      timeout:1000000
    }
};