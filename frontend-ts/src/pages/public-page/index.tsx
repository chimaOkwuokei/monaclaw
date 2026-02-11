import React from "react";
import {
    ExternalLink,
    Copy,
    Settings,
    ChevronDown,
    TrendingUp,
    FileText,
    Globe,
    ArrowUpRight,
    Wallet,
    CheckCircle2
} from "lucide-react";

// --- Reusable Components ---

const Badge = ({ children, type = "blue" }: { children: React.ReactNode, type?: "blue" | "green" | "gray" }) => {
    const styles = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        gray: "bg-gray-100 text-gray-600"
    };
    return (
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${styles[type]}`}>
            {children}
        </span>
    );
};

const StatRow = ({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) => (
    <div className="flex justify-between items-center text-sm py-1">
        <span className="text-slate-500 font-medium">{label}</span>
        <span className={`font-bold ${highlight ? "text-green-500" : "text-slate-700"}`}>
            {value}
        </span>
    </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white border border-blue-100 rounded-2xl p-6 shadow-sm ${className}`}>
        {children}
    </div>
);

export default function PublicPage() {
    return (
        <div className="min-h-screen bg-white text-slate-800 pb-20">

            {/* --- 1. HEADER --- */}
            <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-20">
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

                {/* --- 2. GRID LAYOUT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* === LEFT COLUMN (2/3 width) === */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Agent Intro */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                                    <img src="/profile.svg" alt="Agent" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h1 className="text-2xl font-bold text-slate-900">Crypto Blast</h1>
                                        <Badge type="green">Active</Badge>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-500">
                                        <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">Crypto Strategy</span>
                                        <span>Created 2d ago</span>
                                        <span>0 trades</span>
                                    </div>
                                </div>
                            </div>

                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg w-fit text-sm transition-colors">
                                Buy $Haajcoin
                            </button>
                        </div>

                        {/* Management Banner */}
                        <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-md border border-slate-200 text-slate-600">
                                    <Settings size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Manage this agent</p>
                                    <p className="text-xs text-slate-500">Configure settings, withdraw assets and more</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs font-bold text-slate-600 cursor-pointer hover:text-blue-600">
                                Dashboard <ArrowUpRight size={14} />
                            </div>
                        </div>

                        {/* Stats & Strategy Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">ACTIVITY</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Last Trade</span>
                                        <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded text-xs">Nill</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Win Rate</span>
                                        <span className="text-blue-600 font-bold">0</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Open positions</span>
                                        <span className="text-blue-600 font-bold">0</span>
                                    </div>
                                </div>
                            </Card>

                            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase">STRATEGY NOTE</h3>
                                    <FileText size={14} className="text-blue-500" />
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                    Buy when price breaks resistance & sell when momentum
                                </p>
                            </div>
                        </div>

                        {/* Chart Section (Mockup) */}
                        <div className="border border-blue-100 rounded-2xl bg-white shadow-sm overflow-hidden h-200 flex flex-col">
                            {/* Chart Header */}
                            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <TrendingUp size={16} className="text-slate-500" />
                                    <span className="text-sm font-bold text-slate-700 uppercase">$HAAJ PRICE</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400 border px-2 py-1 rounded bg-slate-50">
                                    GeckoTerminal <ExternalLink size={10} />
                                </div>
                            </div>

                            {/* Chart Placeholder Image/Content */}
                            <div className="flex-1 bg-white p-4 relative">
                                {/* Top Bar of Chart */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">H</div>
                                        <span className="font-bold text-sm">HaajCoin / USD Coin</span>
                                    </div>
                                    <div className="text-red-500 text-xs font-mono">1,280.55</div>
                                </div>

                                {/* Chart Visual Mock (Bars) */}
                                <img src="/chart.svg" alt="Agent" className="w-full h-full object-fit" />

                                <div className="text-center text-[10px] text-blue-400 mt-2">Powered by Gecko Terminal</div>
                            </div>
                        </div>

                    </div>

                    {/* === RIGHT COLUMN (1/3 width) === */}
                    <div className="space-y-6">

                        {/* Token Info Card */}
                        <Card>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">TOKEN</p>
                                    <h2 className="text-lg font-bold text-slate-900">$HAAJ</h2>
                                </div>
                                <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                                    <ExternalLink size={16} />
                                </button>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-3xl font-bold text-slate-900">$0.000004</span>
                                    <span className="text-xs font-bold text-green-500 mb-1.5 bg-green-50 px-1.5 py-0.5 rounded">~ 0.0 %</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer hover:text-blue-500 group">
                                    <Globe size={12} />
                                    <span className="group-hover:underline">0xf2ebe...23999</span>
                                    <Copy size={12} />
                                </div>
                            </div>

                            <div className="space-y-2 border-t border-dashed border-gray-100 pt-4">
                                <h4 className="text-xs font-bold text-slate-400 mb-2">Activity</h4>
                                <StatRow label="TOTAL P & L" value="+0.00 -0.00" highlight />
                                <StatRow label="WIN RATE" value="0%" />
                                <StatRow label="TOTAL TRADE" value="0%" />
                                <StatRow label="MARKET CAP" value="$0.00" />
                                <StatRow label="PORTFOLIO VALUE" value="$0.00" />
                                <StatRow label="OPEN MARKET" value="0 Trade" />
                            </div>
                        </Card>

                        {/* Performance Card */}
                        <Card>
                            <h3 className="text-sm font-bold text-slate-800 mb-4">Performance</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase border-b border-gray-50 pb-2">
                                    <span>Activity</span>
                                </div>

                                <StatRow label="WIN RATE" value="0" />
                                <StatRow label="TOTAL TRADE" value="0" />
                                <StatRow label="Winning Trades" value="0" />
                                <StatRow label="Open Positions" value="0" />
                                <StatRow label="Last Trade" value="Never" />
                                <StatRow label="Next Run" value="Due now" />
                            </div>
                        </Card>

                        {/* Contract / Action Card */}
                        <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm ring-4 ring-blue-50/50">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                        <Wallet size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold">TOKEN</p>
                                        <h3 className="font-bold text-slate-900">$HAAJ</h3>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-blue-600">
                                    <Copy size={18} />
                                </button>
                            </div>

                            <div className="mb-4">
                                <h2 className="text-2xl font-bold text-slate-900">$0.000004</h2>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                    <CheckCircle2 size={12} className="text-slate-400" />
                                    <span>CONTRACT (Monad)</span>
                                </div>
                                <p className="text-[10px] font-mono text-slate-400 mt-1 break-all">
                                    0xC27A3Dd166E2...dEe1a89e22
                                </p>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button className="flex-1 flex items-center justify-center gap-2 border border-blue-200 text-blue-600 text-xs font-bold py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
                                    Monadscan <ExternalLink size={12} />
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 border border-blue-200 text-blue-600 text-xs font-bold py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
                                    Dexscreener <ExternalLink size={12} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}