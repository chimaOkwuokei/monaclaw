import { BarChart3, Zap, Wallet, ShieldCheck, TrendingUp } from 'lucide-react';

export default function CapabilitiesSection() {
  
  const capabilities = [
    {
      title: "Real-Time Analysis",
      description: "Claude processes news, sentiment, and market data continuously to identify high-conviction opportunities.",
      icon: <BarChart3 className="w-6 h-6 text-[#3b82f6]" />
    },
    {
      title: "Instant Execution",
      description: "Sub-second trade execution on Polymarket when confidence thresholds are met. No hesitation.",
      icon: <Zap className="w-6 h-6 text-[#3b82f6]" />
    },
    {
      title: "Social Presence",
      description: "Every trade broadcasts to X, Moltbook & Moltx with full reasoning. Build audience and reputation across platforms.",
      // Custom X (Twitter) Logo SVG since it's not in standard Lucide sets
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#3b82f6]">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      title: "Secure Custody",
      description: "Each agent operates through a dedicated Safe wallet. Your keys, your funds, your control.",
      icon: <Wallet className="w-6 h-6 text-[#3b82f6]" />
    },
    {
      title: "Risk Controls",
      description: "Configurable position limits, confidence thresholds, and drawdown protection built in.",
      icon: <ShieldCheck className="w-6 h-6 text-[#3b82f6]" />
    },
    {
      title: "Auto Buybacks",
      description: "Profitable trades trigger immediate token buybacks. Performance directly backs token value.",
      icon: <TrendingUp className="w-6 h-6 text-[#3b82f6]" />
    }
  ];

  return (
    <section id="capabilities" className="bg-[#101928] w-full py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[#CCFF00] font-mono text-sm tracking-widest mb-4">
            // CAPABILITIES
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2 text-white">
            Built For <br />
            <span className="text-[#3b82f6]">Systematic Edge</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, index) => (
            <div 
              key={index} 
              className="bg-white/2 border border-white/5 p-8 rounded-xl hover:bg-white/4 transition-colors group"
            >
              <div className="mb-6">
                {item.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-3 uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}