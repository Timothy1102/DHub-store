const dotenv = require('dotenv');
const path = require('path');
const Web3 = require('web3');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const DHubStoreArtifact = require('../build/contracts/DHubStore.json');
const solc = require('solc');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const provider = process.env.BC_RPC_URL;
const web3 = new Web3(provider);
const myEOA = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(PRIVATE_KEY); // for transaction signing

/**
 * Deploy Smart Contract to testnet
 *
 * @return {string} the address of the deployed smart contract
 */
async function deploySc() {
    console.log('Deploying smart contract to testnet...');
    try {
        const DHubStore = new web3.eth.Contract(DHubStoreArtifact.abi);
        const tx = await DHubStore
            .deploy({ data: DHubStoreArtifact.bytecode, arguments: [] })
            .send({ from: myEOA.address, gas: 5_000_000 });
        const address = tx._address;
        console.log('SAVE THIS INTO .ENV: ', address);

        return address;
    } catch (error) {
        console.log('Error: Could not deploy smart contract.');
        throw error;
    }
}

/**
 * Deploy Smart Contract to testnet with smart contract code stored on IFPS
 * 
 * @param {string} smartContractUrl IPFS url where contract is stored
 * 
 * @return {string} address of the deployed smart contract
 */
async function deployScWithCode(smartContractUrl) {
    try {
        // fetch contract from IPFS
        const response = await fetch(smartContractUrl);
        const contract = await response.json();

        const input = {
            language: 'Solidity',
            sources: contract,
            settings: {
                outputSelection: {
                    '*': {
                        '*': [ 'abi', 'evm.bytecode' ]
                    }
                }
            }
        }

        // compile contract
        const compiledContracts = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

        // deploy smart contract with compiledContracts
        console.log('Deploying smart contract to testnet...');
        const appContract = new web3.eth.Contract(compiledContracts.abi);
        const functionToCall = appContract.deploy({ data: compiledContracts.bytecode, arguments: [] });
        const gasLimit = 6000000;
        const gasPrice = await web3.eth.getGasPrice();

        const transactionObject = {
            from: await web3.eth.getCoinbase(),
            to: DHUB_ADDRESS,
            gasLimit: web3.utils.toHex(gasLimit),
            gasPrice: web3.utils.toHex(gasPrice),
            data: functionToCall.encodeABI(),
        };

        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionObject]
        });

        return txHash;
    } catch (error) {
        console.error(error);
    }
}
deploySc();

module.exports = {
    deploySc,
    deployScWithCode,
};
