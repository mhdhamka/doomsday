import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TimelineCategory, WatchlistItem, ComicSFXItem, ComicSFXType } from '../types';
import { ROADMAP_ITEMS } from '../data/roadmapData';
import { soundEngine } from '../utils/audio';

interface TriggerSFXOptions {
  text?: ComicSFXType | string;
  x?: number;
  y?: number;
  color?: 'green' | 'yellow' | 'red' | 'cyan' | 'purple' | 'orange';
  rotation?: number;
  scale?: number;
  sound?: boolean;
}

interface AppContextType {
  watchedIds: string[];
  toggleWatched: (id: string, e?: React.MouseEvent) => void;
  markAllWatched: (e?: React.MouseEvent) => void;
  resetProgress: (e?: React.MouseEvent) => void;
  isWatched: (id: string) => boolean;
  totalItems: number;
  completedItemsCount: number;
  completionPercentage: number;
  totalWatchtimeMinutes: number;
  completedWatchtimeMinutes: number;

  userNotes: Record<string, string>;
  setNote: (id: string, note: string) => void;

  userRatings: Record<string, number>;
  setRating: (id: string, rating: number, e?: React.MouseEvent) => void;

  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  toggleSound: () => void;

  activeTab: 'hud' | 'roadmap' | 'dossier' | 'comics' | 'tva-chat' | 'simulator';
  setActiveTab: (tab: 'hud' | 'roadmap' | 'dossier' | 'comics' | 'tva-chat' | 'simulator', e?: React.MouseEvent) => void;

  activeCategoryFilter: 'ALL' | TimelineCategory;
  setActiveCategoryFilter: (filter: 'ALL' | TimelineCategory) => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  stabilityIndex: number;
  setStabilityIndex: React.Dispatch<React.SetStateAction<number>>;

  selectedItemModal: WatchlistItem | null;
  setSelectedItemModal: (item: WatchlistItem | null) => void;

