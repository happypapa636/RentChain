# RentChain - Decentralized Rental Agreements

<div align="center">
  <img src="web/public/favicon.svg" alt="RentChain Logo" width="80" />
  <h3>Smart Rental Agreements on Polygon Blockchain</h3>
  <p>Transform your lease into a transparent, self-executing smart contract</p>
</div>

---

## 🔗 Live Contract

| Network | Contract Address | Explorer |
|---------|-----------------|----------|
| **Polygon Amoy** | `0x7A099190c2C0dd3E6BC2FCB57D2d6cd8c9e1Ac37` | [View on OKLink](https://www.oklink.com/amoy/address/0x7A099190c2C0dd3E6BC2FCB57D2d6cd8c9e1Ac37) |

---

## 🎯 What is RentChain?

RentChain is a **decentralized application (dApp)** that transforms rental agreements into blockchain-based smart contracts. No more paper contracts, no disputes, no middlemen.

### The Problem We Solve
- 📄 Paper contracts get lost or damaged
- ⚖️ Disputes over terms are expensive
- 💸 Late rent payments cause friction
- 🔒 Security deposits held without transparency

### Our Solution
- ✅ **Immutable contracts** on Polygon blockchain
- ✅ **Automatic rent collection** via smart contracts
- ✅ **Transparent deposits** held in escrow
- ✅ **AI-powered** contract analysis

---

## 🔄 How It Works

```
╔═══════════════════════════════════════════════════════════════╗
║                        RENTCHAIN FLOW                         ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  1. LANDLORD CREATES LEASE                                    ║
║     └─► Sets rent, deposit, duration, terms                   ║
║         └─► Smart contract deployed on Polygon                ║
║                                                               ║
║  2. TENANT SIGNS LEASE                                        ║
║     └─► Pays security deposit to contract                     ║
║         └─► Lease becomes ACTIVE                              ║
║                                                               ║
║  3. MONTHLY PAYMENTS                                          ║
║     └─► Tenant pays rent through contract                     ║
║         └─► Automatically sent to landlord                    ║
║                                                               ║
║  4. LEASE ENDS                                                ║
║     └─► Landlord ends lease                                   ║
║         └─► Deposit returned to tenant                        ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Lease States
| State | Description |
|-------|-------------|
| `Created` | Landlord deployed, waiting for tenant |
| `Active` | Tenant signed, rent payments active |
| `Ended` | Lease completed normally |
| `Terminated` | Early termination |

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Tamper-Proof** | Contracts stored on Polygon blockchain - cannot be altered |
| ⚡ **Auto Payments** | Rent collected directly via smart contract |
| 🤖 **AI Analysis** | Complex terms explained in plain English |
| 📱 **Responsive** | Works perfectly on desktop & mobile |
| 🌙 **Dark Mode** | Beautiful UI in light or dark theme |
| 🛡️ **Secure** | Built with OpenZeppelin security standards |
| 💨 **Fast** | Polygon's low fees & quick confirmations |

---

## 📦 Smart Contracts

### RentChainFactory (`0x7A099190c2C0dd3E6BC2FCB57D2d6cd8c9e1Ac37`)

Factory contract that creates and tracks all rental agreements.

```solidity
// Create a new lease
function createLease(
    uint256 _rentAmount,      // Monthly rent in wei
    uint256 _securityDeposit, // Deposit amount in wei
    uint256 _leaseDuration,   // Duration in seconds
    string memory _ipfsHash   // IPFS hash of terms
) external returns (address)

// Get landlord's leases
function getLandlordLeases(address _landlord) external view returns (address[])

// Get all leases
function getAllLeases() external view returns (address[])
```

### LeaseAgreement

Individual lease contract with full payment logic.

```solidity
// Tenant signs and pays deposit
function signLease() external payable

// Tenant pays monthly rent
function payRent() external payable

// Landlord returns deposit
function returnDeposit(uint256 amount) external

// Landlord ends lease
function endLease() external
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MetaMask wallet
- MATIC tokens on Polygon Amoy (for gas)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/rentchain.git
cd rentchain/rentchain-ai-lease

# Install dependencies
cd web && npm install
cd ../contracts && npm install
```

### Run Frontend

```bash
cd web
npm run dev
```

Open http://localhost:5173

### MetaMask Setup

1. **Add Polygon Amoy Network:**
   - Network Name: `Polygon Amoy`
   - RPC URL: `https://rpc-amoy.polygon.technology`
   - Chain ID: `80002`
   - Currency: `MATIC`
   - Explorer: `https://www.oklink.com/amoy`

2. **Get Test MATIC:**
   - Visit [Polygon Faucet](https://faucet.polygon.technology/)
   - Enter your wallet address
   - Select Amoy network

---

## 📁 Project Structure

```
rentchain-ai-lease/
├── contracts/                     # Solidity smart contracts
│   ├── contracts/
│   │   ├── RentChainFactory.sol   # Factory pattern
│   │   └── LeaseAgreement.sol     # Lease logic
│   ├── scripts/deploy.js          # Deployment script
│   └── hardhat.config.js          # Hardhat configuration
├── web/                           # React frontend
│   ├── src/
│   │   ├── components/            # UI components
│   │   ├── pages/                 # Page components
│   │   ├── hooks/useRentChain.ts  # Contract hooks
│   │   └── main.tsx               # Entry point
│   └── vite.config.ts             # Vite config
├── .gitignore
└── README.md
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Blockchain** | Polygon Amoy Testnet |
| **Smart Contracts** | Solidity 0.8.24, OpenZeppelin |
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Web3** | Wagmi v2, Viem |
| **AI** | Gemini API (for contract analysis) |

---

## 🔧 Environment Variables

### Frontend (`web/.env`)
```env
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
VITE_GEMINI_API_KEY=your_gemini_key
```

### Contracts (`contracts/.env`)
```env
PRIVATE_KEY=your_private_key
AMOY_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/your_key
```

---

## 📄 License

MIT License

---

<div align="center">
  <p>Built with ❤️ on Polygon</p>
  <p><strong>Contract:</strong> <code>0x7A099190c2C0dd3E6BC2FCB57D2d6cd8c9e1Ac37</code></p>
</div>
