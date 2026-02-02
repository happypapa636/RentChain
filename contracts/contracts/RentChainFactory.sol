// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./LeaseAgreement.sol";

contract RentChainFactory {
    LeaseAgreement[] public allLeases;
    mapping(address => address[]) public landlordLeases;
    mapping(address => address[]) public tenantLeases;

    event LeaseCreated(address indexed leaseAddress, address indexed landlord, string ipfsHash);

    function createLease(
        uint256 _rentAmount,
        uint256 _securityDeposit,
        uint256 _leaseDuration,
        string memory _ipfsHash
    ) external returns (address) {
        LeaseAgreement newLease = new LeaseAgreement(
            msg.sender,
            _rentAmount,
            _securityDeposit,
            _leaseDuration,
            _ipfsHash
        );

        allLeases.push(newLease);
        landlordLeases[msg.sender].push(address(newLease));
        
        emit LeaseCreated(address(newLease), msg.sender, _ipfsHash);
        
        return address(newLease);
    }

    function getLandlordLeases(address _landlord) external view returns (address[] memory) {
        return landlordLeases[_landlord];
    }

    function getAllLeases() external view returns (LeaseAgreement[] memory) {
        return allLeases;
    }
}
