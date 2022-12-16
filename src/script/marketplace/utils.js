// const dotenv = require('dotenv')
// dotenv.config()
// const dotenv = require('dotenv');
// const path = require('path');
// console.log('path: ', __dirname)
// console.log('path changed: ', path.resolve(__dirname, '../../../.env'))
// dotenv.config({path: path.resolve(__dirname, '/src/.env')});
const { Metaplex, keypairIdentity, bundlrStorage } = require('@metaplex-foundation/js')
const { Connection, clusterApiUrl, Keypair, PublicKey } = require('@solana/web3.js')
const BN = require('bn.js')

/***
 * get all dApps listed on marketplace
 */
const getMarketplaceListings = async () => {
    // TODO: put dataApiEndpoint into .env
    const dataApiEndpoint = 'https://rpc.dhub.store/api/all-for-sell'

    const listings = await fetch(dataApiEndpoint).then(function (response) {
        return response.json();
    }).then(function (data) {
        return data;
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });

    return listings
}

const createMarketplace = async () => {
    console.log('testing')
    // const connection = new Connection(clusterApiUrl('devnet'))
    // const metaplex = Metaplex.make(connection)
    // return await metaplex
    //   .auctionHouse()
    //   .create({
    //     sellerFeeBasisPoints: 500,
    //   });
  }

const connection = new Connection(clusterApiUrl('devnet'))
// const seed = Uint8Array.from(keyPair)
// const wallet = Keypair.fromSecretKey(seed)
// console.log(wallet.publicKey)
// const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet)).use(bundlrStorage())

// const mintNft = async (to, uri, name, symbol) => {
const mintNft = async (wallet) => {
    console.log('start')
    console.log('Metaplex: ', Metaplex)
    const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet)).use(bundlrStorage())
    // const metaplex = new Metaplex(connection);
    console.log('end')
}

module.exports = {
    getMarketplaceListings,
    createMarketplace,
    mintNft,
}