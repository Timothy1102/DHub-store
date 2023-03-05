// const dotenv = require('dotenv');
// const path = require('path');
// dotenv.config({path: path.resolve(__dirname, '../../.env')});

const tim = () => {
    console.log('tim test from bsc: ', window.ethereum.selectedAddress);
}
// tim()

module.exports = {tim}