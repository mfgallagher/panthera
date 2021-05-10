import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy-ethers";
import "hardhat-deploy";
import "@symfoni/hardhat-react";
import "hardhat-typechain";
import "@typechain/ethers-v5";

const INFURA_API_KEY = {process.env.REACT_APP_INFURA_API_KEY};

const ROPSTEN_PRIVATE_KEY = {process.env.REACT_APP_ROPSTEN_PRIVATE_KEY};


const config: HardhatUserConfig = {
  solidity: "0.7.3",
  react: {
    providerPriority: ["web3modal", "hardhat"],
  },
  defaultNetwork: "ropsten",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
export default config;
