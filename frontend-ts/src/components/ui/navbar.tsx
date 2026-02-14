import { useState } from 'react';
import { Menu, X, Shuffle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Updated navigation to match the visual style, 
  // you can revert these to your original paths if needed.
  const navigation = [
    { name: "Explore", path: "/view-agent" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Activity", path: "/activity" }, // Renamed second 'Dashboard' to Activity for clarity
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-[#05070c] border-b border-white/5">
      <div className="mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left: Brand / Logo */}
          <Link to="/" className="shrink-0">
            <span className="text-gray-200 text-lg tracking-wide">
              Monaclaw
            </span>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm transition-colors duration-200 ${location.pathname === item.path
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-200'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right: Actions (Icon + Connect Button) */}
          <div className="hidden md:flex items-center gap-6">
            {/* The crossed icon from the image */}
            <button className="text-gray-500 hover:text-gray-300 transition-colors">
              <img src="/x.svg" alt="" />
            </button><button onClick={() => navigate('/x-login')} className="bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              Connect
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-[#05070c] border-t border-white/10 absolute w-full left-0 shadow-xl">
          <div className="px-6 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block text-base text-gray-300 hover:text-white"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
              <button className="w-full text-left text-gray-400 hover:text-white flex items-center gap-2">
                <Shuffle className="w-4 h-4" /> Switch Network
              </button>
              <button onClick={() => navigate('/x-login')} className="bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                Connect
              </button>
            </div>
          </div>
        </div>
      )
      }
    </header >
  );
}