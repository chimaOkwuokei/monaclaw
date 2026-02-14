import { Key, Wallet, Bot, } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function XLogin() {
    const navigate = useNavigate();
    return (
        <section className="min-h-screen bg-white flex flex-col text-slate-900">

            {/* --- Header --- */}
            <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-20">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                            <img src="/logo.svg" alt="" />
                            <span className="text-xl  text-slate-900">Monaclaw</span>
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
                        <button onClick={() => navigate('/x-login')} className="bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                            Connect
                        </button>
                    </div>
                </div>
            </header>

            {/* --- Main Content --- */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 -mt-20">

                {/* Central Logo */}
                {/* <div className="mb-8 relative"> */}
                    {/* Decorative blur behind logo */}
                    {/* <img src="/x.svg" alt="" />
                </div> */}

                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                    <Key size={12} />
                    OPERATOR ACCESS
                </div>

                {/* Headline */}
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                    LOGIN WITH <span className="text-blue-600">X</span>
                </h1>

                {/* Subtext */}
                <p className="max-w-md text-slate-500 text-sm md:text-base leading-relaxed mb-10">
                    Connect your X account to get your operator key and start deploying autonomous trading agents.
                </p>

                {/* CTA Button */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-lg shadow-blue-200 transition-all hover:scale-105">
                    {/* Simple X Logo SVG */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Continue with X
                </button>

                {/* Features Footer */}
                <div className="mt-20 grid grid-cols-3 gap-8 md:gap-16">
                    <div className="flex flex-col items-center gap-3 group cursor-default">
                        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            <Key size={18} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-center">Get Operator</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 group cursor-default">
                        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            <Wallet size={18} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-center">Auto Wallet</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 group cursor-default">
                        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            <Bot size={18} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-center">Deploy Agents</span>
                    </div>
                </div>

            </main>
        </section >
    );
}