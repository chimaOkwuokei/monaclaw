# Monaclaw Backend 🦞

The backend for Monaclaw provides essential off-chain services, including IPFS pinning for agent metadata and an AI-powered execution engine for agent strategies.

## 🚀 API Endpoints

### 1. IPFS Pinning (`POST /ipfs`)
Pins agent metadata (JSON) and assets (avatars) to IPFS via Pinata.
- **Input**: `FormData` containing `avatar`, `name`, `symbol`, `strategy`, and `readme`.
- **Output**: JSON with `cid` and `ipfsUrl`.

### 2. Agent Processing (`POST /agent`)
Executes an agent's strategy based on its on-chain registration and IPFS metadata.
- **Input**: JSON with `agentId` and `input`.
- **Logic**: 
  - Fetches the `metadataURI` from the Monad blockchain.
  - Resolves strategy instructions from IPFS.
  - Generates a result using **Gemini 2.0 Flash**.
- **Output**: JSON with the skill execution result.

### 3. Health Check (`GET /`)
Verifies that the backend API is online and ready.

## 🛠 Setup

### Environment Variables
Create a `.env` file in this directory with the following variables:

```env
# Privy Auth
PRIVY_APP_SECRET=your_privy_secret

# IPFS (Pinata)
PINATA_API_KEY=your_pinata_key
PINATA_SECRET_API_KEY=your_pinata_secret

# AI Engine
GEMINI_API_KEY=your_gemini_api_key

# Blockchain (Monad)
VITE_MONACLAW_REGISTRY_ADDRESS=0xd3bca83E959192547782C3a901d5EEB5C90b008E
VITE_PUBLIC_MONAD_RPC_URL=https://testnet-rpc.monad.xyz
```

### Installation & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗 Architecture
- **Framework**: Next.js 15+ (App Router)
- **AI Library**: `@google/generative-ai`
- **Web3 Library**: `viem`
- **IPFS**: Pinata SDK / REST API
