import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ROADMAP_ITEMS } from '../data/roadmapData';
import { WatchlistItem, TimelineCategory } from '../types';
import { 
  CheckCircle2, 
  Circle, 
  Search, 
  Filter, 
  Clock, 
  Info, 
  Star, 
  Flame, 
  Tv, 
  Film, 
  ChevronRight, 
  RotateCcw, 
  CheckCheck,
  ExternalLink,
  Layers,
  X
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const RoadmapFlow: React.FC = () => {
  const { 
    isWatched, 
    toggleWatched, 
    markAllWatched, 
    resetProgress, 
    completedItemsCount, 
    totalItems, 
    completionPercentage,
    totalWatchtimeMinutes,
    completedWatchtimeMinutes,
    userNotes,
    setNote,
    userRatings,
    setRating,
    selectedItemModal,
    setSelectedItemModal
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<'ALL' | TimelineCategory | 'UNWATCHED' | 'CRITICAL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'ORDER' | 'YEAR' | 'RUNTIME'>('ORDER');

  // Filter items
  const filteredItems = ROADMAP_ITEMS.filter((item) => {
    // Category filter
    if (activeCategory === 'UNWATCHED' && isWatched(item.id)) return false;
    if (activeCategory === 'CRITICAL' && item.importance !== 'CRITICAL_MUST_WATCH') return false;
    if (activeCategory !== 'ALL' && activeCategory !== 'UNWATCHED' && activeCategory !== 'CRITICAL') {
      if (item.category !== activeCategory) return false;
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCharacters = item.keyCharacters.some((c) => c.toLowerCase().includes(q));
      const matchTagline = item.tagline.toLowerCase().includes(q);
      const matchDoom = item.doomConnection.toLowerCase().includes(q);
      return matchTitle || matchCharacters || matchTagline || matchDoom;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'YEAR') return a.releaseYear - b.releaseYear;
    if (sortBy === 'RUNTIME') return b.runtimeMinutes - a.runtimeMinutes;
    return a.order - b.order;
  });

  const formatHours = (mins: number) => {
    const hrs = Math.floor(mins / 60);
    const m = mins % 60;
    return `${hrs}h ${m > 0 ? `${m}m` : ''}`;
  };

  const remainingMins = Math.max(0, totalWatchtimeMinutes - completedWatchtimeMinutes);

  return (
    <div className="space-y-6 animate-fadeIn font-mono">
      {/* Comic Narration Header Box */}
      <div className="rounded bg-[#080d08] border-2 border-[#1a2e1a] p-5 sm:p-6 relative overflow-hidden comic-shadow-dark doom-glow bg-comic-dots">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#22c55e] mb-1">
              <span className="px-2 py-0.5 bg-[#22c55e] text-black font-comic text-xs uppercase font-black">
                FIELD GUIDE
              </span>
              <span className="uppercase tracking-widest font-bold">MULTIVERSE WATCH LIST</span>
            </div>
            <h2 className="font-comic text-3xl sm:text-4xl text-white uppercase comic-title-stroke tracking-wide">
              Essential 15-Title Preparation Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-[#e0e7e0]/80 mt-1 max-w-2xl leading-relaxed">
              Curated roadmap breaking down multiversal incursions, the Fantastic Four, and foundational legacy realities required before <strong className="text-white">Avengers: Doomsday</strong> hits theaters.
            </p>
          </div>

          {/* Runtime & Progress Pills in Comic Style */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded bg-[#020402] border-2 border-[#1a2e1a] text-center shadow-[2px_2px_0px_#000]">
              <div className="text-[10px] text-[#22c55e] font-comic uppercase tracking-wider">Watched Progress</div>
              <div className="text-sm font-comic text-[#22c55e] tracking-wider text-base">
                {completedItemsCount} / {totalItems} ({completionPercentage}%)
              </div>
            </div>

            <div className="px-3.5 py-2 rounded bg-[#020402] border-2 border-[#1a2e1a] text-center shadow-[2px_2px_0px_#000]">
              <div className="text-[10px] text-[#e0e7e0]/70 font-comic uppercase tracking-wider">Time Remaining</div>
              <div className="text-sm font-bold text-white">
                {formatHours(remainingMins)}
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                id="btn-mark-all-watched"
                onClick={(e) => markAllWatched(e)}
                className="p-2 rounded bg-[#1a2e1a] text-[#22c55e] border-2 border-[#22c55e] hover:bg-[#22c55e]/20 transition-all text-xs font-bold uppercase flex items-center gap-1 shadow-[2px_2px_0px_#000]"
                title="Mark all 15 titles watched"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">All Done</span>
              </button>

              <button
                id="btn-reset-roadmap"
                onClick={(e) => resetProgress(e)}
                className="p-2 rounded bg-[#020402] text-[#e0e7e0]/50 border-2 border-[#1a2e1a] hover:text-red-400 hover:border-red-900 transition-all text-xs font-bold uppercase flex items-center gap-1 shadow-[2px_2px_0px_#000]"
                title="Reset watchlist"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-4 w-full bg-[#020402] h-3 rounded border-2 border-[#1a2e1a] overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#1a2e1a] to-[#22c55e] transition-all duration-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'ALL', label: 'All 15 Titles' },
            { id: 'Multiversal Incursions', label: 'Multiversal Incursions' },
            { id: 'Sacred Timeline', label: 'Sacred Timeline' },
            { id: 'Legacy Realities', label: 'Legacy & FF' },
            { id: 'CRITICAL', label: '★ Critical Must-Watch' },
            { id: 'UNWATCHED', label: 'Remaining Only' },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`filter-tab-${tab.id.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => {
                soundEngine.playClick();
                setActiveCategory(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap uppercase tracking-wider transition-all shadow-[2px_2px_0px_#000] ${
                activeCategory === tab.id
                  ? 'bg-[#1a2e1a] text-[#22c55e] border-2 border-[#22c55e]'
                  : 'bg-[#080d08] text-[#e0e7e0]/70 hover:text-white border-2 border-[#1a2e1a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#e0e7e0]/40" />
            <input
              id="roadmap-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, character, Doom clue..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#080d08] border-2 border-[#1a2e1a] rounded text-white placeholder-[#e0e7e0]/40 focus:outline-none focus:border-[#22c55e] shadow-[2px_2px_0px_#000]"
            />
          </div>

          <select
            id="roadmap-sort-select"
            value={sortBy}
            onChange={(e) => {
              soundEngine.playClick();
              setSortBy(e.target.value as any);
            }}
            className="px-2.5 py-1.5 text-xs bg-[#080d08] border-2 border-[#1a2e1a] text-[#e0e7e0] rounded focus:outline-none focus:border-[#22c55e] cursor-pointer shadow-[2px_2px_0px_#000] font-bold"
          >
            <option value="ORDER">Narrative Priority Order</option>
            <option value="YEAR">Release Year</option>
            <option value="RUNTIME">Runtime (Longest first)</option>
          </select>
        </div>
      </div>

      {/* Grid of Roadmap Titles in Comic Panel Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const watched = isWatched(item.id);
          const currentRating = userRatings[item.id] || 0;

          return (
            <div
              key={item.id}
              id={`roadmap-card-${item.id}`}
              className={`group rounded border-2 transition-all duration-200 flex flex-col justify-between overflow-hidden relative shadow-[4px_4px_0px_#1a2e1a] hover:shadow-[4px_4px_0px_#22c55e] ${
                watched
                  ? 'border-[#22c55e]/60 bg-[#080d08]/90'
                  : 'border-[#1a2e1a] bg-[#080d08] hover:border-[#22c55e]'
              }`}
            >
              {/* Top Card Header */}
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded border border-[#22c55e]/40 bg-[#1a2e1a] text-[#22c55e] uppercase font-bold tracking-wider">
                      {item.category}
                    </span>
                    {item.importance === 'CRITICAL_MUST_WATCH' && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-red-600 text-white font-bold flex items-center gap-1 uppercase tracking-wider font-comic">
                        <Flame className="w-2.5 h-2.5 text-white" />
                        CRITICAL
                      </span>
                    )}
                  </div>

                  {/* Complete Checkbox Button */}
                  <button
                    id={`toggle-watch-${item.id}`}
                    onClick={(e) => toggleWatched(item.id, e)}
                    className={`p-1.5 rounded border-2 transition-all shadow-[2px_2px_0px_#000] ${
                      watched
                        ? 'bg-[#22c55e] text-black border-[#22c55e]'
                        : 'bg-[#020402] text-[#e0e7e0]/40 border-[#1a2e1a] hover:border-[#22c55e] hover:text-[#22c55e]'
                    }`}
                    title={watched ? 'Mark as unwatched' : 'Mark as watched'}
                    aria-label={`Toggle watched state for ${item.title}`}
                  >
                    {watched ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  </button>
                </div>

                {/* Title and Metadata */}
                <div>
                  <h3 className={`font-comic text-2xl tracking-wide transition-colors uppercase comic-title-stroke leading-tight ${
                    watched ? 'text-[#22c55e] line-through opacity-80' : 'text-white group-hover:text-[#22c55e]'
                  }`}>
                    {item.order}. {item.title}
                  </h3>
                  <div className="flex items-center space-x-3 text-xs text-[#e0e7e0]/70 mt-1">
                    <span className="font-bold">{item.releaseYear}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#22c55e]" />
                      {formatHours(item.runtimeMinutes)}
                    </span>
                    <span>•</span>
                    <span className="text-[#22c55e] font-bold">{item.streamingService}</span>
                  </div>
                </div>

                <p className="text-xs text-[#e0e7e0]/80 line-clamp-2 leading-relaxed">
                  {item.tagline}
                </p>

                {/* Doom & Incursion Highlight Box */}
                <div className="p-2.5 rounded bg-[#020402] border border-[#1a2e1a] text-[11px] text-[#e0e7e0]/80 space-y-1">
                  <div className="text-[#22c55e] font-bold flex items-center gap-1 text-[10px] uppercase tracking-wider font-comic">
                    DOOM & INCURSION CLUES
                  </div>
                  <p className="line-clamp-2 text-[#e0e7e0]/80">
                    {item.doomConnection}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-4 py-3 bg-[#020402] border-t-2 border-[#1a2e1a] flex items-center justify-between">
                {/* 5-Star Rating */}
                <div className="flex items-center space-x-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      id={`star-${item.id}-${star}`}
                      onClick={(e) => setRating(item.id, star, e)}
                      className={`p-0.5 transition-colors ${
                        star <= currentRating ? 'text-[#22c55e]' : 'text-[#1a2e1a] hover:text-[#22c55e]/60'
                      }`}
                      title={`Rate ${star} star`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                  ))}
                </div>

                {/* Deep-Dive Lore Button */}
                <button
                  id={`btn-open-dossier-${item.id}`}
                  onClick={() => {
                    soundEngine.playTvaBeep();
                    setSelectedItemModal(item);
                  }}
                  className="text-xs font-bold uppercase tracking-wider text-[#22c55e] hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Dossier Intel</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Item Deep-Dive Lore Modal */}
      {selectedItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div 
            id="roadmap-item-modal"
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded border border-[#22c55e]/40 bg-[#080d08] p-5 sm:p-7 shadow-2xl doom-glow space-y-5"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#1a2e1a] pb-4">
              <div>
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="text-[10px] px-2.5 py-0.5 rounded border border-[#22c55e]/40 bg-[#1a2e1a] text-[#22c55e] uppercase font-bold tracking-wider">
                    {selectedItemModal.category}
                  </span>
                  <span className="text-xs text-[#e0e7e0]/60">
                    {selectedItemModal.releaseYear} • {formatHours(selectedItemModal.runtimeMinutes)} • {selectedItemModal.streamingService}
                  </span>
                </div>
                <h2 className="font-black text-xl sm:text-2xl text-white uppercase italic tracking-tight">
                  {selectedItemModal.order}. {selectedItemModal.title}
                </h2>
                <p className="text-xs text-[#22c55e] mt-0.5">
                  "{selectedItemModal.tagline}"
                </p>
              </div>

              <button
                id="btn-close-modal"
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedItemModal(null);
                }}
                className="p-2 rounded bg-[#020402] border border-[#1a2e1a] text-[#e0e7e0]/60 hover:text-white hover:border-[#22c55e]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Why It Matters for Doomsday */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#22c55e] flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                Why It Matters for Avengers: Doomsday
              </h4>
              <p className="text-xs sm:text-sm text-[#e0e7e0] leading-relaxed bg-[#020402] p-3.5 rounded border border-[#1a2e1a]">
                {selectedItemModal.whyItMatters}
              </p>
            </div>

            {/* Doom Connection */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#22c55e] flex items-center gap-1.5">
                Doctor Doom & The Multiverse Connection
              </h4>
              <p className="text-xs sm:text-sm text-[#e0e7e0] leading-relaxed bg-[#1a2e1a]/40 p-3.5 rounded border border-[#22c55e]/30">
                {selectedItemModal.doomConnection}
              </p>
            </div>

            {/* Key Incursion Clues */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                Key Incursion & Multiverse Clues to Watch For
              </h4>
              <ul className="space-y-1.5">
                {selectedItemModal.keyIncursionClues.map((clue, idx) => (
                  <li key={idx} className="text-xs text-[#e0e7e0]/80 flex items-start gap-2 bg-[#020402] p-2 rounded border border-[#1a2e1a]">
                    <span className="text-[#22c55e] font-bold shrink-0">0{idx + 1}.</span>
                    <span>{clue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Characters */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#e0e7e0]/60">
                Key Timeline Operatives
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedItemModal.keyCharacters.map((char, idx) => (
                  <span key={idx} className="px-2.5 py-1 text-xs bg-[#020402] border border-[#1a2e1a] text-[#e0e7e0] rounded">
                    {char}
                  </span>
                ))}
              </div>
            </div>

            {/* Personal Notes Box */}
            <div className="space-y-2 pt-2 border-t border-[#1a2e1a]">
              <label htmlFor="user-note-input" className="text-xs text-[#e0e7e0]/60 block uppercase tracking-wider">
                Personal Prep Notes (Saved automatically):
              </label>
              <textarea
                id="user-note-input"
                rows={2}
                value={userNotes[selectedItemModal.id] || ''}
                onChange={(e) => setNote(selectedItemModal.id, e.target.value)}
                placeholder="Log your theories, timeline questions, or key observations..."
                className="w-full p-2.5 text-xs bg-[#020402] border border-[#1a2e1a] rounded text-white placeholder-[#e0e7e0]/40 focus:outline-none focus:border-[#22c55e]"
              />
            </div>

            {/* Modal Bottom Toggle */}
            <div className="flex items-center justify-between pt-2">
              <button
                id="modal-toggle-watch"
                onClick={() => toggleWatched(selectedItemModal.id)}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  isWatched(selectedItemModal.id)
                    ? 'bg-[#22c55e] text-black shadow-lg shadow-[#22c55e]/20'
                    : 'bg-[#020402] text-white border border-[#1a2e1a] hover:border-[#22c55e]'
                }`}
              >
                {isWatched(selectedItemModal.id) ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completed / Watched</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    <span>Mark as Watched</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedItemModal(null)}
                className="px-4 py-2 text-xs text-[#e0e7e0]/60 hover:text-white uppercase tracking-wider"
              >
                Close Intel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
