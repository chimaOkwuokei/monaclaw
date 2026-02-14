import { useState } from "react";
import {
    Copy,
    ExternalLink,
    Trash2,
    Play,
    Settings,
    ChevronDown,
    RefreshCw,
    Clock,
    TrendingUp,
    ChevronRight,
    LogOut,
    ArrowLeft,
    Activity,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface Agent {
    id: string;
    name: string;
    createdTime: string;
    status: 'Active' | 'Pause';
    pnl: string;
    balance: string;
    avatarSeed: string;
}
const AVAILABLE_TAGS = [
    'New Momentum',
    'Entertainment',
    'Politic',
    'Sport',
    'Tech',
    'Finance',
    'Arbitrage',
    'Sentiment'
];
// --- Reusable Components ---

const StatCard = ({ label, value, subLabel }: { label: string, value: string, subLabel?: string }) => (
    <div className="bg-blue-50/30 p-4 rounded-xl min-w-35">
        <p className="text-xs text-blue-400 font-semibold uppercase mb-1">{label}</p>
        <h3 className="text-xl font-bold text-[#007BFF]">{value}</h3>
        {subLabel && <p className="text-xs text-slate-400 mt-1">{subLabel}</p>}
    </div>
);

const SectionHeader = ({ title, subText }: { icon?: any, title: string, subText?: string }) => (
    <div className="flex items-center gap-2 mb-4">
        {/* Replaced Image with Icon for portability */}
        <Settings className="text-blue-500" size={20} />
        <h3 className="text-sm font-bold text-slate-700 uppercase">{title}</h3>
        {subText && <span className="text-xs text-slate-400 font-normal ml-2">{subText}</span>}
    </div>
);

const EmptyState = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
        <Icon size={24} className="text-slate-300 mb-3" />
        <h4 className="text-slate-600 font-medium text-sm">{title}</h4>
        <p className="text-slate-400 text-xs mt-1">{desc}</p>
    </div>
);

