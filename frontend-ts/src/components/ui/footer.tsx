

export default function Footer() {
  return (
    // 'fixed bottom-0' anchors it to the bottom of the viewport
    <footer className="bottom-0 left-0 w-full bg-[#101928] border-t border-white/5 z-40">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand / Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md flex items-center justify-center">
               <img src="/logo.svg" alt="" />
            </div>
            <span className="text-white font-bold text-sm tracking-wide">
              MonaCLAW
            </span>
          </div>

          {/* Center: Info Text (Hidden on small screens) */}
          <div className="hidden md:flex items-center gap-3 text-[10px]  text-gray-600 uppercase">
             <span>Built on Monad</span>
             <span className="w-0.5 h-0.5 rounded-full bg-gray-600"></span>
             <span>Trading on Polymarket</span>
          </div>

          {/* Right: Links & Socials */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-[11px]  text-gray-400 hover:text-white uppercase tracking-wider transition-colors">
              Docs
            </a>
            <a href="#" className="text-[11px]  text-gray-400 hover:text-white uppercase tracking-wider transition-colors">
              Telegram
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {/* Using a custom SVG for the specific 'X' logo style if needed, or Twitter/X icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}