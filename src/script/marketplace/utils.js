// const dotenv = require('dotenv')
// dotenv.config()
// const dotenv = require('dotenv');
// const path = require('path');
// console.log('path: ', __dirname)
// console.log('path changed: ', path.resolve(__dirname, '../../../.env'))
// dotenv.config({path: path.resolve(__dirname, '/src/.env')});
// const { Metaplex, keypairIdentity, bundlrStorage } = require('@metaplex-foundation/js')
// const { Connection, clusterApiUrl, Keypair, PublicKey } = require('@solana/web3.js')
// const BN = require('bn.js')

/***
 * get all dApp listed on marketplace
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

// const connection = new Connection(clusterApiUrl('devnet'))
// const seed = Uint8Array.from(keyPair)
// const wallet = Keypair.fromSecretKey(seed)
// console.log(wallet.publicKey)
// const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet)).use(bundlrStorage())

// const mintNft = async (to, uri, name, symbol) => {
//     const collectionNFTAddress = new PublicKey(new BN(process.env.COLLECTION_NFT, 16))

//     console.log('collectionNFTAddress: ', collectionNFTAddress)
//     const { nft } = await metaplex.nfts().create({
//         uri: uri,
//         name: name,
//         sellerFeeBasisPoints: 500, // Represents 5.00%.
//         maxSupply: null,
//         symbol: symbol,
//         collection: collectionNFTAddress,
//         collectionAuthority: wallet,
//         tokenOwner: to,
//         uses: {
//             useMethod: 2,
//             remaining: 1,
//             total: 1,
//         },
//         mintAuthority: wallet,
//     })

//     console.log(nft)
// }

// const uri = 'https://arweave.net/123'
// const to = wallet.publicKey
// mintNft(to, uri, "Tim's NFT test", 'Tim-Dapp1')

module.exports = {
    getMarketplaceListings
}