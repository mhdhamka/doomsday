import React from 'react';
import { useApp } from '../context/AppContext';
import doomsdayLogo from '../assets/doom-logo.png';
import { 
  Clock, 
  Tv, 
  Users, 
  BookOpen, 
  Bot, 
  Volume2, 
  VolumeX, 
  Zap,
  Activity,
  ShieldAlert
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    soundEnabled, 
    toggleSound, 
    completionPercentage,
    stabilityIndex
  } = useApp();

  const navItems = [
    { id: 'hud', label: 'Watch Clock', icon: Clock },
    { id: 'roadmap', label: 'Roadmap', icon: Tv },
    { id: 'dossier', label: 'Dossier', icon: Users },
    { id: 'comics', label: 'Blueprint', icon: BookOpen },
    { id: 'tva-chat', label: 'TVA AI', icon: Bot },
    { id: 'simulator', label: 'Simulator', icon: Zap },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#1a2e1a] bg-[#020402]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
      {/* Sleek Single-Row Tactical HUD */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Logo & Compact Title */}
        <div 
          id="brand-logo"
          onClick={() => setActiveTab('hud')}
          className="flex items-center space-x-3 cursor-pointer group select-none shrink-0"
        >
          <div className="relative w-10 h-10 rounded bg-[#080d08] border-2 border-[#22c55e] p-0.5 shadow-[2px_2px_0px_#1a2e1a] transition-all duration-300 group-hover:scale-105 group-hover:border-white">
            <img 
              src={doomsdayLogo} 
              alt="DOOMSDAY Emblem" 
              referrerPolicy="no-referrer" 
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#22c55e] font-mono font-bold">
              <span className="px-1 bg-[#1a2e1a] text-[#22c55e] border border-[#22c55e]/40">75¢ #001</span>
              <span className="hidden sm:inline text-white/50">|</span>
              <span className="hidden sm:inline text-white/80">EARTH-616</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-comic tracking-wide text-white uppercase comic-title-stroke leading-none flex items-center gap-1">
              <span>AVENGERS:</span> <span className="text-[#22c55e]">DOOMSDAY</span>
            </h1>
          </div>
        </div>

        {/* Center: Interactive Nav Tabs (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center space-x-1 bg-[#050a05] p-1 rounded border border-[#1a2e1a]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all flex items-center space-x-1.5 uppercase tracking-wider ${
                  isActive
                    ? 'bg-[#1a2e1a] text-[#22c55e] border border-[#22c55e] shadow-[2px_2px_0px_#000]'
                    : 'text-[#e0e7e0]/60 hover:text-white hover:bg-[#1a2e1a]/30 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#22c55e]' : 'text-white/40'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Telemetry & Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          
          {/* Stability & Incursion Indicators */}
          <div className="hidden xl:flex items-center space-x-2 font-mono text-[10px]">
            <div className="px-2 py-1 bg-[#1a2e1a]/60 border border-[#22c55e]/40 rounded text-[#22c55e] flex items-center gap-1">
              <Activity className="w-3 h-3" />
              <span>STABLE: {stabilityIndex.toFixed(0)}%</span>
            </div>
            <div className="px-2 py-1 bg-red-950/40 border border-red-500/50 rounded text-red-400 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" />
              <span>INCURSION: HIGH</span>
            </div>
          </div>

          {/* Mini Prep Progress Bar */}
          <div 
            onClick={() => setActiveTab('roadmap')}
            className="cursor-pointer hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded bg-[#080d08] border border-[#1a2e1a] hover:border-[#22c55e] transition-all"
            title="Watchlist Progress"
          >
            <span className="text-[10px] text-[#22c55e] font-comic">PREP</span>
            <div className="w-12 bg-[#020402] h-1.5 rounded border border-[#22c55e]/30 overflow-hidden">
              <div 
                className="h-full bg-[#22c55e] transition-all duration-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="text-[10px] font-mono font-bold text-white">{completionPercentage}%</span>
          </div>

          {/* Sound FX Toggle */}
          <button
            id="btn-sound-toggle"
            onClick={toggleSound}
            className={`p-2 rounded border transition-all ${
              soundEnabled
                ? 'bg-[#1a2e1a] border-[#22c55e] text-[#22c55e]'
                : 'bg-[#080d08] border-[#1a2e1a] text-white/40 hover:text-white'
            }`}
            title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Scroll Nav (Only shows on mobile screens) */}
      <div className="md:hidden flex items-center space-x-1.5 overflow-x-auto px-3 py-1.5 bg-[#050a05] border-t border-[#1a2e1a] scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`whitespace-nowrap px-2.5 py-1 rounded text-xs font-mono font-bold transition-all flex items-center space-x-1 shrink-0 uppercase ${
                isActive
                  ? 'bg-[#1a2e1a] text-[#22c55e] border border-[#22c55e]'
                  : 'bg-[#080d08] text-white/60 border border-[#1a2e1a]'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};