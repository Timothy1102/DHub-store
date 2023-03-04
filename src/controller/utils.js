import { DAPP__DATA } from '../view/assets/data/data'
const Web3 = require('web3');

/***
 * get all dApps listed on marketplace
 */
export const getMarketplaceListings = async () => {
    return DAPP__DATA;
}

export const mintNft = () => {
    console.log('start')
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
