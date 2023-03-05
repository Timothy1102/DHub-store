import { DAPP__DATA } from '../view/assets/data/data'
import { 
    requestToPublishApp, 
    getUserPublishedApps, 
    getUserRequestedApps,
    getUserUsingApps,
    getAppInfo,
    useApp,
    rejectApp,
    publishApp,
    getRequestedApps,
    getPublishedApps,
} from '../../truffle/script/utils'
const Web3 = require('web3');

/***
 * get all dApps listed on marketplace
 */
export const getMarketplaceListings = async () => {
    return DAPP__DATA;
}

/***
 * get all dApps published by the connected user
 */
export const getMyPublishedApps = async () => {
    return getUserPublishedApps(window.ethereum.selectedAddress);
}

/***
 * get all dApps requested by the connected user
 */
export const getMyRequestedApps = async () => {
    return getUserRequestedApps(window.ethereum.selectedAddress);
}

/***
 * get all dApps using by the connected user
 */
export const getMyUsingApps = async () => {
    return getUserUsingApps(window.ethereum.selectedAddress);
}

/***
 * submit dApp to be reviewed by admin
 */
export const submitApp = async (
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
) => {
    const txHash = await requestToPublishApp(
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
    );

    return txHash;
}

export const sendTx = async () => {
    let web3 = new Web3(window.ethereum);

    // fetch contract artifact from IPFS
    const bytecode = await fetch('https://nftstorage.link/ipfs/bafybeig5wqmxma2tmk6robiyikfi5ejnmfujm3ebgke3lhpzy3xuy7v7u4');
    const artifact = await bytecode.json();
    console.log('done fetching artifact')

    const contractABI = artifact.abi;
    const contractAddress = "0x6B279487D318E3A569fA042F049E28B6D3552F33";
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const functionToCall = contract.methods.creatApp('test', 'des', 'img', 'code');
    console.log('done calling function')
    const gasLimit = 5000000;
    const gasPrice = await web3.eth.getGasPrice();
    const transactionObject = {
        from: await web3.eth.getCoinbase(),
        to: contractAddress,
        gasLimit: web3.utils.toHex(gasLimit),
        gasPrice: web3.utils.toHex(gasPrice),
        data: functionToCall.encodeABI()
    };

    const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionObject]
    });

    console.log('txHash: ', txHash);
}
