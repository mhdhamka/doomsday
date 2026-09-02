import React, { useState } from 'react';
import { COMIC_ARCHIVES } from '../data/dossierData';
import { ComicIssue } from '../types';
import { 
  BookOpen, 
  Flame, 
  CheckCircle2, 
  Layers, 
  ChevronRight, 
  Bookmark, 
  Feather
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const ComicBlueprint: React.FC = () => {
  const [selectedComic, setSelectedComic] = useState<ComicIssue>(COMIC_ARCHIVES[0]);
  const [savedComics, setSavedComics] = useState<string[]>(['secret-wars-2015']);

  const toggleBookmark = (id: string) => {
    soundEngine.playClick();
    setSavedComics((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn font-mono">
      {/* Header Banner */}
      <div className="rounded border border-[#1a2e1a] bg-[#080d08] p-5 sm:p-6 backdrop-blur-md doom-glow">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#22c55e] mb-1">
              <BookOpen className="w-4 h-4" />
              <span className="uppercase tracking-widest font-bold">MARVEL COMIC LITERATURE BLUEPRINT</span>
            </div>
            <h2 className="font-bold text-xl sm:text-2xl text-white uppercase italic tracking-tight">
              The Essential Reading Archive
            </h2>
            <p className="text-xs sm:text-sm text-[#e0e7e0]/70 mt-1 max-w-2xl leading-relaxed">
              While tracking the ground-level continuity of the MCU, diving into classic comic events provides the foundational masterplan for Jonathan Hickman's Incursions and Doctor Doom's ascension.
            </p>
          </div>

          <div className="px-3.5 py-2 rounded bg-[#020402] border border-[#1a2e1a] text-center shrink-0">
            <div className="text-[10px] text-[#22c55e] uppercase tracking-wider font-bold">Primary Source Arc</div>
            <div className="text-sm font-bold text-white uppercase mt-0.5">
              SECRET WARS (2015) #1 - #9
            </div>
          </div>
        </div>
      </div>

      {/* Comic Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {COMIC_ARCHIVES.map((comic) => {
          const isSelected = selectedComic.id === comic.id;
          const isBookmarked = savedComics.includes(comic.id);

          return (
            <div
              key={comic.id}
              id={`comic-card-${comic.id}`}
              onClick={() => {
                soundEngine.playPageTurn();
                setSelectedComic(comic);
              }}
              className={`p-4 rounded border-2 cursor-pointer transition-all duration-200 relative shadow-[3px_3px_0px_#000] ${
                isSelected
                  ? 'border-[#22c55e] bg-[#1a2e1a]/40 doom-glow shadow-[4px_4px_0px_#22c55e]'
                  : 'border-[#1a2e1a] bg-[#080d08] hover:border-[#22c55e] hover:bg-[#020402]'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#020402] border border-[#1a2e1a] text-[#22c55e] uppercase font-bold">
                  {comic.year}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(comic.id);
                  }}
                  className={`p-1 rounded transition-colors ${
                    isBookmarked ? 'text-[#22c55e]' : 'text-[#1a2e1a] hover:text-[#22c55e]'
                  }`}
                  title={isBookmarked ? 'Bookmarked' : 'Add to reading list'}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </div>

              <h3 className="font-comic text-xl text-white mt-2 line-clamp-1 uppercase comic-title-stroke tracking-wide">
                {comic.title}
              </h3>
              <div className="text-xs text-[#22c55e] mt-0.5 font-bold">
                {comic.issuesRange}
              </div>
              <div className="text-[11px] text-[#e0e7e0]/70 mt-1 flex items-center gap-1 font-medium">
                <Feather className="w-3 h-3 text-[#22c55e]" />
                <span>{comic.writer}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Comic Deep Dive Viewer with Panel Slide Animation */}
      <div 
        key={selectedComic.id}
        className="animate-comic-panel-slide rounded border-2 border-[#22c55e] bg-[#080d08] p-5 sm:p-7 doom-glow space-y-5 shadow-[5px_5px_0px_#1a2e1a] bg-comic-dots"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#1a2e1a] pb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs px-2.5 py-0.5 rounded bg-[#1a2e1a] border-2 border-[#22c55e] text-[#22c55e] font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                {selectedComic.arc}
              </span>
              <span className="text-xs text-[#e0e7e0]/70 uppercase font-bold">
                Published: {selectedComic.year} • Issues: {selectedComic.issuesRange}
              </span>
            </div>
            <h2 className="font-comic text-3xl sm:text-4xl text-white uppercase comic-title-stroke tracking-wide">
              {selectedComic.title}
            </h2>
            <div className="text-xs text-[#e0e7e0]/70 mt-1 flex items-center gap-2">
              <span>Writer: <strong className="text-[#22c55e]">{selectedComic.writer}</strong></span>
              <span>•</span>
              <span>Artist: <strong className="text-white">{selectedComic.artist}</strong></span>
            </div>
          </div>
        </div>

        {/* Why Read for Doomsday */}
        <div className="p-4 rounded bg-[#1a2e1a]/40 border border-[#22c55e]/30 space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#22c55e] flex items-center gap-1.5">
            Why This Run Is Mandatory Reading For Avengers: Doomsday
          </h4>
          <p className="text-xs sm:text-sm text-[#e0e7e0] leading-relaxed">
            {selectedComic.whyReadForDoomsday}
          </p>
        </div>

        {/* Story Summary */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#22c55e]" />
            Narrative Overview & Multiverse Stakes
          </h4>
          <p className="text-xs sm:text-sm text-[#e0e7e0]/80 leading-relaxed bg-[#020402] p-3.5 rounded border border-[#1a2e1a]">
            {selectedComic.summary}
          </p>
        </div>

        {/* Key Concepts Introduced */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#22c55e] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Key Multiverse Concepts Introduced in This Run
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedComic.keyConceptsIntroduced.map((concept, idx) => (
              <div key={idx} className="p-2.5 rounded bg-[#020402] border border-[#1a2e1a] flex items-start gap-2 text-xs text-[#e0e7e0]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0 mt-0.5" />
                <span>{concept}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Essential Moment Highlight */}
        <div className="p-3.5 rounded bg-[#2e1a1a]/30 border border-red-900/40 text-xs text-[#e0e7e0] space-y-1">
          <div className="text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
            <Flame className="w-3.5 h-3.5" />
            Apex Iconic Comic Panel / Climax
          </div>
          <p className="text-[#e0e7e0]/90">
            {selectedComic.essentialMoment}
          </p>
        </div>
      </div>
    </div>
  );
};
