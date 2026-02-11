export default function TokenomicsSection() {
  const whyItWorksPoints = [
    "Token value directly tied to trading performance",
    "Automatic buybacks on every profitable trade",
    "Transparent on-chain execution",
    "Aligned incentives between agent and holders",
    "No arbitrary inflation or emissions",
  ];

  return (
    <section id="tokenomics" className="bg-[#101928] w-full py-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#CCFF00] font-mono text-sm tracking-widest mb-4">
            // TOKENOMICS
          </p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-tight">
            <span className="text-gray-500">Performance-Backed</span> <br />
            <span className="text-[#CCFF00]">Token Value</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            When your agent profits, token holders benefit through automatic buybacks from realized gains.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Left Card: Profit Distribution */}
          <div className="border border-white/5 rounded-none md:rounded-lg p-8 md:p-10 bg-white/2">
            <h3 className="text-white font-bold text-lg mb-8 uppercase tracking-wide border-b border-white/5 pb-4 md:border-none md:pb-0">
              Profit Distribution
            </h3>
            
            <div className="space-y-6">
              {/* Item 1: 70% */}
              <div className="flex items-start gap-5 group">
                {/* Custom Percentage Tag Shape */}
                <div className="relative w-16 h-12 shrink-0 bg-[#064e3b]/40 border-l-4 border-[#10b981] flex items-center justify-center clip-tag">
                  <span className="text-[#10b981] font-bold text-lg">70%</span>
                  {/* Pseudo-element for corner fold effect visualization */}
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#101928] [clip-path:polygon(100%_0,0_100%,100%_100%)]"></div>
                </div>
                <div className="pt-1">
                  <h4 className="text-white font-bold text-base uppercase tracking-wide">Compounds</h4>
                  <p className="text-gray-500 text-sm mt-1">Grows bankroll for larger positions</p>
                </div>
              </div>

              {/* Item 2: 20% */}
              <div className="flex items-start gap-5 group">
                <div className="relative w-16 h-12 shrink-0 bg-[#422006]/40 border-l-4 border-[#EAB308] flex items-center justify-center">
                  <span className="text-[#EAB308] font-bold text-lg">20%</span>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#101928] [clip-path:polygon(100%_0,0_100%,100%_100%)]"></div>
                </div>
                <div className="pt-1">
                  <h4 className="text-white font-bold text-base uppercase tracking-wide">Buyback</h4>
                  <p className="text-gray-500 text-sm mt-1">Creates sustained buy pressure</p>
                </div>
              </div>

              {/* Item 3: 10% */}
              <div className="flex items-start gap-5 group">
                <div className="relative w-16 h-12 shrink-0 bg-[#3f6212]/40 border-l-4 border-[#d9f99d] flex items-center justify-center">
                  <span className="text-[#d9f99d] font-bold text-lg">10%</span>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#101928] [clip-path:polygon(100%_0,0_100%,100%_100%)]"></div>
                </div>
                <div className="pt-1">
                  <h4 className="text-white font-bold text-base uppercase tracking-wide">Fee</h4>
                  <p className="text-gray-500 text-sm mt-1">We take 10% fee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Why It Works */}
          <div className="border border-white/5 rounded-none md:rounded-lg p-8 md:p-10 bg-white/2">
            <h3 className="text-white font-bold text-lg mb-8 uppercase tracking-wide border-b border-white/5 pb-4 md:border-none md:pb-0">
              Why It Works
            </h3>
            
            <ul className="space-y-6">
              {whyItWorksPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-4">
                  {/* Custom Square Bullet */}
                  <div className="w-5 h-5 mt-1 bg-[#4c1d95]/30 flex items-center justify-center rounded-sm shrink-0 border border-[#8b5cf6]/30">
                    <div className="w-2 h-2 bg-[#8b5cf6] rounded-[1px]"></div>
                  </div>
                  <span className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}