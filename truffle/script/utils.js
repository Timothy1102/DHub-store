const dotenv = require('dotenv');
const path = require('path');
const Web3 = require('web3');
dotenv.config({path: path.resolve(__dirname, '../../.env')});
const DHubStoreArtifact = require('../build/contracts/DHubStore.json');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const DHUB_ADDRESS = process.env.DHUB_ADDRESS;
const provider = process.env.BC_RPC_URL;
const web3 = new Web3(provider);
const myEOA = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(PRIVATE_KEY); // for transaction signing

/**
 * Create an app to the smart contract
 */
async function createApp(name, des, image, bytecode) {
    console.log('creating app...');
    try {
        const DHubStore = new web3.eth.Contract(DHubStoreArtifact.abi, DHUB_ADDRESS);
        const res =await DHubStore.methods 
            .creatApp(name, des, image, bytecode).send({from: myEOA.address, gasLimit: 5_000_000});
        console.log('res: ', res);

        return res;
    } catch (error) {
        throw error;
    }
}

/**
 * Get apps info from the smart contract
 */
async function getApps() {
    try {
        const DHubStore = new web3.eth.Contract(DHubStoreArtifact.abi, DHUB_ADDRESS);
        const apps = await DHubStore.methods.getAllPurchasableMarketItems().call();
        console.log(`apps: `, apps);
    } catch (error) {
        throw error;
    }
}

// createApp('test 2', 'des', 'img', 'code');
getApps();

module.exports = {
    createApp,
    getApps,
};
