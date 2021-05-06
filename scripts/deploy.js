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

  // const Panthera = await ethers.getContractFactory("Panthera");
  // const pantheraToken = await Panthera.deploy();
  //
  // console.log("Token address:", pantheraToken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
