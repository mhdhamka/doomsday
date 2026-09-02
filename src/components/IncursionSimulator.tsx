import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  ShieldAlert, 
  Flame, 
  Layers, 
  RotateCcw, 
  Compass, 
  Globe, 
  CheckCircle2, 
  AlertTriangle,
  Play,
  Pause
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const IncursionSimulator: React.FC = () => {
  const { stabilityIndex, setStabilityIndex, triggerSFX } = useApp();

  const [universeA, setUniverseA] = useState<'Earth-616' | 'Earth-838'>('Earth-616');
  const [universeB, setUniverseB] = useState<'Earth-828 (FF)' | 'Earth-10005 (X-Men)'>('Earth-828 (FF)');
  const [incursionHoursLeft, setIncursionHoursLeft] = useState<number>(7.4);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simulationLog, setSimulationLog] = useState<string[]>([
    '[TVA SENSOR] Gravitational resonance detected between Earth-616 and Earth-828.',
    '[ALERT] Incursion Point designated at Sub-Space Node 0-77.',
    '[STABILITY] Reality cohesion dropping at 1.2% per cycle.'
  ]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating) {
      timer = setInterval(() => {
        setIncursionHoursLeft((prev) => {
          if (prev <= 0.1) {
            triggerSFX({ text: 'INCURSION COLLAPSE!', color: 'red', scale: 1.4 });
            return 8.0; // reset loop
          }
          return +(prev - 0.05).toFixed(2);
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSimulating, triggerSFX]);

  const triggerDoomIntervention = (e?: React.MouseEvent) => {
    triggerSFX({ text: 'DOOOOM!', color: 'green', scale: 1.4 }, e);
    setStabilityIndex(92.0);
    setIncursionHoursLeft(8.0);
    setSimulationLog((prev) => [
      `[DOOM INTERVENTION] Victor von Doom activates Molecular Siphon on ${universeB}. Battleworld domain established.`,
      ...prev.slice(0, 5)
    ]);
  };

  const triggerLifeRaft = (e?: React.MouseEvent) => {
    triggerSFX({ text: 'SWOOOSH!', color: 'cyan', scale: 1.2 }, e);
    setSimulationLog((prev) => [
      `[REED RICHARDS] Life Raft launched. Key survivors from ${universeA} and ${universeB} sealed in quantum stasis.`,
      ...prev.slice(0, 5)
    ]);
  };

  const triggerAntimatterBomb = (e?: React.MouseEvent) => {
    triggerSFX({ text: 'KRAKOOM!', color: 'red', scale: 1.35 }, e);
    setStabilityIndex(45.0);
    setSimulationLog((prev) => [
      `[ILLUMINATI PROTOCOL] Antimatter bomb detonated on ${universeB}. ${universeA} saved, but moral foundation shattered.`,
      ...prev.slice(0, 5)
    ]);
  };

  const toggleSimulation = (e?: React.MouseEvent) => {
    triggerSFX({ text: isSimulating ? 'PAUSED!' : 'ENGAGE!', color: 'yellow', scale: 1.05 }, e);
    setIsSimulating(!isSimulating);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-mono">
      {/* Header */}
      <div className="rounded border border-[#1a2e1a] bg-[#080d08] p-5 sm:p-6 backdrop-blur-md doom-glow">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#22c55e] mb-1">
              <Zap className="w-4 h-4 animate-pulse" />
              <span className="uppercase tracking-widest font-bold">MULTIVERSE COLLISION LAB</span>
            </div>
            <h2 className="font-bold text-xl sm:text-2xl text-white uppercase italic tracking-tight">
              Interactive Incursion Simulator
            </h2>
            <p className="text-xs sm:text-sm text-[#e0e7e0]/70 mt-1 max-w-2xl leading-relaxed">
              Model real-time universal convergence parameters between Earth-616 and invading branch realities. Test Doom's Reality Loom against the 8-hour destruction window.
            </p>
          </div>

          <button
            id="btn-toggle-sim"
            onClick={(e) => toggleSimulation(e)}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 border transition-all ${
              isSimulating 
                ? 'bg-[#1a2e1a] border-[#22c55e]/50 text-[#22c55e] hover:bg-[#22c55e]/20' 
                : 'bg-[#020402] border-[#1a2e1a] text-white hover:border-[#22c55e]'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'Pause Telemetry' : 'Resume Telemetry'}</span>
          </button>
        </div>
      </div>

      {/* Main Visual Collision Field */}
      <div className="rounded border border-[#22c55e]/40 bg-[#080d08] p-6 sm:p-8 doom-glow space-y-6 relative overflow-hidden">
        {/* Hologram Stage */}
        <div className="relative h-64 sm:h-72 rounded bg-[#020402] border border-[#1a2e1a] flex items-center justify-between px-6 sm:px-16 overflow-hidden">
          {/* Radar scan grid background */}
          <div className="absolute inset-0 bg-hud-grid opacity-20 pointer-events-none" />

          {/* Universe A Globe */}
          <div className="flex flex-col items-center space-y-2 relative z-10">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#1a2e1a] via-[#22c55e]/50 to-[#1a2e1a] border border-[#22c55e]/40 shadow-[0_0_30px_rgba(34,197,94,0.4)] flex items-center justify-center animate-pulse">
              <Globe className="w-12 h-12 text-[#22c55e]" />
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {universeA}
            </div>
            <span className="text-[10px] text-[#e0e7e0]/50 uppercase tracking-widest">
              SACRED REPOSITORY
            </span>
          </div>

          {/* Center Incursion Singularity Nexus */}
          <div className="flex flex-col items-center space-y-2 relative z-10 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 animate-spin flex items-center justify-center shadow-[0_0_35px_rgba(239,68,68,0.8)]" style={{ animationDuration: '4s' }}>
              <div className="w-10 h-10 rounded-full bg-[#020402] flex items-center justify-center">
                <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider">
              {incursionHoursLeft.toFixed(2)}h / 8.0h Left
            </div>
            <span className="text-[10px] text-[#e0e7e0]/50 uppercase tracking-widest">
              COLLISION HORIZON
            </span>
          </div>

          {/* Universe B Globe */}
          <div className="flex flex-col items-center space-y-2 relative z-10">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#1a2e1a] via-[#22c55e]/30 to-[#020402] border border-[#22c55e]/30 shadow-[0_0_30px_rgba(34,197,94,0.3)] flex items-center justify-center animate-pulse">
              <Globe className="w-12 h-12 text-white/90" />
            </div>
            <div className="text-xs font-bold text-[#22c55e] uppercase tracking-wider">
              {universeB}
            </div>
            <span className="text-[10px] text-[#e0e7e0]/50 uppercase tracking-widest">
              COLLIDING BRANCH
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            id="btn-sim-doom"
            onClick={(e) => triggerDoomIntervention(e)}
            className="p-3.5 rounded bg-[#020402] border border-[#1a2e1a] hover:border-[#22c55e]/60 hover:bg-[#1a2e1a]/30 transition-colors text-left space-y-1 group"
          >
            <div className="text-xs font-bold text-[#22c55e] flex items-center gap-1.5 uppercase tracking-wider">
              Doom God-Emperor Intervention
            </div>
            <p className="text-[11px] text-[#e0e7e0]/60">
              Siphon multiversal matter and forge Battleworld (+92% stability).
            </p>
          </button>

          <button
            id="btn-sim-raft"
            onClick={(e) => triggerLifeRaft(e)}
            className="p-3.5 rounded bg-[#020402] border border-[#1a2e1a] hover:border-[#22c55e]/60 hover:bg-[#1a2e1a]/30 transition-colors text-left space-y-1 group"
          >
            <div className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#22c55e]" />
              Deploy Reed's Life Raft
            </div>
            <p className="text-[11px] text-[#e0e7e0]/60">
              Preserve core champions across dimensional boundary.
            </p>
          </button>

          <button
            id="btn-sim-antimatter"
            onClick={(e) => triggerAntimatterBomb(e)}
            className="p-3.5 rounded bg-[#020402] border border-[#1a2e1a] hover:border-red-500/60 hover:bg-[#2e1a1a]/30 transition-colors text-left space-y-1 group"
          >
            <div className="text-xs font-bold text-red-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-red-400" />
              Detonate Antimatter Weapon
            </div>
            <p className="text-[11px] text-[#e0e7e0]/60">
              Vaporize colliding Earth to preserve Sacred 616.
            </p>
          </button>
        </div>

        {/* Live Terminal Telemetry Log */}
        <div className="p-3.5 rounded bg-[#020402] border border-[#1a2e1a] text-xs space-y-1">
          <div className="text-[10px] text-[#e0e7e0]/50 uppercase font-bold tracking-wider mb-1">
            LIVE INCURSION TELEMETRY LOG:
          </div>
          {simulationLog.map((log, idx) => (
            <div key={idx} className="text-[#e0e7e0]/80 flex items-center gap-1.5">
              <span className="text-[#22c55e]">{'>'}</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
