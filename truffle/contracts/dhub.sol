// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

error AppNotExist();
error InvalidAppId();
error NotAllowedToSeeAppInfo();
error NotAllowedAccount();

contract DHubStore is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _appIdCounter;
    Counters.Counter private _requestedAppIdCounter;

    struct App {
        uint256 id;
        string name;
        string description;
        address owner;
        string image;
        string bytecode;
    }

    // apps that have already been published by admin
    App[] private apps;
    // apps that have been requested to publish
    App[] private requestedApps;

    // user address => apps used by that user
    mapping(address => App[]) private userToAppsMapper;

    function requestToPublishApp(
        string memory _name,
        string memory _description,
        string memory _image,
        string memory _bytecode
    ) external {
        uint256 appId = _requestedAppIdCounter.current();
        _requestedAppIdCounter.increment();
        requestedApps.push(App(appId, _name, _description, msg.sender, _image, _bytecode));
    }

    function publishApp(
        uint256 requestedAppId
    ) external onlyOwner {
        if (requestedAppId >= requestedApps.length) revert InvalidAppId();
        for (uint i = 0; i < requestedApps.length; i++) {
            if (requestedApps[i].id == requestedAppId) {
                uint256 appId = _appIdCounter.current();
                _appIdCounter.increment();
                apps.push(App(appId, requestedApps[i].name, requestedApps[i].description, requestedApps[i].owner, requestedApps[i].image, requestedApps[i].bytecode));
            }
        }
    }

    /**
     * @notice it is free at the moment to use an app, no fee is charged when user use apps
     * @dev user request to use an app
     */
    function useApp(uint256 appId) external {
        if (appId >= apps.length) revert AppNotExist();
        for (uint i = 0; i < apps.length; i++) {
            if (apps[i].id == appId) {
                App[] storage userApps = userToAppsMapper[msg.sender];
                userApps.push(apps[i]);
            }
        }
    }

    /**
     * @dev Get all listed apps
     * @return Array of Apps that are listed
     */
    function getAllPublishedApps(address _address) external view returns (App[] memory) {
        if (_address != owner()) revert NotAllowedAccount();
        return apps;
    }

    /**
     * @dev Get all requested apps
     * @return Array of Apps that have been requested
     */
    function getAllRequestedApps(address _address) external view returns (App[] memory) {
        if (_address != owner()) revert NotAllowedAccount();
        return requestedApps;
    }

    /**
     * @dev Get app info
     */
    function getAppInfo(uint256 _appId) external view returns (string memory name, string memory description, address owner, string memory image) {
        return (apps[_appId].name, apps[_appId].description, apps[_appId].owner, apps[_appId].image);
    }

    /**
     * @dev Get all apps belong to a user (apps that the user has used)
     * @notice Only app users can view their own app info
     * @return Array of Apps
     */
    function getAppsBelongToUser(address appUserAddress) external view returns (App[] memory) {
        // revert if caller is not contract owner and attempt to view other address's app info
        if (msg.sender != owner()) {
            if (msg.sender != appUserAddress) revert NotAllowedToSeeAppInfo();
        }
        return userToAppsMapper[appUserAddress];
    }
}
