import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="bg-[#101928] w-full py-32 px-6 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto text-center">

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Ready to trade?
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          Join Monaclaw and access professional trading tools for Polymarket prediction markets.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            to="/x-login"
            className="group bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-3.5 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)]"
          >
            Deploy Agent
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/view-agent"
            className="group bg-transparent border border-white/10 hover:border-white/30 text-white px-8 py-3.5 rounded-lg font-semibold flex items-center gap-2 transition-all hover:bg-white/5"
          >
            View Live Agents
            <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

      </div>
    </section>
  );
}