export default function Agent() {
    const [riskLevel, setRiskLevel] = useState("Low");
    const navigate = useNavigate();
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Retrieve the agent passed from the previous screen
    // Fallback data provided in case page is refreshed directly
    const agentData = (location.state as { agent: Agent })?.agent || {
        name: "Unknown Agent",
        avatarSeed: "default",
        createdTime: "Just now",
        status: "Active"
    };
    const [selectedTags, setSelectedTags] = useState<string[]>(['New Momentum']);

    // 3. Handler to toggle selection
    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };
    return (
        <div className="min-h-screen bg-white text-slate-800">

            {/* --- 1. HEADER --- */}
            <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md mb-10 z-10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-2">
                            {/* Logo Placeholder */}
                            <img src="/logo.svg" alt="" />
                            <span className="text-xl  text-slate-900">Monaclaw</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
                            <a href="#" className="hover:text-[#007BFF]">Explore</a>
                            <a href="#" className="hover:text-[#007BFF]">Leaderboard</a>
                            <a href="#" className="hover:text-[#007BFF]">Dashboard</a>
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

            <div className="max-w-7xl mx-auto px-6">

                {/* --- BACK BUTTON --- */}
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#007BFF] mb-6 transition-colors"
                >
                    <div className="p-1 ">
                        <ArrowLeft size={18} />
                    </div>
                </button>

                {/* --- 2. AGENT HEADER & ACTIONS --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 overflow-hidden bg-slate-100 border border-slate-200 shadow-sm rounded-xl">
                            <img
                                src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${agentData.avatarSeed}`}
                                alt="Agent"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl font-bold text-slate-900">{agentData.name}</h1>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${agentData.status === 'Active' ? 'bg-blue-100 text-[#007BFF]' : 'bg-amber-100 text-amber-600'}`}>
                                    {agentData.status}
                                </span>
                            </div>
                            <p className="text-sm text-slate-400">Created {agentData.createdTime}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button className="bg-[#007BFF] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm shadow-blue-200">
                            <Play size={16} fill="currentColor" /> Continue Agent
                        </button>
                        <button className="bg-blue-50 hover:bg-blue-100 text-[#007BFF] px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-blue-100">
                            <Copy size={16} /> Copy Key
                        </button>
                        <button
                            onClick={() => navigate("/public-page", { state: { agent: agentData } })}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-blue-100"
                        >
                            <ExternalLink size={16} /> Public page
                        </button>
                        <button className="bg-blue-50 hover:bg-red-50 text-[#007BFF] hover:text-red-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-blue-100 hover:border-red-100">
                            <Trash2 size={16} /> Delete Agent
                        </button>
                    </div>
                </div>

                {/* --- 3. STATS CARDS --- */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10 overflow-x-auto pb-2">
                    <StatCard label="P&L" value="+$450.21" />
                    <StatCard label="Liquid Portfolio" value="$1,240.00" />
                    <StatCard label="Win Rate" value="68%" subLabel="12 Trades" />
                    <StatCard label="Open Position" value="2" />
                    <StatCard label="Total Buybacks" value="4" />
                </div>

                {/* --- 4. MAIN CONTENT GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- LEFT COLUMN (2/3 width) --- */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Strategy Section */}
                        <section>
                            <SectionHeader icon={TrendingUp} title="Strategy" subText="Guides what your agent trades and how it approaches" />

                            <div className="flex flex-wrap gap-2 mb-4">
                                {AVAILABLE_TAGS.map(tag => {
                                    const isSelected = selectedTags.includes(tag);
                                    return (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${isSelected
                                                ? 'bg-[#007BFF] text-white border-[#007BFF] shadow-sm shadow-blue-200'
                                                : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300'
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => console.log('Saved tags:', selectedTags)}
                                className="bg-[#007BFF] text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm shadow-blue-200 w-24 hover:bg-blue-700 transition-colors"
                            >
                                Save
                            </button>
                        </section>

                        {/* Trading Config */}
                        <section>
                            <SectionHeader icon={Settings} title="TRADING CONFIG" subText="your trading agent will not pass this goal" />

                            {/* Risk Level Selector */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {[
                                    { lvl: "Low", desc: "Conversion 75%. Max 3 position" },
                                    { lvl: "Medium", desc: "Conversion 60%. Max 5 position" },
                                    { lvl: "High", desc: "Aggressively 50% min valid." }
                                ].map((item) => (
                                    <div
                                        key={item.lvl}
                                        onClick={() => setRiskLevel(item.lvl)}
                                        className={`p-4 rounded-lg border cursor-pointer transition-all ${riskLevel === item.lvl
                                            ? "bg-[#007BFF] text-white border-[#007BFF] shadow-md shadow-blue-200"
                                            : "bg-blue-50/50 border-blue-100 text-slate-600 hover:border-blue-300"
                                            }`}
                                    >
                                        <h4 className="font-bold text-sm mb-1">{item.lvl}</h4>
                                        <p className={`text-[10px] leading-tight ${riskLevel === item.lvl ? "text-blue-100" : "text-blue-400"}`}>{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Inputs */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">TRADING INTERVAL</label>
                                    <div className="relative">
                                        <select className="w-full bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-sm text-slate-700 appearance-none outline-none focus:border-blue-400">
                                            <option>1h</option>
                                            <option>4h</option>
                                            <option>24h</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={14} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">MAX POSITION (USDC)</label>
                                    <input type="text" defaultValue="100" className="w-full bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-sm text-slate-700 outline-none focus:border-blue-400" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">PROFIT</label>
                                    <input type="text" defaultValue="40" className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-700 outline-none focus:border-blue-400" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">LOSS</label>
                                    <input type="text" defaultValue="40" className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-700 outline-none focus:border-blue-400" />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-4 cursor-pointer hover:text-[#007BFF]">
                                <ChevronRight size={14} /> ADVANCED
                            </div>

                            <button className="bg-[#007BFF] text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm shadow-blue-200 w-24 hover:bg-blue-700 transition-colors">
                                Save
                            </button>
                        </section>

                        <div className="border border-blue-100 rounded-2xl p-1 shadow-sm bg-white">
                            <div className="flex justify-between items-center px-6 py-4 border-b border-dashed border-blue-100">
                                <div className="flex items-center gap-2 text-[#007BFF] font-bold text-sm uppercase">
                                    <RefreshCw size={16} /> Open Position
                                </div>
                                <span className="text-xs text-slate-400">0 active</span>
                            </div>
                            <div className="p-8">
                                <EmptyState icon={Clock} title="No Open Position" desc="Buybacks will appear here once executed" />
                            </div>
                        </div>
                        <div className="border border-blue-100 rounded-2xl p-1 shadow-sm bg-white">
                            <div className="flex justify-between items-center px-6 py-4 border-b border-dashed border-blue-100">
                                <div className="flex items-center gap-2 text-[#007BFF] font-bold text-sm uppercase">
                                    <RefreshCw size={16} /> Withdrawal History
                                </div>
                                <span className="text-xs text-slate-400">0 active</span>
                            </div>
                            <div className="p-8">
                                <EmptyState icon={Clock} title="No withdrawal history" desc="Buybacks will appear here once executed" />
                            </div>
                        </div>
                        {/* BuyBack History (Empty) */}
                        <div className="border border-blue-100 rounded-2xl p-1 shadow-sm bg-white">
                            <div className="flex justify-between items-center px-6 py-4 border-b border-dashed border-blue-100">
                                <div className="flex items-center gap-2 text-[#007BFF] font-bold text-sm uppercase">
                                    <RefreshCw size={16} /> BuyBack History
                                </div>
                                <span className="text-xs text-slate-400">0 active</span>
                            </div>
                            <div className="p-8">
                                <EmptyState icon={Clock} title="No buyback history" desc="Buybacks will appear here once executed" />
                            </div>
                        </div>

                    </div>

                    {/* --- RIGHT COLUMN (1/3 width) --- */}
                    <div className="space-y-6">

                        {/* 1. Token Card */}
                        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                    $
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase">TOKEN</span>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-slate-700">$ HAAJ</h3>
                                <button className="bg-[#3B82F6] hover:bg-blue-600 text-white p-2 rounded-lg shadow-sm transition-colors">
                                    <ExternalLink size={14} />
                                </button>
                            </div>

                            <div className="relative mb-6">
                                <input
                                    readOnly
                                    value="0xf326d5541483c51483cf79390f9067c6891293....."
                                    className="w-full bg-slate-50 border border-slate-100 rounded-lg py-3 px-4 text-xs text-slate-400 outline-none font-mono"
                                />
                                <Copy size={14} className="absolute right-3 top-3.5 text-slate-400 cursor-pointer hover:text-blue-500" />
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400 font-medium">Price</span>
                                    <span className="text-[#3B82F6] font-bold">$0.000000000000</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400 font-medium">Buyback</span>
                                    <span className="text-[#3B82F6] font-bold">$0.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400 font-medium">Token Bough</span>
                                    <span className="text-[#3B82F6] font-bold">$0.000</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Wallet Card */}
                        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                    B
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase">Wallet</span>
                            </div>

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-xs text-slate-400 mb-1">Portfolio value</p>
                                    <h3 className="text-2xl font-bold text-slate-700">$0.00</h3>
                                    <p className="text-xs text-slate-400 mt-1">$0.00 USDC liquid</p>
                                </div>
                                <button className="bg-[#3B82F6] hover:bg-blue-600 text-white p-2 rounded-lg shadow-sm transition-colors">
                                    <RefreshCw size={14} />
                                </button>
                            </div>

                            <div className="mb-4">
                                <label className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase mb-2">
                                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                    DEPOSIT (AUTO BRIDGE TO POLYGON)
                                </label>
                                <div className="relative">
                                    <input
                                        readOnly
                                        value="0xf326d5541483c51483cf79390f9067c6891293....."
                                        className="w-full bg-slate-50 border border-slate-100 rounded-lg py-3 px-4 text-xs text-slate-400 outline-none font-mono"
                                    />
                                    <Copy size={14} className="absolute right-3 top-3.5 text-slate-400 cursor-pointer hover:text-blue-500" />
                                </div>
                            </div>

                            <div className="flex justify-between text-[10px] text-slate-400 mb-2">
                                <span>Min deposited : <span className="font-bold text-slate-600">$10 USDC</span></span>
                                <span>Auto-converted to USDC</span>
                            </div>

                            <p className="text-[10px] text-slate-400 leading-relaxed mb-4 border-b border-dashed border-slate-100 pb-4">
                                Use <span className="font-bold text-slate-600">USDC</span> on <span className="underline decoration-slate-300">Polygon</span> for instance cre Other networks (Instance) <span className="font-bold text-slate-600">Base</span> are bridged to <span className="font-bold text-slate-600">USDC</span> and can be swap in a minute..
                            </p>

                            <div className="flex gap-2 mb-6">
                                <span className="px-4 py-1.5 rounded-lg bg-lime-50 text-lime-600 text-[10px] font-bold uppercase border border-lime-100">
                                    Deployed
                                </span>
                                <span className="px-4 py-1.5 rounded-lg bg-green-50 text-green-600 text-[10px] font-bold uppercase border border-green-100">
                                    Approved
                                </span>
                            </div>

                            <button className="w-full bg-[#007AFF] hover:bg-blue-600 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-colors">
                                <LogOut size={16} className="rotate-180" /> Withdraw Funds
                            </button>
                        </div>

                        {/* 3. Twitter Card */}
                        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <img src="/x.svg" alt="" />
                                <span className="text-xs font-bold text-slate-400 uppercase">TWITTER(X)</span>
                            </div>
                            <button className="w-full bg-[#007AFF] hover:bg-blue-600 text-white py-3 rounded-xl text-xs font-bold transition-colors shadow-lg shadow-blue-200">
                                CONNECT TWITTER (X)
                            </button>
                        </div>

                        {/* 4. API Key Card */}
                        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
                            <div className="mb-4">
                                <p className="text-xs text-slate-400 mb-2">Api Key</p>
                                <h3 className="text-sm font-bold text-slate-900 tracking-widest">pc_agent_••••••••••••</h3>
                            </div>
                            <button className="w-full bg-[#007AFF] hover:bg-blue-600 text-white py-3 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-200">
                                Rotate Key
                            </button>
                        </div>

                        {/* 5. Activities Card */}
                        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <Activity size={16} className="text-slate-400" />
                                <span className="text-xs font-bold text-slate-400 uppercase">ACTIVITIES</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400 font-medium">Last Trade</span>
                                    <span className="text-[#3B82F6] font-bold">Nill</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400 font-medium">Interval</span>
                                    <span className="text-[#3B82F6] font-bold">Every 60 Min</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400 font-medium">Next Run</span>
                                    <span className="text-[#3B82F6] font-bold">Nill</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400 font-medium">Token Trade</span>
                                    <span className="text-[#3B82F6] font-bold">Nill</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400 font-medium">Win Rate</span>
                                    <span className="text-[#3B82F6] font-bold">0 %</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}