  sfxQueue: ComicSFXItem[];
  triggerSFX: (options?: TriggerSFXOptions | string, e?: React.MouseEvent) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_WATCHED = 'doomsday_prep_watched_v2';
const STORAGE_KEY_NOTES = 'doomsday_prep_notes_v2';
const STORAGE_KEY_RATINGS = 'doomsday_prep_ratings_v2';
const STORAGE_KEY_SOUND = 'doomsday_prep_sound_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchedIds, setWatchedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WATCHED);
      return saved ? JSON.parse(saved) : ['loki-series', 'spiderman-nwh'];
    } catch {
      return ['loki-series', 'spiderman-nwh'];
    }
  });

  const [userNotes, setUserNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [userRatings, setUserRatings] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RATINGS);
      return saved ? JSON.parse(saved) : { 'loki-series': 5, 'spiderman-nwh': 5 };
    } catch {
      return {};
    }
  });

  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SOUND);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [activeTab, setActiveTabState] = useState<'hud' | 'roadmap' | 'dossier' | 'comics' | 'tva-chat' | 'simulator'>('hud');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'ALL' | TimelineCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stabilityIndex, setStabilityIndex] = useState<number>(37.4);
  const [selectedItemModal, setSelectedItemModal] = useState<WatchlistItem | null>(null);
  const [sfxQueue, setSfxQueue] = useState<ComicSFXItem[]>([]);

  // Trigger Comic SFX Helper
  const triggerSFX = useCallback((options?: TriggerSFXOptions | string, e?: React.MouseEvent) => {
    const defaultTexts: ComicSFXType[] = ['KRAKOOM!', 'THWIP!', 'DOOOOM!', 'ZAAAAP!', 'KABOOM!', 'SHNK!'];
    
    let text = typeof options === 'string' ? options : options?.text;
    if (!text) {
      text = defaultTexts[Math.floor(Math.random() * defaultTexts.length)];
    }

    let x = typeof options === 'object' ? options.x : undefined;
    let y = typeof options === 'object' ? options.y : undefined;

    if (e && (x === undefined || y === undefined)) {
      x = e.clientX;
      y = e.clientY;
    } else if (x === undefined || y === undefined) {
      // Default around screen center with random offset
      x = window.innerWidth / 2 + (Math.random() * 240 - 120);
      y = window.innerHeight / 2 + (Math.random() * 160 - 80);
    }

    const colors: Array<'green' | 'yellow' | 'red' | 'cyan' | 'purple' | 'orange'> = ['green', 'yellow', 'red', 'cyan', 'purple', 'orange'];
    const color = typeof options === 'object' && options.color 
      ? options.color 
      : colors[Math.floor(Math.random() * colors.length)];

    const rotation = typeof options === 'object' && options.rotation !== undefined 
      ? options.rotation 
      : Math.floor(Math.random() * 24) - 12;

    const scale = typeof options === 'object' && options.scale !== undefined 
      ? options.scale 
      : 0.95 + Math.random() * 0.25;

    const newSfx: ComicSFXItem = {
      id: `sfx-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      text,
      x,
      y,
      color,
      rotation,
      scale,
    };

    // Play corresponding sound if enabled
    if (typeof options !== 'object' || options.sound !== false) {
      if (text.includes('KRAKOOM') || text.includes('DOOM') || text.includes('KABOOM')) {
        soundEngine.playKrakoom();
      } else if (text.includes('THWIP') || text.includes('SWOOSH')) {
        soundEngine.playThwip();
      } else if (text.includes('ZAP') || text.includes('BZZT')) {
        soundEngine.playZap();
      } else if (text.includes('VICTORY') || text.includes('STABILIZED')) {
        soundEngine.playSuccessChime();
      }
    }

    setSfxQueue((prev) => [...prev, newSfx]);

    // Automatically remove after animation completes (1.1s)
    setTimeout(() => {
      setSfxQueue((prev) => prev.filter((item) => item.id !== newSfx.id));
    }, 1150);
  }, []);

  // Sync sound engine state
  useEffect(() => {
    soundEngine.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const setSoundEnabled = (val: boolean) => {
    setSoundEnabledState(val);
    try {
      localStorage.setItem(STORAGE_KEY_SOUND, JSON.stringify(val));
    } catch {}
    if (val) soundEngine.playTvaBeep();
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const setActiveTab = (tab: 'hud' | 'roadmap' | 'dossier' | 'comics' | 'tva-chat' | 'simulator', e?: React.MouseEvent) => {
    if (tab !== activeTab) {
      soundEngine.playPageTurn();
    } else {
      soundEngine.playClick();
    }
    setActiveTabState(tab);
  };

  // Persist watched IDs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WATCHED, JSON.stringify(watchedIds));
    } catch {}
  }, [watchedIds]);

  // Persist notes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(userNotes));
    } catch {}
  }, [userNotes]);

  // Persist ratings
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RATINGS, JSON.stringify(userRatings));
    } catch {}
  }, [userRatings]);

  const toggleWatched = (id: string, e?: React.MouseEvent) => {
    setWatchedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        soundEngine.playClick();
        triggerSFX({ text: 'REWIND!', color: 'cyan', sound: false }, e);
        return prev.filter((item) => item !== id);
      } else {
        const next = [...prev, id];
        if (next.length === ROADMAP_ITEMS.length) {
          triggerSFX({ text: 'DOOMSDAY READY!', color: 'green', scale: 1.35 }, e);
        } else {
          const sfxOptions: ComicSFXType[] = ['THWIP!', 'KRAKOOM!', 'ZAAAAP!', 'SHNK!'];
          const chosen = sfxOptions[Math.floor(Math.random() * sfxOptions.length)];
          triggerSFX({ text: chosen, color: 'green' }, e);
        }
        return next;
      }
    });
  };

  const markAllWatched = (e?: React.MouseEvent) => {
    soundEngine.playDoomSurge();
    triggerSFX({ text: 'ALL REALITIES READY!', color: 'green', scale: 1.4 }, e);
    const allIds = ROADMAP_ITEMS.map((item) => item.id);
    setWatchedIds(allIds);
  };

  const resetProgress = (e?: React.MouseEvent) => {
    soundEngine.playIncursionAlarm();
    triggerSFX({ text: 'INCURSION RESET!', color: 'red', scale: 1.2 }, e);
    setWatchedIds([]);
  };

  const isWatched = (id: string) => watchedIds.includes(id);

  const setNote = (id: string, note: string) => {
    setUserNotes((prev) => ({ ...prev, [id]: note }));
  };

  const setRating = (id: string, rating: number, e?: React.MouseEvent) => {
    soundEngine.playClick();
    if (rating === 5) {
      triggerSFX({ text: '5-STAR MASTERPIECE!', color: 'yellow', scale: 1.15 }, e);
    }
    setUserRatings((prev) => ({ ...prev, [id]: rating }));
  };

  const totalItems = ROADMAP_ITEMS.length;
  const completedItemsCount = watchedIds.length;
  const completionPercentage = Math.round((completedItemsCount / Math.max(1, totalItems)) * 100);

  const totalWatchtimeMinutes = ROADMAP_ITEMS.reduce((acc, curr) => acc + curr.runtimeMinutes, 0);
  const completedWatchtimeMinutes = ROADMAP_ITEMS
    .filter((item) => watchedIds.includes(item.id))
    .reduce((acc, curr) => acc + curr.runtimeMinutes, 0);

  return (
    <AppContext.Provider
      value={{
        watchedIds,
        toggleWatched,
        markAllWatched,
        resetProgress,
        isWatched,
        totalItems,
        completedItemsCount,
        completionPercentage,
        totalWatchtimeMinutes,
        completedWatchtimeMinutes,
        userNotes,
        setNote,
        userRatings,
        setRating,
        soundEnabled,
        setSoundEnabled,
        toggleSound,
        activeTab,
        setActiveTab,
        activeCategoryFilter,
        setActiveCategoryFilter,
        searchQuery,
        setSearchQuery,
        stabilityIndex,
        setStabilityIndex,
        selectedItemModal,
        setSelectedItemModal,
        sfxQueue,
        triggerSFX,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
