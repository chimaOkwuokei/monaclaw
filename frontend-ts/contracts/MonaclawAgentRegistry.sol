// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title MonaclawAgentRegistry
 * @notice Manages agent registration and metadata for Monaclaw agents
 */
contract MonaclawAgentRegistry is Ownable, Pausable, ReentrancyGuard {
    struct Agent {
        uint256 agentId;
        address creator;
        string metadataURI; // IPFS URI to the JSON metadata
        uint256 createdAt;
        bool isActive;
    }

    uint256 public nextAgentId = 1;
    mapping(uint256 => Agent) public agents;
    mapping(address => uint256[]) public creatorAgents;
    uint256[] public allAgentIds;

    event AgentRegistered(
        uint256 indexed agentId,
        address indexed creator,
        string metadataURI
    );

    event AgentMetadataUpdated(uint256 indexed agentId, string newMetadataURI);
    event AgentStatusChanged(uint256 indexed agentId, bool isActive);

    constructor() Ownable(msg.sender) {}

    modifier agentExists(uint256 agentId) {
        require(agents[agentId].creator != address(0), "Agent does not exist");
        _;
    }

    modifier onlyCreator(uint256 agentId) {
        require(agents[agentId].creator == msg.sender, "Not the agent creator");
        _;
    }

    /**
     * @notice Register a new Monaclaw agent
     * @param metadataURI IPFS URI containing agent details (name, symbol, strategy, image, etc.)
     * @return agentId The auto-generated agent ID
     */
    function registerAgent(string memory metadataURI) 
        external 
        whenNotPaused 
        nonReentrant 
        returns (uint256) 
    {
        require(bytes(metadataURI).length > 0, "Metadata URI cannot be empty");

        uint256 agentId = nextAgentId;
        nextAgentId++;

        agents[agentId] = Agent({
            agentId: agentId,
            creator: msg.sender,
            metadataURI: metadataURI,
            createdAt: block.timestamp,
            isActive: true
        });

        creatorAgents[msg.sender].push(agentId);
        allAgentIds.push(agentId);

        emit AgentRegistered(agentId, msg.sender, metadataURI);

        return agentId;
    }

    /**
     * @notice Update agent metadata
     * @param agentId The ID of the agent to update
     * @param newMetadataURI The new IPFS URI
     */
    function updateAgentMetadata(uint256 agentId, string memory newMetadataURI)
        external
        whenNotPaused
        onlyCreator(agentId)
        agentExists(agentId)
    {
        require(bytes(newMetadataURI).length > 0, "Metadata URI cannot be empty");
        agents[agentId].metadataURI = newMetadataURI;
        emit AgentMetadataUpdated(agentId, newMetadataURI);
    }

    /**
     * @notice Toggle agent active status
     */
    function setAgentStatus(uint256 agentId, bool isActive)
        external
        onlyCreator(agentId)
        agentExists(agentId)
    {
        agents[agentId].isActive = isActive;
        emit AgentStatusChanged(agentId, isActive);
    }

    /**
     * @notice Get agent details
     */
    function getAgent(uint256 agentId) 
        external 
        view 
        agentExists(agentId) 
        returns (Agent memory) 
    {
        return agents[agentId];
    }

    /**
     * @notice Get total number of agents
     */
    function getTotalAgents() external view returns (uint256) {
        return allAgentIds.length;
    }

    /**
     * @notice Get all agents by a creator
     */
    function getAgentsByCreator(address creator)
        external
        view
        returns (uint256[] memory)
    {
        return creatorAgents[creator];
    }

    /**
     * @notice Get all agents registered in the marketplace
     * @return Array of all Agent structs
     */
    function getAllAgents() external view returns (Agent[] memory) {
        uint256 total = allAgentIds.length;
        Agent[] memory allAgents = new Agent[](total);
        for (uint256 i = 0; i < total; i++) {
            allAgents[i] = agents[allAgentIds[i]];
        }
        return allAgents;
    }

    /**
     * @notice Get agents with pagination
     * @param offset Starting index
     * @param limit Maximum number of agents to return
     */
    function getAgentsPaginated(uint256 offset, uint256 limit) 
        external 
        view 
        returns (Agent[] memory) 
    {
        uint256 total = allAgentIds.length;
        if (offset >= total) return new Agent[](0);
        
        uint256 end = offset + limit;
        if (end > total) end = total;
        
        uint256 size = end - offset;
        Agent[] memory result = new Agent[](size);
        for (uint256 i = 0; i < size; i++) {
            result[i] = agents[allAgentIds[offset + i]];
        }
        return result;
    }

    // Admin functions
    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }
}
