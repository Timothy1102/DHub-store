// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

error TicketNotExist();
error InvalidLengthError();

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

    mapping(address => App[]) public userToApps;

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
     * @notice Get all listed apps
     * @return Array of Apps that are listed
     */
    function getAllPurchasableMarketItems() external view returns (App[] memory) {
        return apps;
    }
    
}
