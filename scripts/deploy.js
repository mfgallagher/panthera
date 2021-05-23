// This is the function used to deploy the contract. Note that every time that
// the contract is deployed, in order to use that instance of the contract you
// will need to update the contract address and ABI in the config file
// called by the UserWallet component. Whoever is logged in to deploy this
// file will have control over the total supply of tokens. We recommend that
// this entity use the Infura and MetaMask account that we set up, and be a
// trustworthy member of the Middlebury community. To get the private keys for
// these accounts, please reach out to the owners of the repository.



async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Granola = await ethers.getContractFactory("Granola");
  const granolaToken = await Granola.deploy();

  console.log("Token address:", granolaToken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
