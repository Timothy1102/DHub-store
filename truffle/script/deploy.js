const dotenv = require('dotenv');
const path = require('path');
const Web3 = require('web3');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const DHubStoreArtifact = require('../build/contracts/DHubStore.json');

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
 * Deploy Smart Contract to testnet with bytecode stored on IFPS
 * 
 * @param {string} url IPFS url where contract artifact is stored
 * 
 * @return {string} address of the deployed smart contract
 */
async function deployScWithBytecode(url) {
    try {
        // fetch contract artifact from IPFS
        const response = await fetch(url);
        const artifact = await response.json();

        // deploy smart contract with artifact
        console.log('Deploying smart contract to testnet...');
        const DHubStore = new web3.eth.Contract(artifact.abi);
        const tx = await DHubStore
            .deploy({ data: artifact.bytecode, arguments: [] })
            .send({ from: myEOA.address, gas: 5_000_000 });
        const address = tx._address;
        console.log('Contract address: ', address);
    } catch (error) {
        console.error(error);
    }
}

// deployScWithBytecode('https://nftstorage.link/ipfs/bafybeig5wqmxma2tmk6robiyikfi5ejnmfujm3ebgke3lhpzy3xuy7v7u4');
deploySc();

module.exports = {
    deploySc,
    deployScWithBytecode,
};
