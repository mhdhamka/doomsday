import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TAB_NARRATIONS, 
  ComicNarrationEntry,
  LATVERIAN_DAILY_HEADLINES,
  LatverianDailyHeadline,
  DOOM_MANIFESTO_SNIPPETS,
  DoomManifestoSnippet
} from '../data/comicNarrationData';
import { soundEngine } from '../utils/audio';
import { 
  BookOpen, 
  RotateCw, 
  ChevronDown, 
  ChevronUp, 
  Radio, 
  Eye, 
  Crown, 
  Compass,
  MessageSquareQuote,
  Newspaper,
  ScrollText,
  Flame,
  ShieldAlert
} from 'lucide-react';

interface ComicNarrationBoxProps {
  tabOverride?: string;
  className?: string;
}

type NarrationMode = 'NARRATOR' | 'LATVERIAN_DAILY' | 'DOOM_MANIFESTO';

export const ComicNarrationBox: React.FC<ComicNarrationBoxProps> = ({ 
  tabOverride,
  className = '' 
}) => {
  const { activeTab, triggerSFX } = useApp();
  const currentTab = tabOverride || activeTab;
  
  const narrations = TAB_NARRATIONS[currentTab] || TAB_NARRATIONS['hud'];
  const [currentNarratorIndex, setCurrentNarratorIndex] = useState(0);
  const [currentHeadline, setCurrentHeadline] = useState<LatverianDailyHeadline>(LATVERIAN_DAILY_HEADLINES[0]);
  const [currentManifesto, setCurrentManifesto] = useState<DoomManifestoSnippet>(DOOM_MANIFESTO_SNIPPETS[0]);
  const [narrationMode, setNarrationMode] = useState<NarrationMode>('NARRATOR');
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCycling, setIsCycling] = useState(false);

  // Whenever user switches tabs: fetch and randomize a fresh Latverian Daily headline and Manifesto snippet
  useEffect(() => {
    // 1. Pick a randomized narrator entry suitable for the tab
    const randomNarratorIdx = Math.floor(Math.random() * narrations.length);
    setCurrentNarratorIndex(randomNarratorIdx);

    // 2. Fetch randomized Latverian Daily headline
    const randomHeadlineIdx = Math.floor(Math.random() * LATVERIAN_DAILY_HEADLINES.length);
    setCurrentHeadline(LATVERIAN_DAILY_HEADLINES[randomHeadlineIdx]);

    // 3. Fetch randomized Dr. Doom Manifesto snippet
    const randomManifestoIdx = Math.floor(Math.random() * DOOM_MANIFESTO_SNIPPETS.length);
    setCurrentManifesto(DOOM_MANIFESTO_SNIPPETS[randomManifestoIdx]);

    // 4. Randomly pick a dominant display mode or cycle through them
    const modes: NarrationMode[] = ['NARRATOR', 'LATVERIAN_DAILY', 'DOOM_MANIFESTO'];
    const chosenMode = modes[Math.floor(Math.random() * modes.length)];
    setNarrationMode(chosenMode);
  }, [currentTab, narrations.length]);

  const activeEntry: ComicNarrationEntry = narrations[currentNarratorIndex] || narrations[0];

  const handleNextMode = (e: React.MouseEvent) => {
    soundEngine.playPageTurn();
    setIsCycling(true);
    setTimeout(() => setIsCycling(false), 300);

    const sfxOptions = ['THWIP!', 'SWOOOSH!', 'KRAKOOM!', 'DOOOOM!', 'ZAAAAP!'];
    const randomSfx = sfxOptions[Math.floor(Math.random() * sfxOptions.length)];
    triggerSFX({ text: randomSfx, color: 'yellow', scale: 1.1 }, e);

    // Cycle through modes or within the active mode
    if (narrationMode === 'NARRATOR') {
      const nextIdx = (currentNarratorIndex + 1) % narrations.length;
      if (nextIdx === 0) {
        setNarrationMode('LATVERIAN_DAILY');
      } else {
        setCurrentNarratorIndex(nextIdx);
      }
    } else if (narrationMode === 'LATVERIAN_DAILY') {
      setNarrationMode('DOOM_MANIFESTO');
      const randomManifesto = DOOM_MANIFESTO_SNIPPETS[Math.floor(Math.random() * DOOM_MANIFESTO_SNIPPETS.length)];
      setCurrentManifesto(randomManifesto);
    } else {
      setNarrationMode('NARRATOR');
      setCurrentNarratorIndex(0);
    }
  };

  const handleSelectMode = (mode: NarrationMode, e: React.MouseEvent) => {
    if (mode === narrationMode) return;
    soundEngine.playClick();
    if (mode === 'DOOM_MANIFESTO') {
      triggerSFX({ text: 'DOOOOM!', color: 'green', scale: 1.15 }, e);
    } else if (mode === 'LATVERIAN_DAILY') {
      triggerSFX({ text: 'EXTRA! EXTRA!', color: 'yellow', scale: 1.05 }, e);
    } else {
      triggerSFX({ text: 'CHRONO-LOG', color: 'cyan', scale: 1.0 }, e);
    }
    setNarrationMode(mode);
  };

  const getNarratorIcon = (narrator: string) => {
    switch (narrator) {
      case 'VICTOR_VON_DOOM':
        return <Crown className="w-3.5 h-3.5 text-yellow-400" />;
      case 'THE_WATCHER':
        return <Eye className="w-3.5 h-3.5 text-cyan-400" />;
      case 'LOKI_GOD_OF_STORIES':
        return <Compass className="w-3.5 h-3.5 text-[#22c55e]" />;
      case 'TVA_ARCHIVIST':
        return <Radio className="w-3.5 h-3.5 text-amber-400" />;
      case 'MARVEL_SCRIBE':
      default:
        return <BookOpen className="w-3.5 h-3.5 text-yellow-400" />;
    }
  };

  const getBorderTheme = () => {
    if (narrationMode === 'LATVERIAN_DAILY') {
      return 'border-yellow-500/80 shadow-[4px_4px_0px_#713f12] bg-[#0c0d08]';
    }
    if (narrationMode === 'DOOM_MANIFESTO') {
      return 'border-emerald-400 shadow-[4px_4px_0px_#052e16] bg-[#061208]';
    }
    switch (activeEntry.badgeColor) {
      case 'yellow':
        return 'border-yellow-500/80 shadow-[4px_4px_0px_#713f12] bg-[#0c0d08]';
      case 'red':
        return 'border-red-500/80 shadow-[4px_4px_0px_#450a0a] bg-[#0d0808]';
      case 'cyan':
        return 'border-cyan-500/80 shadow-[4px_4px_0px_#082f49] bg-[#080c0d]';
      case 'purple':
        return 'border-purple-500/80 shadow-[4px_4px_0px_#3b0764] bg-[#0c080d]';
      case 'green':
      default:
        return 'border-[#22c55e] shadow-[4px_4px_0px_#052e16] bg-[#080d08]';
    }
  };

  return (
    <aside 
      aria-label="Comic Lore Narration and Latverian News Wire"
      className={`relative w-full rounded-md border-2 ${getBorderTheme()} transition-all duration-300 bg-comic-dots p-4 sm:p-5 mb-6 overflow-hidden select-none ${className}`}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-black/60">
        {/* Left Comic Metadata Tag */}
        <div className="flex items-center space-x-2">
          {narrationMode === 'LATVERIAN_DAILY' && (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-yellow-400 text-black font-comic tracking-wider text-xs border border-yellow-300 shadow-[2px_2px_0px_#000]">
              <Newspaper className="w-3.5 h-3.5 text-black" />
              <span>THE LATVERIAN DAILY</span>
            </div>
          )}

          {narrationMode === 'DOOM_MANIFESTO' && (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#1a2e1a] text-[#22c55e] font-comic tracking-wider text-xs border border-[#22c55e] shadow-[2px_2px_0px_#000]">
              <Crown className="w-3.5 h-3.5 text-yellow-400" />
              <span>DOOM'S MANIFESTO</span>
            </div>
          )}

          {narrationMode === 'NARRATOR' && (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-black text-yellow-400 font-comic tracking-wider text-xs border border-yellow-400/40 shadow-[2px_2px_0px_#000]">
              <span>NARRATION BOX</span>
            </div>
          )}

          <span className="text-[11px] font-bold text-[#e0e7e0]/70 uppercase tracking-widest hidden sm:inline-block">
            {narrationMode === 'LATVERIAN_DAILY'
              ? `${currentHeadline.date} • ${currentHeadline.edictNumber}`
              : narrationMode === 'DOOM_MANIFESTO'
              ? `${currentManifesto.seal} • ${currentManifesto.clause}`
              : `${activeEntry.location} • ${activeEntry.issueNumber}`}
          </span>
        </div>

        {/* Right Voice / Mode Switcher & Collapse Controls */}
        <div className="flex items-center space-x-1.5">
          {/* Mode Selector Tabs */}
          <div className="flex items-center space-x-1 bg-black/80 p-0.5 rounded border border-white/10">
            <button
              onClick={(e) => handleSelectMode('LATVERIAN_DAILY', e)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${
                narrationMode === 'LATVERIAN_DAILY'
                  ? 'bg-yellow-400 text-black shadow-sm font-black'
                  : 'text-[#e0e7e0]/60 hover:text-white hover:bg-white/5'
              }`}
              title="View Latverian Daily Newspaper Dispatch"
            >
              <Newspaper className="w-3 h-3" />
              <span className="hidden md:inline">Latverian Daily</span>
            </button>

            <button
              onClick={(e) => handleSelectMode('DOOM_MANIFESTO', e)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${
                narrationMode === 'DOOM_MANIFESTO'
                  ? 'bg-[#1a2e1a] text-[#22c55e] border border-[#22c55e] shadow-sm font-black'
                  : 'text-[#e0e7e0]/60 hover:text-white hover:bg-white/5'
              }`}
              title="View Doctor Doom's Imperial Manifesto"
            >
              <ScrollText className="w-3 h-3 text-[#22c55e]" />
              <span className="hidden md:inline">Manifesto</span>
            </button>

            <button
              onClick={(e) => handleSelectMode('NARRATOR', e)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${
                narrationMode === 'NARRATOR'
                  ? 'bg-white/20 text-yellow-300 shadow-sm font-black'
                  : 'text-[#e0e7e0]/60 hover:text-white hover:bg-white/5'
              }`}
              title="View Comic Scribe / TVA Narration"
            >
              <BookOpen className="w-3 h-3" />
              <span className="hidden md:inline">Comic Scribe</span>
            </button>
          </div>

          {/* Cycle Button */}
          <button
            id="btn-cycle-narration"
            onClick={handleNextMode}
            className={`p-1.5 rounded bg-black border border-white/20 text-yellow-400 hover:text-yellow-300 hover:border-yellow-400 transition-all shadow-[2px_2px_0px_#000] flex items-center gap-1 text-[11px] font-bold uppercase ${
              isCycling ? 'rotate-180 scale-95' : ''
            }`}
            title="Cycle Headlines, Manifesto & Voices"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Randomize</span>
          </button>

          {/* Collapse/Expand */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setIsCollapsed(!isCollapsed);
            }}
            className="p-1.5 rounded bg-black border border-white/20 text-[#e0e7e0]/70 hover:text-white hover:border-white transition-all shadow-[2px_2px_0px_#000]"
            title={isCollapsed ? 'Expand Narration' : 'Collapse Narration'}
          >
            {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Body */}
      {!isCollapsed && (
        <div className="pt-3.5 space-y-2.5 animate-comic-panel-slide">
          {/* 1. LATVERIAN DAILY MODE */}
          {narrationMode === 'LATVERIAN_DAILY' && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-yellow-400 text-black border border-yellow-500 shadow-[1px_1px_0px_#000]">
                  {currentHeadline.category.replace('_', ' ')}
                </span>
                <span className="text-xs text-yellow-300/80 font-mono">
                  {currentHeadline.edictNumber}
                </span>
              </div>

              <h2 className="font-comic text-2xl sm:text-3xl text-yellow-400 comic-title-stroke tracking-wide uppercase leading-tight">
                {currentHeadline.headline}
              </h2>

              <div className="relative pl-4 border-l-4 border-yellow-400 bg-black/50 py-2.5 px-3 rounded-r border-y border-r border-black/80 shadow-inner">
                <Newspaper className="w-4 h-4 text-yellow-400/40 absolute top-2 right-2" />
                <p className="font-sans text-sm sm:text-base text-[#e0e7e0] font-semibold leading-relaxed">
                  {currentHeadline.subdeck}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-1 text-[11px] text-[#e0e7e0]/70">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#22c55e] uppercase">MONARCH DIRECTIVE:</span>
                  <span className="italic">"Disobedience to timeline stabilization protocols shall be met with immediate exile to the Wastelands."</span>
                </div>
                <span className="text-[10px] uppercase font-mono text-yellow-400/90 bg-black/60 px-2 py-0.5 rounded border border-yellow-400/30 self-start sm:self-auto">
                  AUTHORITY: LORD DOOM
                </span>
              </div>
            </div>
          )}

          {/* 2. DOOM MANIFESTO MODE */}
          {narrationMode === 'DOOM_MANIFESTO' && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#1a2e1a] text-[#22c55e] border border-[#22c55e] shadow-[1px_1px_0px_#000] flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#22c55e]" />
                  {currentManifesto.clause}
                </span>
                <span className="text-xs text-[#e0e7e0]/60 font-mono">
                  {currentManifesto.philosophy}
                </span>
              </div>

              <h2 className="font-comic text-2xl sm:text-3xl text-[#22c55e] comic-title-stroke tracking-wide uppercase leading-tight">
                {currentManifesto.title}
              </h2>

              <div className="relative pl-4 border-l-4 border-[#22c55e] bg-black/60 py-3 px-3.5 rounded-r border-y border-r border-black/80 shadow-inner">
                <Crown className="w-5 h-5 text-[#22c55e]/30 absolute top-2 right-2" />
                <p className="font-serif text-sm sm:text-base text-white/95 italic font-medium leading-relaxed tracking-wide">
                  "{currentManifesto.excerpt}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-1 text-[11px] text-[#e0e7e0]/70">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-yellow-400 uppercase">IMPERIAL CODEX:</span>
                  <span className="italic">From the private journals of Victor von Doom, Sovereign of Latveria.</span>
                </div>
                <span className="text-[10px] uppercase font-mono text-[#22c55e] bg-black/70 px-2 py-0.5 rounded border border-[#22c55e]/40 self-start sm:self-auto">
                  {currentManifesto.seal}
                </span>
              </div>
            </div>
          )}

          {/* 3. COMIC NARRATOR MODE */}
          {narrationMode === 'NARRATOR' && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#1a2e1a] text-[#22c55e] border border-[#22c55e]/60 flex items-center gap-1">
                  {getNarratorIcon(activeEntry.narrator)}
                  {activeEntry.narratorName} ({activeEntry.narratorTitle})
                </span>
              </div>

              <h2 className="font-comic text-2xl sm:text-3xl text-yellow-400 comic-title-stroke tracking-wide uppercase leading-tight">
                {activeEntry.leadWord}
              </h2>

              <div className="relative pl-4 border-l-4 border-yellow-400/80 bg-black/40 py-2.5 px-3 rounded-r border-y border-r border-black/80 shadow-inner">
                <MessageSquareQuote className="w-4 h-4 text-yellow-400/60 absolute top-2 right-2" />
                <p className="font-sans text-sm sm:text-base text-[#e0e7e0] italic font-semibold leading-relaxed tracking-wide">
                  "{activeEntry.quote}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-1 text-[11px] text-[#e0e7e0]/70">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#22c55e] uppercase">CHRONO-NOTE:</span>
                  <span className="italic">{activeEntry.loreNote}</span>
                </div>
                <span className="text-[10px] uppercase font-mono text-yellow-400/80 bg-black/60 px-2 py-0.5 rounded border border-yellow-400/30 self-start sm:self-auto">
                  REF: {activeEntry.issueNumber}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Collapsed State Summary */}
      {isCollapsed && (
        <div className="pt-2 flex items-center justify-between text-xs text-[#e0e7e0]/70">
          <span className="font-comic text-yellow-400 text-base tracking-wide uppercase">
            {narrationMode === 'LATVERIAN_DAILY'
              ? currentHeadline.headline
              : narrationMode === 'DOOM_MANIFESTO'
              ? currentManifesto.title
              : activeEntry.leadWord}
          </span>
          <span className="italic text-[11px] text-[#e0e7e0]/50 truncate max-w-[280px] sm:max-w-md">
            {narrationMode === 'LATVERIAN_DAILY'
              ? currentHeadline.subdeck
              : narrationMode === 'DOOM_MANIFESTO'
              ? currentManifesto.excerpt
              : activeEntry.quote}
          </span>
        </div>
      )}
    </aside>
  );
};
