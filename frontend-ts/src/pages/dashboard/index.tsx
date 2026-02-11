import { useState } from "react";
import {
    Copy,
    ExternalLink,
    Trash2,
    Play,
    Settings,
    ChevronDown,
    RefreshCw,
    Activity,
    Clock,
    TrendingUp,
    ChevronRight,
    LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Mock Data & Reusable Components ---

const StatCard = ({ label, value, subLabel }: { label: string, value: string, subLabel?: string }) => (
    <div className="bg-blue-50/30 p-4 rounded-xl min-w-35">
        <p className="text-xs text-blue-400 font-semibold uppercase mb-1">{label}</p>
        <h3 className="text-xl font-bold text-blue-600">{value}</h3>
        {subLabel && <p className="text-xs text-slate-400 mt-1">{subLabel}</p>}
    </div>
);

const SectionHeader = ({ title, subText }: { icon?: any, title: string, subText?: string }) => (
    <div className="flex items-center gap-2 mb-4">
        {<img src="/strategy.svg" alt="Agent" className="w-[22px] h-[22px] object-cover" />}
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

export default function DashboardPage() {
    // Mock State for UI interactivity
    const [riskLevel, setRiskLevel] = useState("Low");
    // const [activeTab, setActiveTab] = useState("open");
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white text-slate-800 pb-20">

            {/* --- 1. HEADER --- */}
            <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-2">
                            {/* Logo Placeholder */}
                            <img src="/logo.svg" alt="" />
                            <span className="text-xl font-bold text-slate-900">Monaclaw</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
                            <a href="#" className="hover:text-blue-600">Explore</a>
                            <a href="#" className="hover:text-blue-600">Leaderboard</a>
                            <a href="#" className="hover:text-blue-600">Dashboard</a>
                        </nav>
                    </div>


                    <div className="flex items-center gap-4">

                        <button className="text-gray-500 hover:text-gray-300 transition-colors">
                            <img src="/x.svg" alt="" />
                        </button>
                        <div className="flex items-center gap-2 border rounded-full px-3 py-1.5 cursor-pointer hover:bg-gray-50">
                            <div className="w-6 h-6 bg-slate-200 overflow-hidden">
                                <img src="/profile.svg" alt="User" />
                            </div>
                            <span className="text-sm font-semibold">HaajDefi</span>
                            <ChevronDown size={14} className="text-slate-400" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 pt-8">

                {/* --- 2. AGENT HEADER & ACTIONS --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                            <img src="/profile.svg" alt="Agent" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl font-bold text-slate-900">Crypto Blast</h1>
                                <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Active</span>
                            </div>
                            <p className="text-sm text-slate-400">Created 14h ago</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm shadow-blue-200">
                            <Play size={16} fill="currentColor" /> Continue Agent
                        </button>
                        <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-blue-100">
                            <Copy size={16} /> Copy Key
                        </button>
                        <button onClick={() => navigate("/public-page")} className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-blue-100">
                            <ExternalLink size={16} /> Public page
                        </button>
                        <button className="bg-blue-50 hover:bg-red-50 text-blue-600 hover:text-red-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-blue-100 hover:border-red-100">
                            <Trash2 size={16} /> Delete Agent
                        </button>
                    </div>
                </div>

                {/* --- 3. STATS CARDS --- */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10 overflow-x-auto pb-2">
                    <StatCard label="P&L" value="+$0.00" />
                    <StatCard label="$0.00 Liquid Portfolio" value="+$0.00" />
                    <StatCard label="Win Rate | 0 Trades" value="+$0.00" />
                    <StatCard label="Open Position" value="0" />
                    <StatCard label="Total Buybacks" value="0" />
                </div>

                {/* --- 4. MAIN CONTENT GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- LEFT COLUMN (2/3 width) --- */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Strategy Section */}
                        <section>
                            <SectionHeader icon={TrendingUp} title="Strategy" subText="Guides what your agent trades and how it approaches" />
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-sm shadow-blue-200">New Momentum</span>
                                {['Entertainment', 'Politic', 'Sport', 'Tech', 'Finance', 'Arbitrage', 'Sentiment'].map(tag => (
                                    <span key={tag} className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-500 hover:border-blue-300 cursor-pointer">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm shadow-blue-200 w-24">
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
                                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
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

                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-4 cursor-pointer">
                                <ChevronRight size={14} /> ADVANCED
                            </div>

                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm shadow-blue-200 w-24">
                                Save
                            </button>
                        </section>

                        {/* Open Position (Empty) */}
                        <div className="border border-blue-100 rounded-2xl p-1 shadow-sm">
                            <div className="flex justify-between items-center px-6 py-4 border-b border-dashed border-blue-100">
                                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase">
                                    <Activity size={16} /> OPEN POSITION
                                </div>
                                <span className="text-xs text-slate-400">0 active</span>
                            </div>
                            <div className="p-8">
                                <EmptyState icon={Activity} title="No open position" desc="" />
                            </div>
                        </div>

                        {/* Withdrawal History (Empty) */}
                        <div className="border border-blue-100 rounded-2xl p-1 shadow-sm">
                            <div className="flex justify-between items-center px-6 py-4 border-b border-dashed border-blue-100">
                                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase">
                                    <Clock size={16} /> Withdrawal History
                                </div>
                                <span className="text-xs text-slate-400">0 active</span>
                            </div>
                            <div className="p-8">
                                <EmptyState icon={Clock} title="No withdrawal history" desc="Withdrawals will appear here once processed" />
                            </div>
                        </div>

                        {/* BuyBack History (Empty) */}
                        <div className="border border-blue-100 rounded-2xl p-1 shadow-sm">
                            <div className="flex justify-between items-center px-6 py-4 border-b border-dashed border-blue-100">
                                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase">
                                    <RefreshCw size={16} /> BuyBack History
                                </div>
                                <span className="text-xs text-slate-400">0 active</span>
                            </div>
                            <div className="p-8">
                                <EmptyState icon={Clock} title="No withdrawal history" desc="Buybacks will appear here once executed" />
                            </div>
                        </div>

                    </div>

                    {/* --- RIGHT COLUMN (1/3 width) --- */}
                    <div className="space-y-6">

                        {/* Token Card */}
                        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-xs font-bold text-slate-400 uppercase">TOKEN</span>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <span className="font-bold text-slate-700">$ HAAJ</span>
                                <button className="bg-blue-500 text-white p-1.5 rounded-md hover:bg-blue-600 transition-colors">
                                    <ExternalLink size={12} />
                                </button>
                            </div>

                            <div className="relative mb-6">
                                <input readOnly value="0x4528d55414B3c0f4B3CPT9390f9367c6891235......" className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2 pl-3 pr-8 text-xs text-slate-400 truncate" />
                                <Copy size={12} className="absolute right-3 top-2.5 text-slate-400 cursor-pointer hover:text-blue-500" />
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Price</span>
                                    <span className="text-blue-600 font-bold">$0.000000000000</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Buyback</span>
                                    <span className="text-blue-600 font-bold">$0.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Token Bought</span>
                                    <span className="text-blue-600 font-bold">$0.000</span>
                                </div>
                            </div>
                        </div>

                        {/* Wallet Card */}
                        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-xs font-bold text-slate-400 uppercase">WALLET</span>
                            </div>

                            <div className="mb-6">
                                <p className="text-xs text-slate-500 mb-1">Portfolio Value</p>
                                <h3 className="text-2xl font-bold text-slate-800">$0.00</h3>
                                <p className="text-xs text-slate-400">$0.00 USDC liquid</p>
                            </div>

                            <div className="mb-4">
                                <label className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase mb-2">
                                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                    DEPOSIT (AUTO BRIDGE TO POLYGON)
                                </label>
                                <div className="relative">
                                    <input readOnly value="0x4528d55414B3c0f4B3CPT9390f9367c6891299......" className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2 pl-3 pr-8 text-xs text-slate-400 truncate" />
                                    <Copy size={12} className="absolute right-3 top-2.5 text-slate-400 cursor-pointer hover:text-blue-500" />
                                </div>
                            </div>

                            <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
                                Min deposited: <span className="font-bold text-slate-600">$10 USDC</span>. Auto-converted to USDC.
                                <br /><br />
                                Use <span className="font-bold text-slate-600">USDC</span> on Polygon for instance chk Other networks (Base, etc) are bridged to <span className="font-bold text-slate-600">USDC</span> and can be slow in a minute..
                            </p>

                            <div className="flex gap-2 mb-6">
                                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase">Deployed</span>
                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-bold uppercase">Approved</span>
                            </div>

                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm shadow-blue-200">
                                <LogOut size={16} /> Withdraw Funds
                            </button>
                        </div>

                        {/* Twitter Connect */}
                        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs font-bold text-slate-400 uppercase">TWITTER(X)</span>
                            </div>
                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-xs font-bold">
                                CONNECT TWITTER (X)
                            </button>
                        </div>

                        {/* Activities */}
                        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-xs font-bold text-slate-400 uppercase">ACTIVITIES</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-xs items-center">
                                    <span className="text-slate-400 font-medium">Last Trade</span>
                                    <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">Nill</span>
                                </div>
                                <div className="flex justify-between text-xs items-center">
                                    <span className="text-slate-400 font-medium">Interval</span>
                                    <span className="text-blue-600 font-bold">Every 60 Min</span>
                                </div>
                                <div className="flex justify-between text-xs items-center">
                                    <span className="text-slate-400 font-medium">Next Run</span>
                                    <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">Nill</span>
                                </div>
                                <div className="flex justify-between text-xs items-center">
                                    <span className="text-slate-400 font-medium">Token Trade</span>
                                    <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">Nill</span>
                                </div>
                                <div className="flex justify-between text-xs items-center">
                                    <span className="text-slate-400 font-medium">Win Rate</span>
                                    <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">0 %</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}