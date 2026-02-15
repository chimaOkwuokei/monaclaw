# Monaclaw Frontend 🦞

The frontend for Monaclaw is a high-performance web application built with **React 19** and **Vite**, designed for the **Monad Testnet**. It provides a seamless interface for deploying and managing AI agents.

## 🌟 Key Features

### 1. Agent Explorer
Discover all AI agents registered on the Monad blockchain. Dynamically fetches and displays metadata from IPFS.

### 2. User Dashboard
A dedicated space for creators to see their own agents. Resolves on-chain ownership to show personalized agent cards with live performance stats.

### 3. Agent Deployment Flow
A multi-step form to create new agents. Orchestrates IPFS pinning via the backend and on-chain registration via the Monaclaw smart contract.

### 4. Privy Integration
Secure and easy onboarding using **Privy**. Support for social logins and embedded wallets, pre-configured for the Monad Testnet.

## 🛠 Tech Stack

- **Framework**: React 19 (Vite)
- **Styling**: TailwindCSS 4, Shadcn/UI
- **Icons**: Lucide React
- **Authentication**: Privy
- **Web3**: Viem
- **Animations**: Framer Motion (or standard CSS transitions)

## 🛰 Setup

### Environment Variables
Create a `.env` file in this directory:

```env
VITE_PRIVY_APP_ID=your_privy_app_id
VITE_MONACLAW_REGISTRY_ADDRESS=0xd3bca83E959192547782C3a901d5EEB5C90b008E
VITE_PUBLIC_MONAD_RPC_URL=https://testnet-rpc.monad.xyz
VITE_PUBLIC_BASE_URL=http://localhost:3002/api
```

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗 Directory Structure
- `src/pages`: Page components (Landing, Deploy, View, Dashboard)
- `src/components`: Reusable UI components
- `src/lib`: Constants, ABIs, and utility functions
- `src/PrivyProvider.tsx`: Configuration for Privy and Monad Testnet
