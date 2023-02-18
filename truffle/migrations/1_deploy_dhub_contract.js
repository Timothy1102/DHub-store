const DHubStore = require('../build/contracts/DHubStore.json');

module.exports = function(deployer) {
    deployer.deploy(DHubStore);
};
