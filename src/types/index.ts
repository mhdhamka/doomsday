export type TimelineCategory = 
  | 'Sacred Timeline' 
  | 'Multiversal Incursions' 
  | 'Legacy Realities';

export type ImportanceLevel = 
  | 'CRITICAL_MUST_WATCH' 
  | 'HIGH_INCURSION_LORE' 
  | 'FOUNDATIONAL_LEGACY';

export interface WatchlistItem {
  id: string;
  title: string;
  type: 'movie' | 'series';
  releaseYear: number;
  category: TimelineCategory;
  importance: ImportanceLevel;
  runtimeMinutes: number;
  seasons?: number;
  episodes?: number;
  streamingService: string;
  order: number;
  tagline: string;
  whyItMatters: string;
  doomConnection: string;
  keyIncursionClues: string[];
  bannerGradient: string;
  badgeColor: string;
  keyCharacters: string[];
  imdbRating?: string;
}

export type FactionId = 
  | 'DOOM_LATVERIA' 
  | 'FANTASTIC_FOUR' 
  | 'TVA_CHRONOS' 
  | 'AVENGERS_616' 
  | 'X_MEN_LEGACY' 
  | 'COUNCIL_OF_REEDS';

export type ThreatLevel = 
  | 'OMEGA_UNIVERSAL' 
  | 'COSMIC_NEXUS' 
  | 'ALPHA_THREAT' 
  | 'VANGUARD_DEFENDER';

export interface DossierCharacter {
  id: string;
  name: string;
  alias: string;
  actor: string;
  faction: FactionId;
  factionName: string;
  threatLevel: ThreatLevel;
  threatScore: number; // 1 - 100
  powerRating: {
    intelligence: number;
    mysticism: number;
    combat: number;
    multiverseInfluence: number;
  };
  comicOrigins: string;
  quote: string;
  bio: string;
  doomsdayRole: string;
  keyAbilities: string[];
  firstAppearance: string;
  avatarIcon: string;
  colorTheme: string;
}

export interface ComicIssue {
  id: string;
  title: string;
  arc: 'Secret Wars (2015)' | 'Time Runs Out' | 'Fantastic Four Rivalry' | 'Books of Doom';
  writer: string;
  artist: string;
  year: number;
  issuesRange: string;
  summary: string;
  whyReadForDoomsday: string;
  keyConceptsIntroduced: string[];
  essentialMoment: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  model?: string;
  isOfflineFallback?: boolean;
}

export interface UserProgressState {
  watchedIds: string[];
  userNotes: Record<string, string>;
  userRatings: Record<string, number>;
  stabilityIndex: number;
  soundEnabled: boolean;
  activeFilter: 'ALL' | TimelineCategory;
}

export type ComicSFXType = 
  | 'KRAKOOM!' 
  | 'THWIP!' 
  | 'DOOOOM!' 
  | 'BZZZT!' 
  | 'SHNK!' 
  | 'KABOOM!' 
  | 'ZAAAAP!' 
  | 'SWOOOSH!' 
  | 'VICTORY!' 
  | 'STABILIZED!' 
  | 'INCURSION!';

export interface ComicSFXItem {
  id: string;
  text: string;
  x?: number; // clientX or percentage
  y?: number; // clientY or percentage
  color?: 'green' | 'yellow' | 'red' | 'cyan' | 'purple' | 'orange';
  rotation?: number;
  scale?: number;
}
