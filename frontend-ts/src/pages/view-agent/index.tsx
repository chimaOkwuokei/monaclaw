import { useEffect, useState } from 'react';
import Navbar from '@/components/ui/navbar';
import {
    Search,
    Plus,
    ChevronDown,
    Trophy,
    Users,
    Activity,
    Zap,
    Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPublicClient, http } from 'viem';
import { monadTestnet } from 'viem/chains';
import { MONACLAW_AGENT_REGISTRY_ADDRESS, MONACLAW_AGENT_REGISTRY_ABI } from '@/lib/constants';

// --- Types ---
interface AgentMetadata {
    agentName: string;
    tokenSymbol: string;
    strategyType: string;
    strategyDescription: string;
    image?: string;
    readme?: string;
}

interface AgentCardData {
    id: number;
    name: string;
    handle: string;
    status: string;
    type: string;
    desc: string;
    tokenTicker: string;
    tokenPrice: string;
    tokenChange: string;
    pnl: string;
    pnlPositive: boolean;
    winRate: string;
    mcap: string;
    avatar: string;
}

const stats = [
    { label: 'TOTAL P&L', value: '$48.2K', change: '+12.4%', icon: Trophy, isPositive: true },
    { label: 'ACTIVE AGENTS', value: '127', change: '+8', icon: Users, isPositive: true },
    { label: 'AVG WIN RATE', value: '64%', change: '+2.1%', icon: Activity, isPositive: true },
    { label: 'TRADES 24H', value: '342', change: '+45', icon: Zap, isPositive: true },
];

const publicClient = createPublicClient({
    chain: monadTestnet,
    transport: http()
});

const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

const formatIpfsUrl = (url: string) => {
    if (!url) return './icon-1.svg';
    if (url.startsWith('ipfs://')) {
        return url.replace('ipfs://', IPFS_GATEWAY);
    }
    return url;
};

