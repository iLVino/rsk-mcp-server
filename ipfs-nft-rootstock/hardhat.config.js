require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    rootstockTestnet: {
      url: process.env.ROOTSTOCK_TESTNET_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};