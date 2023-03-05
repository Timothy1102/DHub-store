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
        address owner;
        string description;
        string image;
        string tags;
        string website;
        string github;
        string discord;
        string telegram;
        string smartContractUrl;
        uint256 usingPrice;
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
        string memory _tags,
        string memory _website,
        string memory _github,
        string memory _discord,
        string memory _telegram,
        string memory _smartContractUrl,
        uint256 _usingPrice
    ) external {
        uint256 appId = _requestedAppIdCounter.current();
        _requestedAppIdCounter.increment();
        requestedApps.push(App(
            appId,
            _name,
            msg.sender,
            _description,
            _image,
            _tags,
            _website,
            _github,
            _discord,
            _telegram,
            _smartContractUrl,
            _usingPrice
        ));
    }

    /**
     * @dev admin publishes an app to the store
     */
    function publishApp(
        uint256 requestedAppId
    ) external onlyOwner {
        for (uint i = 0; i < requestedApps.length; i++) {
            if (requestedApps[i].id == requestedAppId) {
                uint256 appId = _appIdCounter.current();
                _appIdCounter.increment();
                apps.push(App(
                    appId,
                    requestedApps[i].name,
                    requestedApps[i].owner, 
                    requestedApps[i].description,
                    requestedApps[i].image,
                    requestedApps[i].tags,
                    requestedApps[i].website,
                    requestedApps[i].github,
                    requestedApps[i].discord,
                    requestedApps[i].telegram,
                    requestedApps[i].smartContractUrl,
                    requestedApps[i].usingPrice
                ));
            }
        }
        removeAppFromRequestedApps(requestedAppId);
    }

    /**
     * @dev admin rejects to publish an app to the store
     */
    function rejectApp(uint256 _appId) external onlyOwner {
        removeAppFromRequestedApps(_appId);
    }

    /**
     * @dev remove an app from requested apps queue by app id
     */
    function removeAppFromRequestedApps(uint256 _appId) internal {
        for (uint i = 0; i < requestedApps.length; i++) {
            if (requestedApps[i].id == _appId) {
                if (i == requestedApps.length - 1) {
                    requestedApps.pop();
                } else {
                    for (uint j = i; j < requestedApps.length - 1; j++) {
                        requestedApps[j] = requestedApps[j+1];
                    }
                    requestedApps.pop();
                }
            }
        }
    }

    /**
     * @notice dApp using price will be transferred from dApp user to dApp creator
     * @dev user request to use an app
     */
    function useApp(uint256 appId) external payable{
        if (appId >= apps.length) revert AppNotExist();
        for (uint i = 0; i < apps.length; i++) {
            if (apps[i].id == appId) {
                App[] storage userApps = userToAppsMapper[msg.sender];
                userApps.push(apps[i]);
                address payable appOwner = payable(apps[i].owner);
                appOwner.transfer(msg.value); //transfer using price to dApp creator
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
    function getAppInfo(uint256 _appId) external view returns (
        string memory name,
        string memory description,
        address owner,
        string memory image,
        string memory github,
        string memory discord,
        uint256 usingPrice
    ) {
        return (apps[_appId].name,
                apps[_appId].description,
                apps[_appId].owner,
                apps[_appId].image,
                apps[_appId].github,
                apps[_appId].discord,
                apps[_appId].usingPrice);
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
