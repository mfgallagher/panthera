import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy-ethers";
import "hardhat-deploy";
import "@symfoni/hardhat-react";
import "hardhat-typechain";
import "@typechain/ethers-v5";



const config: HardhatUserConfig = {
  solidity: "0.6.8",
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
export default config;
