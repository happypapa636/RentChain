# RentChain

## Setup

1. **Contracts**
   ```bash
   cd contracts
   npm install
   cp .env.example .env
   # Add your private key to .env
   npx hardhat run scripts/deploy.ts --network amoy
   ```
   *Note: Copy the deployed Factory address.*

2. **Frontend**
   ```bash
   cd web
   npm install
   npm run dev
   ```

3. **In Web App**
   - Connect MetaMask (Amoy Testnet).
   - Create Lease.
   - View Dashboard.
