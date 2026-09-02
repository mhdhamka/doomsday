import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { WatchClock } from './components/WatchClock';
import { RoadmapFlow } from './components/RoadmapFlow';
import { DossierGrid } from './components/DossierGrid';
import { ComicBlueprint } from './components/ComicBlueprint';
import { TvaTerminal } from './components/TvaTerminal';
import { IncursionSimulator } from './components/IncursionSimulator';
import { ComicSFXOverlay } from './components/ComicSFXOverlay';
import { ComicNarrationBox } from './components/ComicNarrationBox';
import { DoomWisdomWidget } from './components/DoomWisdomWidget';
import doomsdayLogo from './assets/doom-logo.png';
import { 
  Shield, 
  Sparkles, 
  Layers, 
  Clock, 
  Bot, 
  BookOpen, 
  Tv, 
  Zap,
  Crown
} from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <div className="min-h-screen bg-[#020402] text-[#e0e7e0] font-mono flex flex-col selection:bg-[#22c55e] selection:text-black relative">
      {/* Top Cybernetic Scanline Background */}
      <div className="fixed inset-0 bg-hud-grid opacity-40 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-tva-scanline opacity-[0.035] pointer-events-none z-0" />

      {/* Navigation Header */}
      <Navbar />

      {/* Global Comic SFX Floating Text Overlay */}
      <ComicSFXOverlay />

      {/* Floating Doctor Doom's Wisdom Speech Bubble */}
      <DoomWisdomWidget />

      {/* Main Content Area with Comic Page-Turn & Panel-Slide animation */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10 space-y-8 overflow-hidden">
        {/* Animated Comic Tab Container */}
        <div 
          key={activeTab}
          className="animate-comic-page-turn w-full"
        >
          {/* Dynamic Comic Lore Narration Box */}
          <ComicNarrationBox />

          {activeTab === 'hud' && <WatchClock />}
          {activeTab === 'roadmap' && <RoadmapFlow />}
          {activeTab === 'dossier' && <DossierGrid />}
          {activeTab === 'comics' && <ComicBlueprint />}
          {activeTab === 'tva-chat' && <TvaTerminal />}
          {activeTab === 'simulator' && <IncursionSimulator />}
        </div>
      </main>

      {/* Elegant Dark Footer */}
      <footer className="w-full border-t border-[#22c55e]/20 bg-[#020402]/95 py-6 sm:py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Top Telemetry Metric Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-b border-[#1a2e1a] pb-6">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-[10px] text-[#22c55e]/60 uppercase tracking-[0.2em]">OPERATIONAL SECTOR</span>
              <span className="text-xs sm:text-sm font-bold text-white tracking-widest uppercase italic">UNIT-00923-LATVERIA</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#22c55e]/60 uppercase tracking-[0.2em]">POWER CLASS</span>
              <span className="text-xs sm:text-sm font-bold text-[#22c55e] tracking-widest italic">BEYONDER-CLASS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#22c55e]/60 uppercase tracking-[0.2em]">TEMPORAL SYNC</span>
              <span className="text-xs sm:text-sm font-bold text-[#22c55e] tracking-widest italic">LOCK-ON</span>
            </div>
            <div className="flex flex-col items-center sm:items-end">
              <span className="text-[10px] text-red-400/70 uppercase tracking-[0.2em]">THREAT HORIZON</span>
              <span className="text-xs sm:text-sm font-bold text-red-500 tracking-widest italic animate-pulse">ABSOLUTE</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#e0e7e0]/60">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-[#1a2e1a] border border-[#22c55e]/50 p-0.5 overflow-hidden shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                <img 
                  src={doomsdayLogo} 
                  alt="DOOMSDAY Logo" 
                  referrerPolicy="no-referrer" 
                  className="w-full h-full object-cover rounded" 
                />
              </div>
              <div>
                <div className="text-white font-bold uppercase tracking-wider">
                  DOOMSDAY PROTOCOL // TVA ARCHIVES
                </div>
                <div className="text-[10px] text-[#22c55e]/70">
                  © TIME VARIANCE AUTHORITY & LATVERIAN HEGEMONY
                </div>
              </div>
            </div>

            {/* Quick Tab Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
              <button onClick={() => setActiveTab('hud')} className="hover:text-[#22c55e] transition-colors">
                Watch Clock
              </button>
              <span className="opacity-30">•</span>
              <button onClick={() => setActiveTab('roadmap')} className="hover:text-[#22c55e] transition-colors">
                15-Title Roadmap
              </button>
              <span className="opacity-30">•</span>
              <button onClick={() => setActiveTab('dossier')} className="hover:text-[#22c55e] transition-colors">
                Factions Dossier
              </button>
              <span className="opacity-30">•</span>
              <button onClick={() => setActiveTab('comics')} className="hover:text-[#22c55e] transition-colors">
                Secret Wars Blueprint
              </button>
              <span className="opacity-30">•</span>
              <button onClick={() => setActiveTab('tva-chat')} className="hover:text-[#22c55e] transition-colors">
                TVA Chronologist
              </button>
            </div>

            <div className="text-[11px] text-[#e0e7e0]/50 text-center md:text-right">
              THEATER TARGET: <strong className="text-[#22c55e]">DECEMBER 18, 2026</strong>
              <div>FOR ALL TIME. ALWAYS.</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}