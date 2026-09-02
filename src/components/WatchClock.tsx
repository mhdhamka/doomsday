import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Clock, 
  AlertTriangle, 
  Radio, 
  Compass, 
  ChevronRight, 
  ShieldAlert, 
  Zap, 
  Flame, 
  Layers,
  Film,
  Terminal,
  Cpu,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const WatchClock: React.FC = () => {
  const { 
    setActiveTab, 
    completionPercentage, 
    completedItemsCount, 
    totalItems,
    stabilityIndex,
    setStabilityIndex,
    triggerSFX,
  } = useApp();

  // Target date: December 18, 2026
  const targetDate = new Date('2026-12-18T00:00:00Z');

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalWeeks: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalWeeks: 0,
  });

  const [incursionThreat, setIncursionThreat] = useState<{
    level: string;
    description: string;
    threatClass: string;
    borderStyle: string;
  }>({
    level: 'CRITICAL CONVERGENCE',
    description: 'Multiversal barriers collapsing across Earth-616, Earth-828, and Earth-10005.',
    threatClass: 'text-red-400 bg-red-950/60 border-red-500/40',
    borderStyle: 'border-red-500/30'
  });

  // Interactive diagnostic mode state
  const [diagnosticMode, setDiagnosticMode] = useState<boolean>(false);
  const [temporalClicks, setTemporalClicks] = useState<number>(0);
  const [riftActive, setRiftActive] = useState<boolean>(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        const totalWeeks = Math.ceil(days / 7);

        setTimeLeft({ days, hours, minutes, seconds, totalWeeks });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, totalWeeks: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update Incursion threat level dynamic text based on stability
  useEffect(() => {
    if (stabilityIndex < 20) {
      setIncursionThreat({
        level: 'TERMINAL COLLAPSE (8-HR IMPACT)',
        description: 'Dimensional boundary obliterated. Incursion Point active in sub-space coordinates.',
        threatClass: 'text-red-400 bg-red-950/80 border-red-500',
        borderStyle: 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
      });
    } else if (stabilityIndex < 50) {
      setIncursionThreat({
        level: 'OMEGA-TIER INCURSION THREAT',
        description: 'Loki Yggdrasil nexus showing high branch decay. Latverian sensors detecting sovereign breach.',
        threatClass: 'text-amber-400 bg-amber-950/70 border-amber-500/40',
        borderStyle: 'border-amber-500/30'
      });
    } else {
      setIncursionThreat({
        level: 'CALIBRATED TEMPORAL FLUX',
        description: 'TVA monitors actively scanning timeline drift. Anchor point surveillance maintained.',
        threatClass: 'text-emerald-400 bg-emerald-950/70 border-emerald-500/40',
        borderStyle: 'border-emerald-500/30'
      });
    }
  }, [stabilityIndex]);

  const triggerRadarPulse = (e?: React.MouseEvent) => {
    triggerSFX({ text: 'INCURSION!', color: 'red', scale: 1.2 }, e);
    setStabilityIndex((prev) => Math.max(10, +(prev - 4.5).toFixed(1)));
    setRiftActive(true);
    setTimeout(() => setRiftActive(false), 800);
  };

  const calibrateStabilizer = (e?: React.MouseEvent) => {
    triggerSFX({ text: 'STABILIZED!', color: 'green', scale: 1.25 }, e);
    setStabilityIndex((prev) => Math.min(95, +(prev + 6.0).toFixed(1)));
    setTemporalClicks(prev => prev + 1);
  };

  const toggleDiagnostic = () => {
    soundEngine.play?.('click');
    setDiagnosticMode(prev => !prev);
  };

  return (
    <section className="space-y-6 sm:space-y-8 animate-fadeIn font-mono">
      {/* Comic Book Narration Ribbon */}
      <div className="comic-narration-box p-3 rounded flex items-center justify-between gap-2 overflow-x-auto scrollbar-none bg-[#080d08]">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#22c55e]">
          <span className="px-2 py-0.5 bg-[#22c55e] text-black font-comic text-xs tracking-wide">
            CHAPTER I: TIME RUNS OUT
          </span>
          <span className="text-white hidden sm:inline">
            "THE SACRED TIMELINE WEAKENS AS THE SHADOW OF DOOM DESCENDS UPON THE MULTIVERSE..."
          </span>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <button 
            onClick={toggleDiagnostic}
            className={`text-[10px] px-2 py-0.5 rounded border transition-all flex items-center gap-1 font-bold uppercase ${diagnosticMode ? 'bg-[#22c55e] text-black border-[#22c55e]' : 'bg-[#1a2e1a] text-[#22c55e] border-[#22c55e]/40 hover:border-[#22c55e]'}`}
            title="Toggle Terminal Diagnostics"
          >
            <Terminal className="w-3 h-3" />
            <span>{diagnosticMode ? 'HUD MODE' : 'DIAGNOSTICS'}</span>
          </button>
          <span className="text-[10px] text-white/60 font-comic uppercase tracking-widest">
            PAGE 01 // PANEL A
          </span>
        </div>
      </div>

      {/* Main Comic Panel Countdown Card */}
      <div className={`relative rounded bg-[#080d08] border-2 p-5 sm:p-8 overflow-hidden comic-shadow-dark doom-glow bg-comic-dots transition-all duration-500 ${riftActive ? 'border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.5)]' : 'border-[#1a2e1a]'}`}>
        
        {/* Ambient Top Glow / Rift Glitch FX Overlay */}
        <div className={`absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${riftActive ? 'bg-red-500/30 w-full h-full' : 'bg-[#22c55e]/10'}`} />

        {/* Diagnostic Overlay Info if active */}
        {diagnosticMode && (
          <div className="mb-6 p-3 bg-black/90 border border-[#22c55e]/50 rounded text-xs text-[#22c55e] font-mono space-y-1 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-[#1a2e1a] pb-1">
              <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5" /> TVA_LATEST_TELEMETRY // SECTOR_616</span>
              <span className="text-white/60">SYNC: 99.82%</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[10px] text-white/70">
              <div>ANCHOR_POINT: <span className="text-[#22c55e]">STABLE</span></div>
              <div>TIMELINE_DRIFT: <span className="text-amber-400">+0.044s</span></div>
              <div>PATCH_ITERATION: <span className="text-[#22c55e]">{temporalClicks} FIXES</span></div>
              <div>LOOM_PRESSURE: <span className="text-red-400">HIGH</span></div>
            </div>
          </div>
        )}

        {/* Top Comic Badges & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded text-xs font-bold tracking-wider uppercase bg-[#1a2e1a] border-2 border-[#22c55e] text-[#22c55e] shadow-[2px_2px_0px_#000]">
              <Zap className="w-3.5 h-3.5 mr-1.5 text-[#22c55e]" />
              THE DOOMSDAY WATCH CLOCK
            </span>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded text-xs text-white border-2 border-[#1a2e1a] bg-[#020402] font-bold">
              THEATRICAL PREMIERE: DEC 18, 2026
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-[#e0e7e0]/70 uppercase font-bold">INCURSION THREAT:</span>
            <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold uppercase border-2 shadow-[2px_2px_0px_#000] ${incursionThreat.threatClass}`}>
              <AlertTriangle className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              {incursionThreat.level}
            </span>
          </div>
        </div>

        {/* Hero Title Comic Banner */}
        <div className="mb-6 text-center sm:text-left">
          <div className="text-xs text-[#22c55e] font-bold tracking-widest uppercase mb-1 flex items-center justify-center sm:justify-start gap-2">
            <span>MULTIVERSE INVASION SEQUENCE</span>
            <span>•</span>
            <span className="text-white">COUNTDOWN TO BATTLEWORLD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-comic tracking-wide text-white uppercase comic-title-stroke leading-tight">
            COUNTDOWN TO <span className="text-[#22c55e]">THE INEVITABLE</span>
          </h2>
        </div>

        {/* Main Countdown Display Grid in Comic Panel Style */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {/* Days */}
          <div className="relative rounded border-2 border-[#22c55e]/60 bg-[#020402] p-4 sm:p-6 text-center backdrop-blur-sm group hover:border-[#22c55e] shadow-[4px_4px_0px_#1a2e1a] transition-all">
            <div className="absolute top-1.5 right-2 text-[9px] font-comic uppercase text-[#22c55e] tracking-widest">
              [PANEL 1]
            </div>
            <div className="text-4xl sm:text-6xl lg:text-7xl font-comic text-[#22c55e] tracking-tight comic-title-stroke leading-none my-1">
              {String(timeLeft.days).padStart(3, '0')}
            </div>
            <div className="mt-1 text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
              Days Remaining
            </div>
            <div className="text-[10px] text-[#22c55e] mt-1 font-bold">
              ~{timeLeft.totalWeeks} COMIC WEEKS
            </div>
          </div>

          {/* Hours */}
          <div className="relative rounded border-2 border-[#1a2e1a] bg-[#020402] p-4 sm:p-6 text-center backdrop-blur-sm group hover:border-[#22c55e] shadow-[4px_4px_0px_#1a2e1a] transition-all">
            <div className="absolute top-1.5 right-2 text-[9px] font-comic uppercase text-[#e0e7e0]/40 tracking-widest">
              [PANEL 2]
            </div>
            <div className="text-4xl sm:text-6xl lg:text-7xl font-comic text-white tracking-tight comic-title-stroke leading-none my-1">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="mt-1 text-xs sm:text-sm font-bold text-[#e0e7e0] uppercase tracking-widest">
              Hours
            </div>
            <div className="text-[10px] text-[#e0e7e0]/60 mt-1 font-medium">
              SUB-CYCLES
            </div>
          </div>

          {/* Minutes */}
          <div className="relative rounded border-2 border-[#1a2e1a] bg-[#020402] p-4 sm:p-6 text-center backdrop-blur-sm group hover:border-[#22c55e] shadow-[4px_4px_0px_#1a2e1a] transition-all">
            <div className="absolute top-1.5 right-2 text-[9px] font-comic uppercase text-[#e0e7e0]/40 tracking-widest">
              [PANEL 3]
            </div>
            <div className="text-4xl sm:text-6xl lg:text-7xl font-comic text-white tracking-tight comic-title-stroke leading-none my-1">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="mt-1 text-xs sm:text-sm font-bold text-[#e0e7e0] uppercase tracking-widest">
              Minutes
            </div>
            <div className="text-[10px] text-[#e0e7e0]/60 mt-1 font-medium">
              TICKS
            </div>
          </div>

          {/* Seconds */}
          <div className="relative rounded border-2 border-[#22c55e]/60 bg-[#020402] p-4 sm:p-6 text-center backdrop-blur-sm group hover:border-[#22c55e] shadow-[4px_4px_0px_#1a2e1a] transition-all">
            <div className="absolute top-1.5 right-2 text-[9px] font-comic uppercase text-[#22c55e] tracking-widest">
              [PANEL 4]
            </div>
            <div className="text-4xl sm:text-6xl lg:text-7xl font-comic text-[#22c55e] tracking-tight comic-title-stroke leading-none my-1">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="mt-1 text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
              Seconds
            </div>
            <div className="text-[10px] text-[#22c55e] mt-1 font-bold">
              LIVE ATOM PULSE
            </div>
          </div>
        </div>

        {/* Dynamic Incursion Risk Meter & Stability Control */}
        <div className="p-4 sm:p-5 rounded bg-[#020402] border-2 border-[#1a2e1a] space-y-3 shadow-[3px_3px_0px_#000]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-[#22c55e] animate-spin" style={{ animationDuration: '14s' }} />
              <span className="text-xs font-bold uppercase text-white">
                MULTIVERSAL STABILITY INDEX:
              </span>
              <span className="text-base font-comic font-black text-[#22c55e] tracking-wider">
                {stabilityIndex.toFixed(1)}%
              </span>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <button
                id="btn-destabilize"
                onClick={triggerRadarPulse}
                className="px-3 py-1.5 rounded bg-[#2e1a1a] text-red-300 border-2 border-red-800 hover:bg-red-900 transition-all flex items-center gap-1 font-bold uppercase shadow-[2px_2px_0px_#000]"
                title="Simulate Incursion Stress Test"
              >
                <Flame className="w-3.5 h-3.5 text-red-400" />
                Stress Timeline (-4.5%)
              </button>
              <button
                id="btn-stabilize"
                onClick={calibrateStabilizer}
                className="px-3 py-1.5 rounded bg-[#1a2e1a] text-[#22c55e] border-2 border-[#22c55e] hover:bg-[#22c55e]/20 transition-all flex items-center gap-1 font-bold uppercase shadow-[2px_2px_0px_#000]"
                title="Calibrate Doom Reality Loom"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-[#22c55e]" />
                Doom Stabilizer (+6.0%)
              </button>
            </div>
          </div>

          {/* Progress Visual Bar */}
          <div className="w-full bg-[#080d08] h-3.5 rounded overflow-hidden border-2 border-[#1a2e1a] relative">
            <div 
              className={`h-full transition-all duration-700 ${
                stabilityIndex < 25 
                  ? 'bg-gradient-to-r from-red-600 to-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
                  : stabilityIndex < 55 
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]' 
                    : 'bg-gradient-to-r from-[#1a2e1a] to-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.5)]'
              }`}
              style={{ width: `${stabilityIndex}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[#e0e7e0]/80">
            <p className="leading-relaxed">
              <strong className="text-white uppercase font-bold">Chronologist Note:</strong> {incursionThreat.description}
            </p>
            {temporalClicks > 0 && (
              <span className="shrink-0 text-[#22c55e] text-[10px] font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {temporalClicks} Patches Applied
              </span>
            )}
          </div>
        </div>

        {/* Primary Call to Action Deck */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-[#1a2e1a]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-[#1a2e1a] border-2 border-[#22c55e] text-[#22c55e] shadow-[2px_2px_0px_#000]">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-[#22c55e] uppercase tracking-wider font-bold">YOUR ESSENTIAL MARATHON</div>
              <div className="text-sm font-bold text-white uppercase">
                {completedItemsCount} of {totalItems} Titles Completed ({completionPercentage}%)
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-hero-explore-roadmap"
              onClick={() => setActiveTab('roadmap')}
              className="px-4 py-2.5 rounded text-xs font-bold bg-[#22c55e] text-black hover:bg-[#22c55e]/90 transition-all shadow-[3px_3px_0px_#000] border-2 border-black flex items-center space-x-1.5 uppercase tracking-wider"
            >
              <span>Launch 15-Title Roadmap</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              id="btn-hero-open-chronologist"
              onClick={() => setActiveTab('tva-chat')}
              className="px-4 py-2.5 rounded text-xs font-bold bg-[#020402] text-[#22c55e] border-2 border-[#22c55e] hover:bg-[#1a2e1a] transition-all shadow-[3px_3px_0px_#000] flex items-center space-x-1.5 uppercase tracking-wider"
            >
              <span>Query TVA Chronologist</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3-Column Comic Panel Briefing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: The Core Conflict */}
        <div className="comic-panel rounded bg-[#080d08] p-5 space-y-3 relative overflow-hidden group hover:border-[#22c55e] transition-all">
          <div className="absolute top-0 right-0 bg-[#22c55e] text-black font-comic text-[10px] px-2 py-0.5 uppercase tracking-wider font-bold">
            ISSUE SPOTLIGHT
          </div>
          <div className="flex items-center space-x-2 text-[#22c55e]">
            <Radio className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              LATVERIAN TRANSMISSION
            </span>
          </div>
          <h3 className="font-comic text-2xl text-white uppercase comic-title-stroke tracking-wide">
            Doctor Doom & The New Order
          </h3>
          <p className="text-xs text-[#e0e7e0]/80 leading-relaxed">
            Robert Downey Jr. returns to the Marvel Cinematic Universe—not as Tony Stark, but as <strong className="text-white">Victor von Doom</strong>. Where Stark sacrificed himself to save Earth-616, Doom believes humanity is too flawed to save itself.
          </p>
          <div className="pt-2 border-t-2 border-[#1a2e1a] text-[11px] text-[#22c55e] font-bold uppercase flex items-center justify-between">
            <span>★ KEY COMIC RUN: Jonathan Hickman’s Secret Wars (2015)</span>
          </div>
        </div>

        {/* Card 2: The Incursion Hazard */}
        <div className="comic-panel rounded bg-[#080d08] p-5 space-y-3 relative overflow-hidden group hover:border-red-500 transition-all">
          <div className="absolute top-0 right-0 bg-red-600 text-white font-comic text-[10px] px-2 py-0.5 uppercase tracking-wider font-bold">
            OMEGA EVENT
          </div>
          <div className="flex items-center space-x-2 text-red-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              INCURSION PHENOMENON
            </span>
          </div>
          <h3 className="font-comic text-2xl text-white uppercase comic-title-stroke tracking-wide">
            8-Hour Collision Window
          </h3>
          <p className="text-xs text-[#e0e7e0]/80 leading-relaxed">
            When universal boundaries buckle, two Earths occupy the exact same sub-space coordinate. If neither planet is destroyed within eight hours, both entire universes are annihilated.
          </p>
          <div className="pt-2 border-t-2 border-[#1a2e1a] text-[11px] text-red-400 font-bold uppercase flex items-center justify-between">
            <span>★ MECHANIC INTRODUCED IN: Multiverse of Madness (2022)</span>
          </div>
        </div>

        {/* Card 3: The TVA & Loki Nexus */}
        <div className="comic-panel rounded bg-[#080d08] p-5 space-y-3 relative overflow-hidden group hover:border-[#22c55e] transition-all">
          <div className="absolute top-0 right-0 bg-[#22c55e] text-black font-comic text-[10px] px-2 py-0.5 uppercase tracking-wider font-bold">
            NEXUS CORE
          </div>
          <div className="flex items-center space-x-2 text-[#22c55e]">
            <Layers className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              YGGDRASIL ANCHOR
            </span>
          </div>
          <h3 className="font-comic text-2xl text-white uppercase comic-title-stroke tracking-wide">
            God Loki at the End of Time
          </h3>
          <p className="text-xs text-[#e0e7e0]/80 leading-relaxed">
            By gripping all dying timelines together into the World Tree, God Loki grants infinite free will across the multiverse. But this freedom also allows dangerous incursions to spread uncontrollably.
          </p>
          <div className="pt-2 border-t-2 border-[#1a2e1a] text-[11px] text-[#22c55e] font-bold uppercase flex items-center justify-between">
            <span>★ CORE FOUNDATION: Loki Season 2 Finale</span>
          </div>
        </div>
      </div>
    </section>
  );
};