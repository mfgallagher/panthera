import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy-ethers";
import "hardhat-deploy";
import "@symfoni/hardhat-react";
import "hardhat-typechain";
import "@typechain/ethers-v5";

const INFURA_API_KEY = "310967b8570b43659180bfbc81452dbb"

const ROPSTEN_PRIVATE_KEY = "2bef3d76e0983dd369693da25f4f07a6850dec930118ee623c26ecbedf51b86e"


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
