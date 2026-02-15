export const MONACLAW_AGENT_REGISTRY_ADDRESS = process.env.VITE_MONACLAW_REGISTRY_ADDRESS as `0x${string}` || "0xd3bca83E959192547782C3a901d5EEB5C90b008E";

export const MONACLAW_AGENT_REGISTRY_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "agentId",
        "type": "uint256"
      }
    ],
    "name": "getAgent",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "agentId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "metadataURI",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          }
        ],
        "internalType": "struct MonaclawAgentRegistry.Agent",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
