/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers")

const { METAMASK_PRIVATE_KEY, ALCHEMY_API_URL } = process.env

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    mumbai: {
      url: ALCHEMY_API_URL,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`]
    }
  }
};
