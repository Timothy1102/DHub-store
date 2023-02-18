// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

error TicketNotExist();
error InvalidLengthError();

contract DHubStore is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

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
        uint256 id,
        string memory name,
        string memory description,
        string memory image,
        string memory bytecode
    ) external onlyOwner {
        apps.push(App(id, name, description, image, bytecode));
    }

    /**
     * @notice Get all the listed offer with status SELLING
     * @return Array of offer ids that are listed with status SELLING
     */
    function getAllPurchasableMarketItems() external view returns (App[] memory) {
        return apps;
    }
    
}
