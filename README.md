# dApp Store on Ethereum blockchain

 ## Instructions & Setups
1. Install [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) browser extension
2. Create 3 accounts into your wallet (for user, developer and admin account)
3. Get some ETH testnet token from [Goerli](https://goerlifaucet.com/) testnet network to all 3 accounts (for transaction fee and using dApp fee)
4. Define your own environment variables: `cp .env.dist .env`
5. Get `private key` of the admin account and save it to `.env` file
6. Save admin account address to `ADMIN_ADDRESS` in `.env` file
7. Deploy DHub smart contract to Goerli network by running `cd truffle && node script/deploy.js`
8. Save the logged result into `DHUB_ADDRESS` in `.env` file
9. Create an account and API key on [NFT Storage](https://nft.storage/), save it to `.env` file
10. start the application in development mode: `yarn && yarn start`

## Useful Commands

- `cd truffle && truffle compile`: compile smart contract
- `cd truffle && truffle test`: exucute unit tests for smart contract