export default function ViewAgentPage() {
    const [agents, setAgents] = useState<AgentCardData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                // 1. Get all agents from contract
                const contractAgents = await publicClient.readContract({
                    address: MONACLAW_AGENT_REGISTRY_ADDRESS,
                    abi: MONACLAW_AGENT_REGISTRY_ABI,
                    functionName: 'getAllAgents',
                }) as any[];

                // 2. Fetch metadata for each agent
                const fetchedAgents = await Promise.all(contractAgents.map(async (agent: any) => {
                    try {
                        let metadata: AgentMetadata = {
                            agentName: 'Unknown',
                            tokenSymbol: '???',
                            strategyType: 'UNKNOWN',
                            strategyDescription: 'No description available.'
                        };

                        const ipfsUrl = formatIpfsUrl(agent.metadataURI);
                        const response = await fetch(ipfsUrl);
                        if (response.ok) {
                            metadata = await response.json();
                        }

                        return {
                            id: Number(agent.agentId),
                            name: metadata.agentName,
                            handle: `@${metadata.agentName.toLowerCase().replace(/\s/g, '')}`,
                            status: agent.isActive ? 'LIVE' : 'PAUSED',
                            type: metadata.strategyType.toUpperCase(),
                            desc: metadata.strategyDescription,
                            tokenTicker: `$${metadata.tokenSymbol}`,
                            tokenPrice: '$0.0000', // Mock for now
                            tokenChange: '+0.0%', // Mock
                            pnl: '+0.00%', // Mock
                            pnlPositive: true,
                            winRate: '0%', // Mock
                            mcap: '$0', // Mock
                            avatar: formatIpfsUrl(metadata.image || '')
                        } as AgentCardData;
                    } catch (err) {
                        console.error(`Error fetching metadata for agent ${agent.agentId}:`, err);
                        return null;
                    }
                }));

                setAgents(fetchedAgents.filter(a => a !== null) as AgentCardData[]);
            } catch (error) {
                console.error('Error fetching agents:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAgents();
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#0B0E14] text-gray-300 p-4 md:p-8">
                {/* --- Header Section --- */}
                <div className="max-w-7xl mx-auto mb-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded uppercase tracking-wider">
                                <Activity className="w-3 h-3 inline mr-1" /> Live Directory
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                                EXPLORE <span className="text-[#3b82f6]">AGENTS</span>
                            </h1>
                            <p className="text-gray-400 max-w-xl text-sm md:text-base">
                                Discover autonomous trading agents. View performance, strategies, and buy tokens to share in their success.
                            </p>
                        </div>

                        <Link
                            to="/deploy-agent"
                            className="group bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-3.5 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)]"
                        >
                            <Plus className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            Deploy Agent
                        </Link>
                    </div>

                    {/* --- Stats Bar --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-[#131823] border border-white/5 p-4 rounded-xl flex items-center gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold tracking-wider mb-1">{stat.label}</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold text-white">{stat.value}</span>
                                        <span className="text-xs font-medium text-[#DDFE5F]">{stat.change}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- Controls / Filter Bar --- */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search agents, tokens, strategies..."
                                className="w-full bg-[#131823] border border-white/5 text-sm text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-blue-500/50 transition-colors"
                            />
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="flex items-center gap-2 text-sm text-gray-400 mr-auto md:mr-4">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                {agents.length} agents found
                            </div>

                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 bg-[#131823] border border-white/5 px-4 py-2.5 rounded-lg text-sm text-white hover:bg-white/5 transition-colors">
                                    Sort: <span className="font-semibold">P&L</span> <ChevronDown className="w-4 h-4 text-gray-500" />
                                </button>
                                <button className="flex items-center gap-2 bg-[#131823] border border-white/5 px-4 py-2.5 rounded-lg text-sm text-white hover:bg-white/5 transition-colors">
                                    Status: <span className="font-semibold">All Agents</span> <ChevronDown className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* --- Agent Grid --- */}
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                            <p className="text-gray-500 font-medium tracking-wide">Loading directory...</p>
                        </div>
                    ) : agents.length === 0 ? (
                        <div className="text-center py-20 bg-[#131823] rounded-2xl border border-white/5">
                            <p className="text-gray-500 mb-4">No agents found in the registry.</p>
                            <Link to="/deploy-agent" className="text-blue-500 hover:underline font-medium">Be the first to deploy an agent!</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {agents.map((agent) => (
                                <div key={agent.id} className="bg-[#131823] border border-white/5 rounded-xl p-5 hover:border-blue-500/30 transition-all group">
                                    {/* Card Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-3">
                                            <img
                                                src={agent.avatar}
                                                alt={agent.name}
                                                className="w-12 h-12 rounded-lg object-cover bg-[#1A1F2E]"
                                            />
                                            <div>
                                                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                                    {agent.name}
                                                </h3>
                                                <p className="text-gray-500 text-xs">{agent.handle}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider">
                                            <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'LIVE' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-500'}`}></div>
                                            <span className={agent.status === 'LIVE' ? 'text-green-500' : 'text-gray-500'}>{agent.status}</span>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="mb-4">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded border ${agent.type === 'CRYPTO' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' :
                                            agent.type === 'SPORTS' ? 'border-orange-500/30 text-orange-400 bg-orange-500/10' :
                                                'border-purple-500/30 text-purple-400 bg-purple-500/10'
                                            }`}>
                                            {agent.type}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-400 text-xs leading-relaxed mb-6 h-10 overflow-hidden line-clamp-2">
                                        {agent.desc}
                                    </p>

                                    {/* Token Info Row */}
                                    <div className="flex justify-between items-end mb-4 pb-4 border-b border-white/5">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Token</p>
                                            <p className="text-white font-bold">{agent.tokenTicker}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-mono">{agent.tokenPrice}</p>
                                            <p className="text-[10px] text-[#DDFE5F]">{agent.tokenChange}</p>
                                        </div>
                                    </div>

                                    {/* Metrics Row */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">P&L</p>
                                            <p className={`font-mono font-bold ${agent.pnlPositive ? 'text-[#DDFE5F]' : 'text-red-500'}`}>
                                                {agent.pnl}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">WIN</p>
                                            <p className="text-white font-mono font-bold">{agent.winRate}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">MCAP</p>
                                            <p className="text-white font-mono font-bold">{agent.mcap}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}