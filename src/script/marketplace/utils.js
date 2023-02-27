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

const mintNft = () => {
    console.log('start')
}

module.exports = {
    getMarketplaceListings,
    mintNft,
}