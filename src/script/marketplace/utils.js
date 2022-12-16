const { Metaplex, keypairIdentity, bundlrStorage } = require('@metaplex-foundation/js')
const { Connection, clusterApiUrl } = require('@solana/web3.js')
// const BN = require('bn.js')

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
    console.log('end')
}

module.exports = {
    getMarketplaceListings,
    mintNft,
}