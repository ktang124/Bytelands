
const hre = require("hardhat");

async function main() {

  const ChickFillets = await hre.ethers.getContractFactory("ChickFillets");
  const cfas = await ChickFillets.deploy();

  await cfas.deployed();

  console.log("My NFT deployed to:", cfas.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });