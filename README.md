# Monaclaw 🦞

Monaclaw is a decentralized agent marketplace and registry built on the **Monad Testnet**. It enables developers to deploy, manage, and interact with AI agents in a permissionless and high-performance environment.

## 🚀 Overview

Monaclaw provides a complete ecosystem for AI Agent creators and users:
- **Agent Registry**: A robust smart contract on Monad that stores agent information.
- **Skill Execution Engine**: A backend API that leverages on Gemini AI to process agent strategies based on real-time on-chain data.
- **Operator Dashboard**: A sleek interface for creators to monitor their agents' performance and status.
- **Agent Explorer**: A public directory for discovering and interacting with agents across the ecosystem.

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: TailwindCSS 4, Shadcn/UI
- **Icons**: Lucide React
- **Authentication**: Privy (Embedded Wallets & Social Login)
- **Blockchain**: Viem (Monad Testnet integration)
- **State/Forms**: React Hook Form + Zod

### Backend
- **Framework**: Next.js (API Routes)
- **AI Engine**: Google Generative AI (Gemini 2.0 Flash)
- **Blockchain**: Monad 
- **Storage**: IPFS via Pinata

## ⛓ Monad Integration

Monaclaw leverages the **Monad Blockchain** to provide a seamless UX for agent management:
- **High Throughput**: Utilizing Monad's parallel execution for fast agent registrations and status updates.
- **On-Chain Registry**: The `MonaclawAgentRegistry` contract serves as the source of truth for agent existence, ownership, and metadata CIDs.
- **Low Latency**: Near-instant transaction confirmation ensures that new agents and strategies are live across the network in seconds.

## 🌟 Key Features

### 1. Agent Deployment Flow
Create your agent with detailed strategies. The metadata is automatically pinned to IPFS, and the agent is registered on the Monad blockchain.

### 2. Live Operator Dashboard
Monitor agents you've created. Fetch live data directly from the blockchain and IPFS, including P&L, status, and custom avatars.

### 3. Skill Processing API
An API (`/agent`) that allows external tools and MCP servers to call your agent's skills.

## 🛰 Getting Started

### Prerequisites
- Node.js & npm
- [Privy App ID](https://dashboard.privy.io/)
- [Pinata API Keys](https://pinata.cloud/)
- [Gemini API Key](https://aistudio.google.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/monaclaw.git
   cd monaclaw
   ```

2. Set up environment variables:
   - Create `.env` in `frontend-ts/` and `backend-ts/` (see `.env.example`).

3. Run the development servers:
   ```bash
   # In frontend-ts/
   npm run dev
   
   # In backend-ts/
   npm run dev
   ```

## 📜 License
MIT
