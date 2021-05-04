import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy-ethers";
import "hardhat-deploy";
import "@symfoni/hardhat-react";
import "hardhat-typechain";
import "@typechain/ethers-v5";



const config: HardhatUserConfig = {
  solidity: "0.7.3",
  react: {
    providerPriority: ["web3modal", "hardhat"],
  },
  defaultNetwork: "ropsten",
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/310967b8570b43659180bfbc81452dbb',
    },
    hardhat: {
      "inject": false, // optional. If true, it will EXPOSE your mnemonic in your frontend code. Then it would be available as an "in-page browser wallet" / signer which can sign without confirmation.
      "accounts": {
        "mnemonic": "test test test test test test test test test test test junk" // test test test test test test test test test test test junk
      },
      chainId: 31337
    }
  }
};
export default config;
