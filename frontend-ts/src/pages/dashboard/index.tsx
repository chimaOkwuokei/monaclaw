import { useState } from 'react';
import {
    Plus,
    BarChart3,
    Link as LinkIcon,
    ExternalLink,
    Search,
    Settings,
    ChevronDown,
    LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// --- Types & Mock Data ---

export interface Agent {
    id: string;
    name: string;
    createdTime: string;
    status: 'Active' | 'Pause';
    pnl: string;
    balance: string;
    avatarSeed: string;
}

const MOCK_AGENTS: Agent[] = [
    {
        id: '1',
        name: 'Crypto Blast',
        createdTime: '14h ago',
        status: 'Active',
        pnl: '+$450.21',
        balance: '$1,240.00',
        avatarSeed: 'CryptoBlast'
    },
    {
        id: '2',
        name: 'Alpha Sniper',
        createdTime: '2d ago',
        status: 'Pause',
        pnl: '+$12.50',
        balance: '$500.00',
        avatarSeed: 'AlphaSniper'
    }
];

// --- Sub-Components ---

const StatCard = ({ label, value, icon: Icon }: { label: string, value: string, icon: any }) => (
    <div className="bg-[#007BFF] rounded-xl p-4 flex items-center gap-4 text-white flex-1 min-w-50 shadow-lg shadow-blue-900/10 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="bg-white h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
            <Icon size={20} className="text-[#007BFF]" />
        </div>
        <div>
            <p className="text-xs font-medium opacity-90 uppercase tracking-wide">{label}</p>
            <h3 className="text-2xl  text-[#FAFF00]">{value}</h3>
        </div>
    </div>
);

const AgentCard = ({ agent }: { agent: Agent }) => {
    const navigate = useNavigate();
    const isPaused = agent.status === 'Pause';

    const handleManage = () => {
        // Navigate to manage page and pass the agent object as state
        navigate('/manage-agent', { state: { agent } });
    };

    return (
        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                        <img
                            src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${agent.avatarSeed}`}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 className=" text-slate-900">{agent.name}</h3>
                        <p className="text-xs text-slate-400">Created {agent.createdTime}</p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-md text-[10px]  uppercase text-white ${isPaused ? 'bg-[#F59E0B]' : 'bg-[#3B82F6]'}`}>
                    {agent.status}
                </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">TOTAL P&L</p>
                    <p className="text-lg  text-slate-700">{agent.pnl}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">BALANCE</p>
                    <p className="text-blue-500  text-lg">{agent.balance}</p>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-2">
                <button
                    onClick={handleManage}
                    className="bg-[#007BFF] hover:bg-[#007BFF] text-white px-6 py-2.5 rounded-lg text-xs  flex items-center gap-2 transition-colors"
                >
                    <Settings size={14} /> Manage
                </button>

                <button className="text-xs text-slate-500 hover:text-[#007BFF] flex items-center gap-1 font-medium transition-colors">
                    Export Key <ExternalLink size={12} />
                </button>
            </div>
        </div>
    );
};

// --- Main Page Component ---

export default function OperatorDashboard() {
    const [hasAgents, _setHasAgents] = useState(true); // Default to true to see the UI
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white text-slate-800 ">
            {/* --- 1. HEADER --- */}
            <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md mb-10 z-10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-2">
                            {/* Logo Placeholder */}
                            <img src="/logo.svg" alt="" />
                            <Link to="/" className="shrink-0">
                                <span className="text-lg tracking-wide">
                                    Monaclaw
                                </span>
                            </Link>

                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
                            <a href="/view-agent" className="hover:text-[#007BFF]">Explore</a>
                            <a href="#" className="hover:text-[#007BFF]">Leaderboard</a>
                            <a href="/dashboard" className="hover:text-[#007BFF]">Dashboard</a>
                        </nav>
                    </div>


                    <div className="flex items-center gap-4">

                        <button className="text-gray-500 hover:text-gray-300 transition-colors">
                            <img src="/x.svg" alt="X" />
                        </button>

                        {/* Container needs relative positioning for the dropdown */}
                        <div className="relative">

                            {/* Profile Trigger */}
                            <div
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 border rounded-full px-3 py-1.5 cursor-pointer hover:bg-gray-50 select-none transition-colors"
                            >
                                <div className="w-6 h-6 bg-slate-200 overflow-hidden rounded-full">
                                    <img src="/profile.svg" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-sm font-semibold">HaajDefi</span>
                                <ChevronDown
                                    size={14}
                                    className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                />
                            </div>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <button
                                        onClick={() => {
                                            console.log("Logging out...");
                                            // Add your actual logout logic here
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 transition-colors"
                                    >
                                        <LogOut size={14} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </header>
            {/* --- Dev Toggle --- */}
            {/* <div className="fixed top-4 right-4 z-50">
                <label className="flex items-center gap-2 cursor-pointer bg-slate-900 text-white px-4 py-2 rounded-full text-xs  shadow-xl">
                    <input
                        type="checkbox"
                        checked={hasAgents}
                        onChange={(e) => setHasAgents(e.target.checked)}
                        className="accent-blue-500"
                    />
                    Toggle View ({hasAgents ? 'Filled' : 'Empty'})
                </label>
            </div> */}

            <div className="max-w-6xl mx-auto">

                {/* --- Header --- */}
                <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-[#0F172A] mb-2 uppercase tracking-tight">Operator Dashboard</h1>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                                <span className="font-mono">0xf2ebe...23999</span>
                            </div>
                            <span className="flex items-center gap-1">
                                Network Status <LinkIcon size={12} className="text-purple-500" />
                            </span>
                        </div>
                    </div>

                    <button onClick={() => navigate('/deploy-agent')} className="bg-[#007BFF] hover:bg-[#007BFF] text-white px-6 py-3 rounded-xl text-sm  flex items-center gap-2 shadow-lg  transition-all">
                        <Plus size={18} /> Create Agent
                    </button>
                </div>

                {/* --- Stats Container --- */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mb-12">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <StatCard label="Total P&L" value="+$0.00" icon={BarChart3} />
                        <div className="bg-[#007BFF] rounded-xl p-4 flex items-center gap-4 text-white flex-1 min-w-50 shadow-lg shadow-blue-900/10">
                            <div className="bg-white h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
                                <BarChart3 size={20} className="text-[#007BFF]" />
                            </div>
                            <div>
                                <p className="text-xs font-medium opacity-90 uppercase tracking-wide">Total Bal</p>
                                <h3 className="text-2xl  text-white">+$0.00</h3>
                            </div>
                        </div>
                        <StatCard label="Buy Backs" value="+$0.00" icon={BarChart3} />
                        {/* Simple Counter Card */}
                        <div className="bg-[#007BFF] rounded-xl p-4 flex items-center gap-4 text-white flex-1 min-w-50 shadow-lg shadow-blue-900/10">
                            <div className="bg-white h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
                                <BarChart3 size={20} className="text-[#007BFF]" />
                            </div>
                            <div>
                                <p className="text-xs font-medium opacity-90 uppercase tracking-wide">Active Agents</p>
                                <h3 className="text-2xl  text-white">{hasAgents ? '2/5' : '0/0'}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Agents Grid --- */}
                {hasAgents ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {MOCK_AGENTS.map((agent) => (
                            <AgentCard key={agent.id} agent={agent} />
                        ))}
                    </div>
                ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
                            <Search size={32} />
                        </div>
                        <p className="text-slate-400 text-sm font-medium">No active agents found.</p>
                        <p className="text-slate-300 text-xs mt-1">Create an agent to get started.</p>
                    </div>
                )}

            </div>
        </div>
    );
}