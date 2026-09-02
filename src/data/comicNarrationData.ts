export interface ComicNarrationEntry {
  id: string;
  narrator: 'TVA_ARCHIVIST' | 'VICTOR_VON_DOOM' | 'THE_WATCHER' | 'MARVEL_SCRIBE' | 'LOKI_GOD_OF_STORIES';
  narratorName: string;
  narratorTitle: string;
  location: string;
  leadWord: string;
  quote: string;
  loreNote: string;
  badgeColor: 'green' | 'yellow' | 'red' | 'cyan' | 'purple';
  issueNumber: string;
}

export const TAB_NARRATIONS: Record<string, ComicNarrationEntry[]> = {
  hud: [
    {
      id: 'hud-marvel-scribe',
      narrator: 'MARVEL_SCRIBE',
      narratorName: 'STAN & HICKMAN CHRONICLER',
      narratorTitle: 'Omniscient Scribe',
      location: 'OUTER COSMIC RIM // THE VOID',
      leadWord: 'MEANWHILE, AT THE PRECIPICE OF EXTINCTION...',
      quote: 'TWO UNIVERSES HURTLE TOWARD COLLISION! AS THE INEVITABLE COUNTDOWN TO DECEMBER 18, 2026 DRAWS NIGH, EVERY SECOND TICKS CLOSER TO THE FINAL INCURSION OF ALL REALITY!',
      loreNote: 'The Chrono-Watch measures the cosmic decay constant across Earth-616 and Earth-1610 before the boundaries collapse.',
      badgeColor: 'green',
      issueNumber: 'AVENGERS (VOL. 5) #1'
    },
    {
      id: 'hud-doom',
      narrator: 'VICTOR_VON_DOOM',
      narratorName: 'VICTOR VON DOOM',
      narratorTitle: 'Monarch of Latveria',
      location: 'CASTLE DOOM // DOOMSTADT',
      leadWord: 'EVERYTHING DIES. ONLY DOOM PERSISTS.',
      quote: 'Richards built his life rafts for cowards and weaklings. Doom shall slay the Beyonders themselves and reforge the dying cosmos in mine own image!',
      loreNote: 'Doom’s sub-quantum reality dampeners are currently holding Earth-616’s baseline stability at critical thresholds.',
      badgeColor: 'green',
      issueNumber: 'SECRET WARS (2015) #1'
    },
    {
      id: 'hud-watcher',
      narrator: 'THE_WATCHER',
      narratorName: 'UATU THE WATCHER',
      narratorTitle: 'Cosmic Observer',
      location: 'BLUE AREA OF THE MOON',
      leadWord: 'I OBSERVE, YET CANNOT INTERVENE...',
      quote: 'Across infinite quantum branches, I have witnessed countless civilizations burn in the flash of colliding Earths. But here, one solitary world prepares for the reckoning.',
      loreNote: 'The Watcher’s oath forbids direct interference, yet his gaze remains fixed upon the Latverian chronometer.',
      badgeColor: 'cyan',
      issueNumber: 'WHAT IF...? (VOL. 1) #32'
    },
    {
      id: 'hud-tva',
      narrator: 'TVA_ARCHIVIST',
      narratorName: 'TVA CHRONO-MONITOR',
      narratorTitle: 'Epsilon Clearance',
      location: 'NULL-TIME ZONE // TVA CORE',
      leadWord: 'TEMPORAL VARIANCE THRESHOLD: CRITICAL.',
      quote: 'Incursion Event Class-Omega confirmed. All branch realities converging on coordinate 2026.12.18. Prepare temporal tether protocols.',
      loreNote: 'Standard TVA reset charges cannot extinguish an incursion once the boundary walls have ruptured.',
      badgeColor: 'yellow',
      issueNumber: 'LOKI SEASON 2 // CASE 993'
    }
  ],
  roadmap: [
    {
      id: 'roadmap-tva',
      narrator: 'TVA_ARCHIVIST',
      narratorName: 'MISS MINUTES & THE TVA',
      narratorTitle: 'Temporal Archive',
      leadWord: 'THE SACRED TIMELINE DEMANDS STUDY...',
      quote: 'HOWDY PARDNERS! TO SURVIVE THE COLLAPSING OF THE MULTIVERSE, A TRUE AGENT MUST DECODE THE 15 ESSENTIAL CRITICAL NODES—FROM THE FIRST INVASION OF NEW YORK TO THE SINKING OF DEADPOOL & WOLVERINE’S ANCHOR BEINGS!',
      loreNote: 'Mark each classified timeline milestone as watched to sync your temporal resilience against multiversal decay.',
      badgeColor: 'yellow',
      location: 'TVA REPOSITORY 00-B',
      issueNumber: 'TVA MANUAL V.8'
    },
    {
      id: 'roadmap-scribe',
      narrator: 'MARVEL_SCRIBE',
      narratorName: 'MARVEL EDITORIAL SCRIBE',
      narratorTitle: 'Master of Canon',
      leadWord: 'BEHOLD THE 15 CHAPTERS OF DESTINY!',
      quote: 'FROM LOKI’S GLORIOUS PURPOSE TO THE COUNCIL OF KANGS, EVERY CINEMATIC CHAPTER CONTAINS A VITAL THREAD OF INHERITED COSMIC DANGER LEADING INTO THE REIGN OF DOOM!',
      loreNote: 'Chronological and narrative order ensures complete comprehension of Incursions, Anchor Beings, and Kang Dynasty remnants.',
      badgeColor: 'green',
      location: 'EARTH-616 NARRATIVE CONTINUITY',
      issueNumber: 'MARVEL UNIVERSE HANDBOOK'
    },
    {
      id: 'roadmap-doom',
      narrator: 'VICTOR_VON_DOOM',
      narratorName: 'VICTOR VON DOOM',
      narratorTitle: 'Master of Sorcery & Science',
      leadWord: 'STUDY THE FAILURES OF YOUR "HEROES"!',
      quote: 'The Avengers squander their power in petty bickering. Iron Man, Strange, the Illuminati—their hubris triggered the very incursions they sought to avert. Witness their errors so you do not repeat them!',
      loreNote: 'Doom has compiled detailed tactical debriefs for all 15 key MCU timeline nodes.',
      badgeColor: 'red',
      location: 'LATVERIAN CENTRAL ARCHIVES',
      issueNumber: 'NEW AVENGERS (VOL. 3) #3'
    }
  ],
  dossier: [
    {
      id: 'dossier-doom',
      narrator: 'VICTOR_VON_DOOM',
      narratorName: 'GOD EMPEROR DOOM',
      narratorTitle: 'Sovereign of Battleworld',
      leadWord: 'KNOW THY ALLIES. CRUSH THY RIVALS.',
      quote: 'THE ILLUMINATI BELIEVE IN ARROGANCE. THE THUNDERBOLTS DEAL IN SHADOWS. THE FANTASTIC FOUR RELY ON RICHARDS’ FLAWED INTELLECT. ONLY ONE WILL REIGN SUPREME WHEN WORLDS PERISH!',
      loreNote: 'Classified tactical intelligence on all five major power blocs competing for dominance in the post-incursion landscape.',
      badgeColor: 'green',
      location: 'THRONE ROOM // DOOMSTADT',
      issueNumber: 'SECRET WARS #4'
    },
    {
      id: 'dossier-watcher',
      narrator: 'THE_WATCHER',
      narratorName: 'UATU THE WATCHER',
      narratorTitle: 'Eternal Witness',
      leadWord: 'FACTIONS ASSEMBLE ON THE BRINK OF ARMAGEDDON...',
      quote: 'From the shadows of Latveria to the clandestine laboratories of the Illuminati, the warriors of the multiverse forge desperate alliances—unaware that doom approaches from all horizons.',
      loreNote: 'Power scaling, alignment matrices, and existential threat classifications verified by Cosmic Sight.',
      badgeColor: 'cyan',
      location: 'THE MOON // OBSERVER CITADEL',
      issueNumber: 'SECRET WARS: FACTIONS #1'
    },
    {
      id: 'dossier-tva',
      narrator: 'TVA_ARCHIVIST',
      narratorName: 'HUNTER B-15',
      narratorTitle: 'TVA Minuteman Command',
      leadWord: 'TARGET THREAT PROFILES: VERIFIED.',
      quote: 'Minutemen on high alert! We are tracking major variant convergences: Doctor Doom, Kang the Conqueror, and Franklin Richards. Engage temporal containment if sighted.',
      loreNote: 'Clearance Epsilon required to access raw threat tier vectors and multiversal casualty projections.',
      badgeColor: 'yellow',
      location: 'TVA WAR ROOM',
      issueNumber: 'TVA CLASSIFIED FILE #449'
    }
  ],
  comics: [
    {
      id: 'comics-scribe',
      narrator: 'MARVEL_SCRIBE',
      narratorName: 'HISTORIAN OF THE HOUSE OF IDEAS',
      narratorTitle: 'Comics Archivist',
      leadWord: 'BORN IN THE PAGES OF INK AND THUNDER!',
      quote: 'WITNESS THE MASTER BLUEPRINTS! FROM JONATHAN HICKMAN’S MAGNUM OPUS TO JIM SHOOTER’S ORIGINAL 1984 CLASH ON THE BEYONDER’S WORLD, THESE ARE THE SACRED COMIC RUNS THAT SHAPED DOOMSDAY!',
      loreNote: 'Explore the key runs, iconic issues, and pivotal comic storylines adapted into the Marvel Cinematic Universe.',
      badgeColor: 'green',
      location: 'THE HOUSE OF IDEAS // 1984–2015',
      issueNumber: 'SECRET WARS (1984) #1'
    },
    {
      id: 'comics-doom',
      narrator: 'VICTOR_VON_DOOM',
      narratorName: 'VICTOR VON DOOM',
      narratorTitle: 'God Emperor of Battleworld',
      leadWord: 'THE GREATEST TRIUMPH IN ALL OF CREATION...',
      quote: 'They wrote chronicles of my ascension to divinity. When the Multiverse crumbled into ashes, it was Doom who pulled the fragments together with his bare hands and crafted Battleworld!',
      loreNote: 'Hickman’s 2015 Secret Wars run chronicles Doom stealing the power of the Beyonders using Molecule Man.',
      badgeColor: 'purple',
      location: 'THE WORLD TREE // LATVERIA PRIME',
      issueNumber: 'SECRET WARS (2015) #9'
    }
  ],
  'tva-chat': [
    {
      id: 'chat-tva',
      narrator: 'TVA_ARCHIVIST',
      narratorName: 'THE TVA AI CHRONOLOGIST',
      narratorTitle: 'Quantum Mainframe // Gemini 3.7',
      leadWord: 'THE TVA OBSERVES ALL TIMELINES...',
      quote: 'INPUT YOUR TEMPORAL INQUIRY, VARIANT! WHETHER YOU SEEK INTEL ON THE BEYONDERS, BATTLEWORLD JURISDICTION, OR DOOM’S MASTERY OF TIME PLATFORMS, OUR QUANTUM CORES STAND READY.',
      loreNote: 'Powered by real-time neural grounding across Marvel Cinematic Universe & Secret Wars comic lore.',
      badgeColor: 'yellow',
      location: 'CITADEL AT THE END OF TIME',
      issueNumber: 'TEMPORAL LOG #8812'
    },
    {
      id: 'chat-loki',
      narrator: 'LOKI_GOD_OF_STORIES',
      narratorName: 'LOKI OF ASGARD',
      narratorTitle: 'God of Stories',
      leadWord: 'I HOLD THE BRANCHES SO YOU MAY LIVE...',
      quote: 'For you, for all of us. I sit upon this lonely throne weaving infinite branches into a green tapestry of life. Ask your questions of the timeline, traveller, and I shall whisper the truth.',
      loreNote: 'Loki replaced the Loom with his own physical body, keeping all branching timelines alive in Yggdrasil form.',
      badgeColor: 'green',
      location: 'THE ROOT OF YGGDRASIL',
      issueNumber: 'LOKI SEASON 2 FINALE'
    },
    {
      id: 'chat-doom',
      narrator: 'VICTOR_VON_DOOM',
      narratorName: 'LORD OF LATVERIA',
      narratorTitle: 'Supreme Intellect',
      leadWord: 'DO NOT WASTE DOOM’S TIME WITH TRIVIAL QUESTIONS!',
      quote: 'Ask what you will regarding the physics of incursions or the coming Battleworld order. Doom’s intellect transcends the fragile comprehension of mortal minds.',
      loreNote: 'Direct cryptographic uplink to Castle Doom’s sub-temporal mainframe.',
      badgeColor: 'red',
      location: 'DOOMSTADT AI CORES',
      issueNumber: 'FANTASTIC FOUR #200'
    }
  ],
  simulator: [
    {
      id: 'sim-scribe',
      narrator: 'MARVEL_SCRIBE',
      narratorName: 'COSMIC CRISIS RECORDER',
      narratorTitle: 'Multiverse Arbiter',
      leadWord: 'UNIVERSES ON A COLLISION COURSE!',
      quote: 'WHEN TWO EARTHS OCCUPY THE SAME SPACE AT THE SAME TIME, ONLY ONE CAN SURVIVE—OR BOTH WILL CEASE TO BE! TAKE COMMAND OF THE SIMULATOR AND DETERMINE THE FATE OF THE MULTIVERSE!',
      loreNote: 'Real-time physics model measuring incursion contraction rates, anti-matter payload yields, and Battleworld synthesis.',
      badgeColor: 'red',
      location: 'POINT OF INCURSION // ZERO VECTOR',
      issueNumber: 'NEW AVENGERS (VOL. 3) #1'
    },
    {
      id: 'sim-doom',
      narrator: 'VICTOR_VON_DOOM',
      narratorName: 'VICTOR VON DOOM',
      narratorTitle: 'Architect of Battleworld',
      leadWord: 'THERE IS NO SOLUTION SAVE FOR DOOM!',
      quote: 'The Illuminati attempted to blow up worlds; they failed in spirit. Only by seizing the Beyonders’ power and assembling the shattered fragments can creation endure!',
      loreNote: 'Engage Doom’s Reality Loom to instantly reverse multiversal collapse and stabilize reality indices.',
      badgeColor: 'green',
      location: 'REALITY LOOM // DOMAIN ZERO',
      issueNumber: 'SECRET WARS #3'
    },
    {
      id: 'sim-watcher',
      narrator: 'THE_WATCHER',
      narratorName: 'UATU THE WATCHER',
      narratorTitle: 'The Eye of Creation',
      leadWord: 'EVERY CHOICE BRANCHES INTO A NEW REALITY...',
      quote: 'Will you deploy the Anti-Matter bomb to save your own universe at the cost of billions of innocent souls? Or will you board the Life Raft into the unknown void?',
      loreNote: 'Moral and temporal consequences dynamically calculated with each intervention.',
      badgeColor: 'cyan',
      location: 'THE WATCHER’S CITADEL',
      issueNumber: 'WHAT IF...? INCURSIONS #1'
    }
  ]
};

