import "dotenv/config"
import { HardhatUserConfig } from "hardhat/config"
import "@typechain/hardhat"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-ethers"
import "hardhat-deploy"
import "hardhat-etherscan-abi"
import "hardhat-dependency-compiler"

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const BLOCK_NUMBER = process.env.BLOCK_NUMBER
const MNEMONIC = process.env.MNEMONIC

if (!ALCHEMY_API_KEY) throw new Error("ALCHEMY_API_KEY_NOT_FOUND")

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545",
        },
        hardhat: {
            chainId: 1,
            forking: {
                url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
                blockNumber: parseInt(BLOCK_NUMBER),
                enabled: true,
            },
        },
        ropsten: {
            url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: {
                mnemonic: MNEMONIC,
            },
        },
    },
    dependencyCompiler: {
        paths: [],
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        wallet: {
            default: 0,
        },
        deployer: {
            default: 1,
        },
        owner: {
            default: 1,
        },
        receiver: {
            default: 2,
        },
        recipient: {
            default: 2,
        },
        account: {
            default: 3,
        },
        taker: {
            default: 4,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.7.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.4",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    paths: {
        sources: "./contracts",
        tests: "./tests",
        cache: "./cache",
        artifacts: "./artifacts",
    },
}

export default config
