const Web3 = require('web3');
const DHubStoreArtifact = require('../build/contracts/DHubStore.json');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.resolve(__dirname, '../../.env')});

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const DHUB_ADDRESS = process.env.DHUB_ADDRESS;
const provider = process.env.BC_RPC_URL;
const ADMIN_ADDRESS = process.env.ADMIN_ADDRESS;
// const ADMIN_ADDRESS = '0x8342E935907f86127F24AE3742A2c147bf60Fc75';
// const PRIVATE_KEY = '8ee8778073107c820819f0bd4df9b94a5753708e024990dffaa8bfadf09cd748';
// const DHUB_ADDRESS = '0x16319342a897b286de6216cb5CE7D7B8d64a774B';
// const provider = 'https://rpc.ankr.com/eth_goerli';
const web3 = new Web3(provider);
const myEOA = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(PRIVATE_KEY);

/**
 * Request to publish dApp
 */
async function requestToPublishApp(
    name,
    description,
    image,
    tags,
    website,
    github,
    discord,
    telegram,
    smartContractUrl,
    usingPrice
) {
    console.log('submitting the app...');
    try {
        let web3 = new Web3(window.ethereum);
        const DHubStore = new web3.eth.Contract(DHubStoreArtifact.abi, DHUB_ADDRESS);
        const functionToCall = DHubStore.methods .requestToPublishApp(name, description, image, tags, website, github, discord, telegram, smartContractUrl, usingPrice);
        const gasLimit = 6000000;
        const gasPrice = await web3.eth.getGasPrice();

        const transactionObject = {
            from: await web3.eth.getCoinbase(),
            to: DHUB_ADDRESS,
            gasLimit: web3.utils.toHex(gasLimit),
            gasPrice: web3.utils.toHex(gasPrice),
            data: functionToCall.encodeABI()
        };

        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionObject]
        });

        console.log('txHash: ', txHash);

        return txHash;
    } catch (error) {
        throw error;
    }
}

/**
 * Admin publishes an app
 */
async function publishApp(appId) {
    console.log('publishing app...');
    try {
        const DHubStore = new web3.eth.Contract(DHubStoreArtifact.abi, DHUB_ADDRESS);
        const res =await DHubStore.methods
            .publishApp(appId).send({from: myEOA.address, gasLimit: 5_000_000});
        console.log('res: ', res);

        return res;
    } catch (error) {
        throw error;
    }
}

/**
 * Admin rejects an app
 */
async function rejectApp(appId) {
    console.log('rejecting app...');
    try {
        const DHubStore = new web3.eth.Contract(DHubStoreArtifact.abi, DHUB_ADDRESS);
        const res =await DHubStore.methods
            .rejectApp(appId).send({from: myEOA.address, gasLimit: 5_000_000});
        console.log('res: ', res);

        return res;
    } catch (error) {
        throw error;
    }
}

/**
 * User registers to use an app
 */
async function useApp(appId) {
    try {
        let web3 = new Web3(window.ethereum);
        const DHubStore = new web3.eth.Contract(DHubStoreArtifact.abi, DHUB_ADDRESS);
        const functionToCall = DHubStore.methods .useApp(appId);
        const gasLimit = 6000000;
        const gasPrice = await web3.eth.getGasPrice();

        const appInfo = await getAppInfo(appId);

        const transactionObject = {
            from: await web3.eth.getCoinbase(),
            to: DHUB_ADDRESS,
            gasLimit: web3.utils.toHex(gasLimit),
            gasPrice: web3.utils.toHex(gasPrice),
            data: functionToCall.encodeABI(),
            value: web3.utils.toWei(appInfo.usingPrice/1000, 'ether')
        };

        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionObject]
        });

        console.log('txHash: ', txHash);

        return txHash;
    } catch (error) {
        throw error;
    }
}

/**
 * Get apps info from the smart contract
 */
async function getPublishedApps() {
    try {
        const DHubStore = new web3.eth.Contract(DHubStoreArtifact.abi, DHUB_ADDRESS);
        const apps = await DHubStore.methods.getAllPublishedApps(ADMIN_ADDRESS).call();
        console.log(`published apps: `, apps);
    } catch (error) {
        throw error;
    }
}

/**
 * Get requested apps
 */
async function getRequestedApps() {
    try {
        const DHubStore = new web3.eth.Contract(DHubStoreArtifact.abi, DHUB_ADDRESS);
        const apps = await DHubStore.methods.getAllRequestedApps(ADMIN_ADDRESS).call();
        console.log(`requested apps: `, apps);
    } catch (error) {
        throw error;
    }
}

/**
 * Get app info
 */
async function getAppInfo(appId) {
    try {
        const DHubStore = new web3.eth.Contract(DHubStoreArtifact.abi, DHUB_ADDRESS);
        const app = await DHubStore.methods.getAppInfo(appId).call();
        console.log(`app info: `, app);

        return app;
    } catch (error) {
        throw error;
    }
}

// requestToPublishApp('test 2', 'des', 'img', 'code');
// getPublishedApps();
// getRequestedApps();
// publishApp(1);
// rejectApp(2);
// getAppInfo(0);

module.exports = {
    requestToPublishApp,
    getPublishedApps,
    getRequestedApps,
    publishApp,
    rejectApp,
    useApp,
    getAppInfo,
};