export interface LatverianDailyHeadline {
  id: string;
  headline: string;
  subdeck: string;
  edictNumber: string;
  date: string;
  category: 'IMPERIAL_EDICT' | 'BATTLEWORLD_DISPATCH' | 'MULTIVERSE_SECURITY' | 'SCIENTIFIC_TRIUMPH' | 'RICHARDS_SURVEILLANCE';
}

export const LATVERIAN_DAILY_HEADLINES: LatverianDailyHeadline[] = [
  {
    id: 'ld-1',
    headline: 'LORD DOOM PROCLAIMS: MULTIVERSE COLLAPSE UNDER ABSOLUTE CONTROL',
    subdeck: 'Imperial Reality Dampeners deployed at Castle Doomstadt. Citizens instructed to report illicit timeline divergence.',
    edictNumber: 'EDICT-MMXXVI-01',
    date: 'DOOMSDAY EDITION // VOL. LXIV',
    category: 'IMPERIAL_EDICT'
  },
  {
    id: 'ld-2',
    headline: 'BAXTER BUILDING MONITORED: REED RICHARDS\' LIFE RAFT BRANDED INSUFFICIENT',
    subdeck: 'Latverian Academy of Sciences proves Richards’ mathematics flawed by factor of 10^18. Doom’s Loom remains only salvation.',
    edictNumber: 'INTELLIGENCE REPORT #994',
    date: 'LATVERIA GAZETTE // EVENING WIRE',
    category: 'RICHARDS_SURVEILLANCE'
  },
  {
    id: 'ld-3',
    headline: 'BEYONDERS ENCOUNTERED: MOLECULE MAN ALIGNED WITH IMPERIAL WILL',
    subdeck: 'Owen Reece secures quantum singularity in sub-dimensional vault under throne room. Zero multiversal leakage detected.',
    edictNumber: 'COSMIC DISPATCH #772',
    date: 'IMPERIAL SCIENCE BULLETIN',
    category: 'BATTLEWORLD_DISPATCH'
  },
  {
    id: 'ld-4',
    headline: 'DOOMBOT GARRISONS FORTIFY LATVERIAN BORDERS AGAINST EARTH-1610 SPILLOVER',
    subdeck: 'Titanium-plated legions deploy Vibranium-reinforced atmospheric shields. Incursion tremors reduced by 99.8%.',
    edictNumber: 'DEFENSE DIRECTIVE #404',
    date: 'MINISTRY OF ORDER & SHIELDS',
    category: 'MULTIVERSE_SECURITY'
  },
  {
    id: 'ld-5',
    headline: 'TVA AGENTS DETAINED AT LATVERIAN BORDER; TIME PLATFORMS CONFISCATED',
    subdeck: 'Temporal agents attempting timeline pruning neutralized by mystic counter-wards. Chrono-cores integrated into Doomstadt Grid.',
    edictNumber: 'SECURITY BULLETIN #819',
    date: 'NULL-TIME INTERCEPT // CLASSIFIED',
    category: 'MULTIVERSE_SECURITY'
  },
  {
    id: 'ld-6',
    headline: 'ANNUAL FESTIVAL OF LATVERIAN TRIUMPH: CRIME AT 0.00%, PROSPERITY AT PEAK',
    subdeck: 'Grateful citizenry offers unconditional praise to Monarch. All food synthesizers calibrated to 100% surplus capacity.',
    edictNumber: 'IMPERIAL GAZETTE #101',
    date: 'DOOMSTADT SPECIAL DISPATCH',
    category: 'IMPERIAL_EDICT'
  },
  {
    id: 'ld-7',
    headline: 'ILLUMINATI SANCTUM DISRUPTED: EYE OF AGAMOTTO RESONANCE RECORDED',
    subdeck: 'Sorcerer Supreme and Black Panther antimatter weapon trials detected. Doom deems their moral posturing futile.',
    edictNumber: 'CHRONO-ANALYSIS #552',
    date: 'WAR DESK // SPECIAL CORRESPONDENCE',
    category: 'BATTLEWORLD_DISPATCH'
  }
];

