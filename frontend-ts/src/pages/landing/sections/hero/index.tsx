import { ArrowRight, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {

  const words = ["Monaclaw", "Polymarket"];

  // 2. State to track the animation
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    // Determine typing speed (faster when deleting)
    const typeSpeed = isDeleting ? 100 : 100;

    const timer = setTimeout(() => {
      // 3. Main Typing Logic
      setText((prev) => {
        if (isDeleting) {
          // Deleting: remove last character
          return currentWord.substring(0, prev.length - 1);
        } else {
          // Typing: add next character
          return currentWord.substring(0, prev.length + 1);
        }
      });

      // 4. Handle State Transitions
      if (!isDeleting && text === currentWord) {
        // Finished typing word: Wait 2 seconds, then start deleting
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        // Finished deleting: Switch to next word, stop deleting
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }
    }, isDeleting && text === currentWord ? 1000 : typeSpeed); // Dynamic delay

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <section
      id="hero"
      className="bg-[#05070c] pb-10 min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-6 "
    >
      <div className="max-w-5xl mx-auto w-full text-center">

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
          Autonomous Agents on <br />

          {/* The Dynamic Text */}
          <span className="text-gray-500">
            {text}
          </span>

          {/* The Blinking Cursor */}
          <span className="text-gray-500 animate-pulse font-light ml-1">
            |
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          We deploy AI-driven trading agents on Polymarket that monitor markets
          around the clock, make informed trades, and use profits to automatically
          buy back their token.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24">
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


        {/* Stats Grid */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 border-t border-white/5 md:border-t-0 pt-8 md:pt-0"> */}

          {/* Stat 1 */}
          {/* <div className="relative group">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">$1,668,186</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Volume Traded</p> */}
            {/* Green linear Line */}
            {/* <div className="absolute -bottom-4 left-0 w-full h-px bg-linear-to-r from-[#DDFE5F] to-transparent"></div>
          </div> */}

          {/* Stat 2 */}
          {/* <div className="relative group">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">$222,398</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Token Buybacks</p>
            <div className="absolute -bottom-4 left-0 w-full h-px bg-linear-to-r from-[#DDFE5F] to-transparent"></div>
          </div> */}

          {/* Stat 3 */}
          {/* <div className="relative group">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">88</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Active Agents</p>
            <div className="absolute -bottom-4 left-0 w-full h-px bg-linear-to-r from-[#DDFE5F] to-transparent"></div>
          </div> */}

          {/* Stat 4 */}
          {/* <div className="relative group">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">61</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Tokens Live</p>
            <div className="absolute -bottom-4 left-0 w-full h-px bg-linear-to-r from-[#DDFE5F] to-transparent"></div>
          </div>

        </div> */}
      </div>
    </section>
  );
}