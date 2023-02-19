// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

error AppNotExist();

contract DHubStore is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _idCounter;

    // using IPFS or not?
    struct App {
        uint256 id;
        string name;
        string description;
        string image;
        string bytecode;
    }

    App[] public apps;

    mapping(address => App[]) private userToApps;

    function creatApp(
        string memory name,
        string memory description,
        string memory image,
        string memory bytecode
    ) external onlyOwner {
        uint256 appId = _idCounter.current();
        _idCounter.increment();
        apps.push(App(appId, name, description, image, bytecode));
    }

    /**
     * @dev user request to use an app
     */
    function useApp(uint256 appId) external {
        if (appId >= apps.length) revert AppNotExist();
        for (uint i = 0; i < apps.length; i++) {
            if (apps[i].id == appId) {
                App[] storage userApps = userToApps[msg.sender];
                userApps.push(apps[i]);
            }
        }
    }

    /**
     * @dev Get all listed apps
     * @return Array of Apps that are listed
     */
    function getAllPurchasableMarketItems() external view returns (App[] memory) {
        return apps;
    }

    /**
     * @dev Get all apps belong to a user
     * @return Array of Apps
     */
    function getAppsBelongToUser() external view returns (App[] memory) {
        return userToApps[msg.sender];
    }
}
