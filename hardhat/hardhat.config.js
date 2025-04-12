require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL, // or Alchemy
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: "FW83KZU9BFBFX873V4CVUKKG6WHMXTFDY7", // Use a single dev key
  },
};
