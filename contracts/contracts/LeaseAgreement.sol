// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LeaseAgreement is ReentrancyGuard, Ownable {
    // State Variables
    address public landlord;
    address public tenant;
    uint256 public rentAmount;
    uint256 public securityDeposit;
    uint256 public leaseDuration; // In seconds
    uint256 public leaseStart;
    uint256 public leaseEnd;
    
    string public ipfsAgreementHash; // IPFS hash of the PDF contract
    
    enum LeaseState { Created, Active, Ended, Terminated }
    LeaseState public state;
    
    uint256 public totalRentPaid;
    bool public depositPaid;
    bool public depositReturned;

    // Events
    event LeaseSigned(address indexed tenant, uint256 timestamp);
    event RentPaid(address indexed tenant, uint256 amount, uint256 timestamp);
    event DepositPaid(address indexed tenant, uint256 amount);
    event LeaseEnded(uint256 timestamp);
    event DepositReturned(uint256 amount);

    constructor(
        address _landlord,
        uint256 _rentAmount,
        uint256 _securityDeposit,
        uint256 _leaseDuration,
        string memory _ipfsHash
    ) Ownable(_landlord) {
        landlord = _landlord;
        rentAmount = _rentAmount;
        securityDeposit = _securityDeposit;
        leaseDuration = _leaseDuration;
        ipfsAgreementHash = _ipfsHash;
        state = LeaseState.Created;
    }

    modifier onlyTenant() {
        require(msg.sender == tenant, "Only tenant can call this");
        _;
    }

    modifier onlyLandlord() {
        require(msg.sender == landlord, "Only landlord can call this");
        _;
    }

    modifier inState(LeaseState _state) {
        require(state == _state, "Invalid lease state");
        _;
    }

    // Tenant signs the lease and optionally pays deposit
    function signLease() external payable nonReentrant inState(LeaseState.Created) {
        require(msg.value >= securityDeposit, "Insufficient deposit");
        
        tenant = msg.sender;
        depositPaid = true;
        state = LeaseState.Active;
        leaseStart = block.timestamp;
        leaseEnd = block.timestamp + leaseDuration;

        emit DepositPaid(msg.sender, msg.value);
        emit LeaseSigned(msg.sender, block.timestamp);
        
        // Refund excess if any
        if (msg.value > securityDeposit) {
            payable(msg.sender).transfer(msg.value - securityDeposit);
        }
    }

    // Tenant pays rent
    function payRent() external payable nonReentrant inState(LeaseState.Active) {
        require(msg.value >= rentAmount, "Insufficient rent");
        
        totalRentPaid += msg.value;
        payable(landlord).transfer(msg.value);
        
        emit RentPaid(msg.sender, msg.value, block.timestamp);
    }

    // End lease (usually by landlord or automatically if time passed - simplified here)
    function endLease() external onlyLandlord inState(LeaseState.Active) {
        require(block.timestamp >= leaseEnd, "Lease not yet ended");
        state = LeaseState.Ended;
        emit LeaseEnded(block.timestamp);
    }

    // Return deposit to tenant
    function returnDeposit(uint256 amount) external onlyLandlord nonReentrant {
        require(state == LeaseState.Ended || state == LeaseState.Terminated, "Lease must be ended");
        require(!depositReturned, "Deposit already returned");
        require(amount <= securityDeposit, "Amount exceeds deposit");

        depositReturned = true;
        payable(tenant).transfer(amount);
        
        // If there's remaining deposit kept by landlord, it stays in contract? 
        // Actually, better pattern: Landlord sends `amount` to return, keeps rest. 
        // For simplicity: Landlord specifies how much to return. Remainder sends to landlord.
        
        uint256 remainder = securityDeposit - amount;
        if (remainder > 0) {
            payable(landlord).transfer(remainder);
        }

        emit DepositReturned(amount);
    }
}