export interface DoomManifestoSnippet {
  id: string;
  clause: string;
  title: string;
  excerpt: string;
  philosophy: string;
  seal: string;
}

export const DOOM_MANIFESTO_SNIPPETS: DoomManifestoSnippet[] = [
  {
    id: 'man-1',
    clause: 'CLAUSE I : ON THE FATE OF THE COSMOS',
    title: 'THE IMPERATIVE OF TOTAL ORDER',
    excerpt: 'I have walked the dying corridors of reality. I have seen the thousands of futures where men babbled of democracy and compromise, and in every one, the stars were extinguished. There is only one path where humanity survives: the path paved by Doom.',
    philosophy: 'Absolute Sovereign Pragmatism',
    seal: 'SEAL OF CASTLE DOOM'
  },
  {
    id: 'man-2',
    clause: 'CLAUSE II : ON THE WEAKNESS OF RIVALS',
    title: 'THE FOLLY OF RICHARDS',
    excerpt: 'Reed Richards possesses the intellect of a god and the conviction of a frightened infant. He calculates his escape while worlds burn. Doom does not build life rafts for the few; Doom conquers the apocalypse itself for all.',
    philosophy: 'Doctrine of Will & Supremacy',
    seal: 'LATVERIAN MONARCH CREST'
  },
  {
    id: 'man-3',
    clause: 'CLAUSE III : ON COSMIC TRANSCENDENCE',
    title: 'MASTERY OF SCIENCE AND SORCERY',
    excerpt: 'Science without the mystic arts is blind; sorcery without empirical physics is mad. By synthesizing the quantum mathematics of the Beyonders with the ancient sorceries of Cagliostro, Doom bends destiny itself.',
    philosophy: 'Synthesis of Arcane & Technology',
    seal: 'EYE OF CAGLIOSTRO CODEX'
  },
  {
    id: 'man-4',
    clause: 'CLAUSE IV : ON THE NATURE OF BATTLEWORLD',
    title: 'THE REFORGED CREATION',
    excerpt: 'Let the multiverse crack and split. From the smoldering ash, my iron will shall assemble a new world. It shall not be a democracy of chaos, but a unified kingdom where all answer to God Emperor Doom.',
    philosophy: 'Cosmic Architect Manifesto',
    seal: 'BATTLEWORLD DOMAIN ZERO'
  },
  {
    id: 'man-5',
    clause: 'CLAUSE V : ON TEMPORAL RESILIENCE',
    title: 'IMMUNITY TO TIME',
    excerpt: 'The TVA believes themselves masters of the sacred flow. Fools. Time is not a river to be steered by clocks and monitors; it is a canvas, and Victor von Doom is the master artist who shall paint its final era.',
    philosophy: 'Temporal Dominance Thesis',
    seal: 'CHRONO-CORE PLATFORM OMEGA'
  }
];
