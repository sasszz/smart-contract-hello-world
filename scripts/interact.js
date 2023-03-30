require("dotenv").config();
const { METAMASK_PRIVATE_KEY, ALCHEMY_API_KEY, CONTRACT_ADDRESS } = process.env;

const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json"); // smart contract abi

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "maticmum"),
  ALCHEMY_API_KEY
);

// Signer
const signer = new ethers.Wallet(METAMASK_PRIVATE_KEY, alchemyProvider);

// Contract Instance
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);

async function main() {
  const message = await helloWorldContract.message();
  console.log(`Message is ${message}`);

  console.log("Updating message...");
  const tx = await helloWorldContract.update("woah X.X");
  await tx.wait();

  const newMessage = await helloWorldContract.message();
  console.log(`New message is ${newMessage}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
