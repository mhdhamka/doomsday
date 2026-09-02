import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { DOOM_WISDOM_QUOTES, DoomWisdomQuote } from '../data/doomWisdomData';
import { soundEngine } from '../utils/audio';
import { 
  Crown, 
  RotateCw, 
  X, 
  Volume2, 
  VolumeX, 
  Flame, 
  ChevronUp,
  Quote
} from 'lucide-react';

export const DoomWisdomWidget: React.FC = () => {
  const { activeTab, triggerSFX, soundEnabled } = useApp();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<DoomWisdomQuote>(DOOM_WISDOM_QUOTES[0]);
  
  // Track previous scroll position & trigger once bottom reached
  const hasTriggeredForView = useRef(false);
  const triggerDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Randomize a new quote
  const randomizeQuote = useCallback((e?: React.MouseEvent) => {
    soundEngine.playDoomSurge();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 350);

    const sfxList = ['DOOOOM!', 'KRAKOOM!', 'WITNESS DOOM!', 'BOW BEFORE DOOM!'];
    const sfx = sfxList[Math.floor(Math.random() * sfxList.length)];
    triggerSFX({ text: sfx, color: 'green', scale: 1.25 }, e);

    setCurrentQuote((prev) => {
      const remaining = DOOM_WISDOM_QUOTES.filter((q) => q.id !== prev.id);
      return remaining[Math.floor(Math.random() * remaining.length)];
    });
  }, [triggerSFX]);

  // Reset trigger state on tab change
  useEffect(() => {
    hasTriggeredForView.current = false;
    setIsDismissed(false);
    setIsVisible(false);
    setIsMinimized(false);
  }, [activeTab]);

  // Scroll listener to detect when user reaches the bottom of the page/view
  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Threshold: within 80px of bottom or short scrollable container
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

      if (distanceFromBottom < 100 && !hasTriggeredForView.current) {
        hasTriggeredForView.current = true;
        
        // Debounce & show widget with doom surge SFX
        if (triggerDebounceRef.current) clearTimeout(triggerDebounceRef.current);
        triggerDebounceRef.current = setTimeout(() => {
          setIsVisible(true);
          soundEngine.playDoomSurge();
          triggerSFX({ text: 'DOOM HAS SPOKEN!', color: 'green', scale: 1.2 });
        }, 150);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also check on mount in case view is already at bottom (short content)
    const initialCheckTimer = setTimeout(handleScroll, 600);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (triggerDebounceRef.current) clearTimeout(triggerDebounceRef.current);
      clearTimeout(initialCheckTimer);
    };
  }, [activeTab, isDismissed, triggerSFX]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    triggerSFX({ text: 'DISMISSED!', color: 'cyan', scale: 0.9 }, e);
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleToggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    setIsMinimized(!isMinimized);
  };

  if (!isVisible && !isDismissed) return null;
  if (isDismissed) {
    // Show tiny floating summon button on bottom-right so user can reopen if desired
    return (
      <button
        id="btn-reopen-doom-wisdom"
        onClick={(e) => {
          setIsDismissed(false);
          setIsVisible(true);
          randomizeQuote(e);
        }}
        className="fixed bottom-5 right-5 z-40 p-2.5 rounded-full bg-[#061408] border-2 border-[#22c55e] text-yellow-400 hover:text-white hover:bg-[#1a2e1a] shadow-[4px_4px_0px_#000] hover:scale-110 transition-all flex items-center gap-1.5 font-comic text-xs tracking-wider uppercase group"
        title="Summon Doctor Doom's Wisdom"
      >
        <Crown className="w-4 h-4 text-yellow-400 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline font-bold">Doom's Wisdom</span>
      </button>
    );
  }

  const getMoodBadge = (mood: string) => {
    switch (mood) {
      case 'DIVINE':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/70';
      case 'OMINOUS':
        return 'bg-red-950/80 text-red-300 border-red-500/70';
      case 'PHILOSOPHICAL':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/70';
      case 'CONTEMPTUOUS':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/70';
      case 'TRIUMPHANT':
      default:
        return 'bg-[#1a2e1a] text-[#22c55e] border-[#22c55e]';
    }
  };

  return (
    <div 
      aria-label="Doctor Doom's Ominous Wisdom"
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 max-w-sm sm:max-w-md w-[calc(100vw-2rem)] select-none transition-all duration-300"
    >
      {/* Minimized Compact View */}
      {isMinimized ? (
        <div 
          onClick={handleToggleMinimize}
          className="cursor-pointer flex items-center justify-between p-3 rounded-lg bg-[#061408] border-2 border-[#22c55e] shadow-[4px_4px_0px_#000] hover:bg-[#1a2e1a] transition-all"
        >
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-black border border-yellow-400 flex items-center justify-center">
              <Crown className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <span className="font-comic text-yellow-400 text-sm tracking-wider uppercase block">
                DOOM'S WISDOM
              </span>
              <span className="text-[10px] text-[#e0e7e0]/60 italic truncate block max-w-[200px]">
                {currentQuote.quote.slice(0, 35)}...
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <ChevronUp className="w-4 h-4 text-yellow-400" />
          </div>
        </div>
      ) : (
        /* Expanded Classic Comic Book Speech Bubble */
        <div className="relative animate-comic-sfx-pop">
          {/* Comic Speech Bubble Container */}
          <div className="relative rounded-xl border-3 border-black bg-[#faf8ef] text-black p-4 sm:p-5 shadow-[6px_6px_0px_#052e16,0_0_25px_rgba(34,197,94,0.35)] bg-comic-dots">
            {/* Speech Bubble Tail Pointing Down/Left toward Doom's Presence */}
            <div className="absolute -bottom-4 right-10 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[16px] border-t-black drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
              <div className="absolute -top-[19px] -left-[11px] w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-t-[13px] border-t-[#faf8ef]" />
            </div>

            {/* Bubble Top Tag & Action Icons */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b-2 border-black/80">
              {/* Monarch Crest Tag */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-black text-yellow-400 font-comic tracking-wider text-xs border border-black shadow-[2px_2px_0px_#000]">
                  <Crown className="w-3.5 h-3.5 text-yellow-400" />
                  <span>DOOM'S WISDOM</span>
                </div>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border shadow-sm ${getMoodBadge(currentQuote.mood)}`}>
                  {currentQuote.mood}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-1">
                {/* Randomize Quote Button */}
                <button
                  id="btn-next-doom-quote"
                  onClick={randomizeQuote}
                  className={`p-1.5 rounded bg-black text-yellow-400 border border-black hover:bg-yellow-400 hover:text-black transition-all shadow-[1px_1px_0px_#000] ${
                    isAnimating ? 'rotate-180 scale-90' : ''
                  }`}
                  title="Receive Another Proclamation from Doom"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>

                {/* Minimize Button */}
                <button
                  onClick={handleToggleMinimize}
                  className="p-1.5 rounded bg-black text-white border border-black hover:bg-neutral-800 transition-all shadow-[1px_1px_0px_#000]"
                  title="Minimize Speech Bubble"
                >
                  <ChevronUp className="w-3.5 h-3.5 rotate-180" />
                </button>

                {/* Close Button */}
                <button
                  onClick={handleDismiss}
                  className="p-1.5 rounded bg-red-600 text-white border border-black hover:bg-red-700 transition-all shadow-[1px_1px_0px_#000]"
                  title="Dismiss Speech Bubble"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Speech Bubble Body with Classic Comic Typography */}
            <div className="pt-3 space-y-2.5">
              {/* Context Lead */}
              <div className="flex items-center space-x-1.5 text-[10px] font-bold text-neutral-700 uppercase tracking-wider">
                <Flame className="w-3 h-3 text-red-600" />
                <span>{currentQuote.source} • {currentQuote.comicIssue}</span>
              </div>

              {/* Main Quote */}
              <div className="relative pl-3 border-l-3 border-black bg-yellow-100/60 p-2.5 rounded border border-black/30 shadow-inner">
                <Quote className="w-4 h-4 text-black/30 absolute top-2 right-2" />
                <p className="font-comic text-base sm:text-lg text-black uppercase leading-tight tracking-wide font-black">
                  {currentQuote.quote}
                </p>
              </div>

              {/* Lore Context Footnote */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-neutral-800">
                <span className="italic font-medium">
                  {currentQuote.context}
                </span>
                <span className="font-mono text-[9px] font-bold uppercase bg-black text-yellow-300 px-1.5 py-0.5 rounded border border-black shrink-0 ml-2">
                  TARGET: {currentQuote.target || 'MORTALS'}
                </span>
              </div>
            </div>

            {/* Bottom Floating Avatar Badge of Victor von Doom */}
            <div className="mt-3 pt-2 border-t border-black/40 flex items-center justify-between text-[10px] text-neutral-600 font-bold uppercase tracking-wider">
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded-full bg-[#1a2e1a] border border-black flex items-center justify-center">
                  <span className="text-[9px] text-[#22c55e] font-black">D</span>
                </div>
                <span>Sovereignty of Latveria</span>
              </div>
              <span className="font-mono text-[9px] text-neutral-500">
                AUTO-TRIGGERED AT END OF SCROLL
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
