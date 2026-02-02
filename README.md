# RentChain - Decentralized Rental Agreements

<div align="center">
  <img src="web/public/favicon.svg" alt="RentChain Logo" width="80" />
  <h3>Smart Rental Agreements on Polygon Blockchain</h3>
  <p>Transform your lease into a transparent, self-executing smart contract</p>
  
  **Contract Address (Local):** `0x5FbDB2315678afecb367f032d93F642f64180aa3`
</div>

---

## 🎯 What is RentChain?

RentChain is a decentralized application (dApp) that revolutionizes rental agreements by putting them on the blockchain. Instead of paper contracts that can be lost, disputed, or tampered with, RentChain creates **smart contracts** that:

- ✅ **Cannot be altered** once signed by both parties
- ✅ **Automatically collect rent** on schedule
- ✅ **Hold security deposits** in escrow
- ✅ **Release deposits** automatically when lease ends
- ✅ **Provide proof** of all transactions on-chain

## 🔄 How It Works

```
┌─────────────┐    Creates     ┌──────────────────┐
│   Landlord  │ ─────────────► │  RentChainFactory │
└─────────────┘                └────────┬─────────┘
                                        │
                                        ▼ Deploys
                               ┌──────────────────┐
                               │  LeaseAgreement  │
                               │   Smart Contract │
                               └────────┬─────────┘
                                        │
┌─────────────┐    Signs +     ┌────────▼─────────┐
│   Tenant    │ ─────────────► │  Pays Deposit    │
└─────────────┘   Deposit      └────────┬─────────┘
                                        │
                                        ▼
                               ┌──────────────────┐
                               │  Monthly Rent    │
                               │  Auto-collected  │
                               └────────┬─────────┘
                                        │
                                        ▼
                               ┌──────────────────┐
                               │  Lease Ends      │
                               │  Deposit Returned│
                               └──────────────────┘
```

### Step-by-Step Flow:

1. **Landlord Creates Lease** - Sets rent amount, deposit, duration, and terms
2. **Contract Deployed** - Smart contract is created on Polygon
3. **Tenant Signs** - Pays security deposit to activate lease
4. **Monthly Payments** - Tenant pays rent through the contract
5. **Lease Ends** - Landlord can return deposit (full or partial)

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Tamper-Proof** | Contracts stored on Polygon blockchain |
| ⚡ **Auto Payments** | Rent collected via smart contracts |
| 🤖 **AI Analysis** | Terms explained in plain English |
| 📱 **Responsive** | Works on desktop & mobile |
| 🌙 **Dark Mode** | Beautiful UI in any theme |
| 🛡️ **Secure** | OpenZeppelin security standards |

## 📦 Smart Contracts

### RentChainFactory
The factory contract that creates and tracks all lease agreements.

```solidity
// Creates a new lease
function createLease(
    uint256 _rentAmount,      // Monthly rent in wei
    uint256 _securityDeposit, // Security deposit in wei
    uint256 _leaseDuration,   // Duration in seconds
    string memory _ipfsHash   // IPFS hash of terms
) external returns (address)

// Get all leases for a landlord
function getLandlordLeases(address _landlord) external view returns (address[])
```

### LeaseAgreement
Individual lease contract with payment logic.

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

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MetaMask wallet
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/rentchain.git
cd rentchain/rentchain-ai-lease

# Install all dependencies
cd web && npm install
cd ../contracts && npm install
```

### Run Locally

```bash
# Terminal 1: Start blockchain
cd contracts
npx hardhat node

# Terminal 2: Deploy contracts
cd contracts
npx hardhat run scripts/deploy.js --network localhost

# Terminal 3: Start frontend
cd web
npm run dev
```

### MetaMask Setup

1. **Add Network:**
   - Name: `Hardhat Local`
   - RPC: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency: `ETH`

2. **Import Test Account:**
   ```
   Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
   (From Hardhat node output - has 10000 ETH for testing)

3. **Open:** http://localhost:5173

## 📁 Project Structure

```
rentchain-ai-lease/
├── contracts/                 # Smart contracts
│   ├── contracts/
│   │   ├── RentChainFactory.sol   # Factory contract
│   │   └── LeaseAgreement.sol     # Lease logic
│   ├── scripts/deploy.js          # Deployment script
│   └── hardhat.config.js
├── web/                       # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.tsx         # App layout
│   │   │   ├── ErrorBoundary.tsx  # Error handling
│   │   │   └── AIContractExplainer.tsx
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx    # Home
│   │   │   ├── Dashboard.tsx      # User dashboard
│   │   │   ├── CreateLease.tsx    # Create form
│   │   │   └── LeaseDetails.tsx   # View lease
│   │   ├── hooks/useRentChain.ts  # Contract hooks
│   │   └── main.tsx               # Entry point
│   └── vite.config.ts
├── .gitignore
└── README.md
```

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Blockchain | Polygon (Hardhat for local) |
| Smart Contracts | Solidity 0.8.24, OpenZeppelin |
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Web3 | Wagmi v2, Viem |
| Routing | React Router v7 |

## 🔧 Environment Variables

### Frontend (`web/.env`)
```env
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
VITE_GEMINI_API_KEY=your_gemini_key
```

### Contracts (`contracts/.env`)
```env
PRIVATE_KEY=your_private_key
AMOY_RPC_URL=https://rpc-amoy.polygon.technology
```

## 🚀 Production Deployment

```bash
# Build frontend
cd web
npm run build

# Deploy to Polygon Amoy
cd ../contracts
npx hardhat run scripts/deploy.js --network amoy
```

## 📄 License

MIT License - see LICENSE for details.

---

<div align="center">
  <p>Built with ❤️ on Polygon</p>
</div>
