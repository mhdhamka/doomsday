import { DossierCharacter, ComicIssue } from '../types';

export const DOSSIER_CHARACTERS: DossierCharacter[] = [
  {
    id: 'dr-doom',
    name: 'Victor von Doom',
    alias: 'Doctor Doom / God Emperor Doom',
    actor: 'Robert Downey Jr.',
    faction: 'DOOM_LATVERIA',
    factionName: 'Sovereign Realm of Latveria / Multiversal Hegemony',
    threatLevel: 'OMEGA_UNIVERSAL',
    threatScore: 99,
    powerRating: {
      intelligence: 100,
      mysticism: 96,
      combat: 92,
      multiverseInfluence: 99
    },
    comicOrigins: 'Fantastic Four #5 (1962) by Stan Lee & Jack Kirby. Reached supreme cosmic ascension in Jonathan Hickman’s Secret Wars (2015).',
    quote: '“I was a god, Valeria. I found it... beneath me.”',
    bio: 'Monarch of Latveria, supreme genius inventor, and master sorcerer. Victor von Doom stands as the most formidable and complex adversary in Marvel history. When the Multiverse faces terminal decay from catastrophic Incursions, Doom refuses to accept extinction. Where Reed Richards seeks understanding, Doom demands absolute conquest and sovereign reconstruction.',
    doomsdayRole: 'The central antagonist and catalyst of Avengers: Doomsday. Armed with unmatched intellect, dark mystic mastery, and stolen cosmic power, Doom orchestrates the collapse and synthesis of dying universes to establish his omnipotent reign.',
    keyAbilities: [
      'Supreme Scientific Polymath (Cybernetics, Quantum Physics, Time Displacement)',
      'High-Tier Black Magic & Sorcery (Trained by Morgan le Fay)',
      'Titanium-Infused Power Armor with Force Shields & Arc Siphon',
      'Doombot Legion & Diplomatic Sovereign Immunity',
      'Multiverse Synthesis & Reality Weaving'
    ],
    firstAppearance: 'Fantastic Four #5 (1962) / MCU: Avengers: Doomsday (2026)',
    avatarIcon: 'Crown',
    colorTheme: 'from-emerald-600 via-green-800 to-teal-950'
  },
  {
    id: 'reed-richards',
    name: 'Reed Richards',
    alias: 'Mister Fantastic',
    actor: 'Pedro Pascal',
    faction: 'FANTASTIC_FOUR',
    factionName: 'The Fantastic Four (Earth-828)',
    threatLevel: 'COSMIC_NEXUS',
    threatScore: 92,
    powerRating: {
      intelligence: 100,
      mysticism: 35,
      combat: 84,
      multiverseInfluence: 94
    },
    comicOrigins: 'Fantastic Four #1 (1961) by Stan Lee & Jack Kirby. Architectural leader of the Life Raft in Secret Wars (2015).',
    quote: '“Everything dies. You, me, everyone on this planet. Our sun, our galaxy, and eventually the universe itself. But we can build a lifeboat.”',
    bio: 'The smartest man in the universe. Leading Earth-828’s Fantastic Four, Reed’s boundless curiosity and mathematical vision uncover the impending Incursion wave. His eternal dynamic with Victor von Doom is a clash between science anchored in human empathy versus intellect driven by autocratic ego.',
    doomsdayRole: 'Navigates the collision between Earth-828 and Earth-616, constructing the multiversal Life Raft and confronting his darkest intellectual counterpart.',
    keyAbilities: [
      'Unmatched Hyper-Intellect & Dimensional Physics',
      'Hyper-Elastic Molecular Physiology',
      'Creator of the Bridge, Interdimensional Portals & Sub-Space Beacons',
      'Leader of the Fantastic Four'
    ],
    firstAppearance: 'Fantastic Four #1 (1961) / MCU: The Fantastic Four: First Steps (2025)',
    avatarIcon: 'Atom',
    colorTheme: 'from-sky-600 via-blue-800 to-indigo-950'
  },
  {
    id: 'god-loki',
    name: 'Loki Laufeyson',
    alias: 'God Loki / God of Stories',
    actor: 'Tom Hiddleston',
    faction: 'TVA_CHRONOS',
    factionName: 'Yggdrasil Multiverse Nexus / End of Time',
    threatLevel: 'COSMIC_NEXUS',
    threatScore: 95,
    powerRating: {
      intelligence: 90,
      mysticism: 98,
      combat: 82,
      multiverseInfluence: 100
    },
    comicOrigins: 'Journey into Mystery #85 (1962) / Al Ewing’s Loki: Agent of Asgard (2014).',
    quote: '“I know what kind of god I need to be. For you. For all of us.”',
    bio: 'Having broken the tyrannical loop of He Who Remains and destroyed the mechanical Temporal Loom, Loki gathered the dead strands of infinite timelines into his bare hands, infusing them with his green magic to form the living Yggdrasil Tree at the End of Time.',
    doomsdayRole: 'Loki is the literal biological and magical anchor holding the multiverse together. As Incursions multiply, Loki’s throne comes under direct existential assault from Doom.',
    keyAbilities: [
      'Temporal Time-Slipping & Chronological Manipulation',
      'Asgardian God Magic & Living Nexus Weaving',
      'Direct Control Over Infinite Branch Cohesion',
      'Sacrificial Multiverse Overwatch'
    ],
    firstAppearance: 'Thor (2011) / Loki Season 2 (2023)',
    avatarIcon: 'TreePine',
    colorTheme: 'from-emerald-500 via-amber-700 to-emerald-950'
  },
  {
    id: 'doctor-strange',
    name: 'Stephen Strange',
    alias: 'Doctor Strange (Earth-616)',
    actor: 'Benedict Cumberbatch',
    faction: 'AVENGERS_616',
    factionName: 'Masters of the Mystic Arts / Earth-616 Vanguard',
    threatLevel: 'ALPHA_THREAT',
    threatScore: 88,
    powerRating: {
      intelligence: 94,
      mysticism: 97,
      combat: 86,
      multiverseInfluence: 90
    },
    comicOrigins: 'Strange Tales #110 (1963). In comics Secret Wars, Strange served as Doom’s Right Hand (Sheriff Strange) before rebelling.',
    quote: '“We opened the door to the Multiverse... and now the bill has come due.”',
    bio: 'Earth’s premier sorcerer who first witnessed the catastrophic reality-crushing horror of Incursions firsthand in Earth-838. Travelling with Clea into the Dark Dimension, Strange is the first hero to actively investigate the dying boundaries of reality.',
    doomsdayRole: 'Acts as the mystic bridge between Earth-616, Clea’s Dark Dimension forces, and the TVA as the Incursion warning sirens reach critical threshold.',
    keyAbilities: [
      'Mastery of the Mystic Arts & Eldritch Magic',
      'Mirror Dimension Manipulation & Astral Projection',
      'Darkhold & Third Eye Cosmic Awareness',
      'Sling Ring Multiverse Gateway Portals'
    ],
    firstAppearance: 'Doctor Strange (2016)',
    avatarIcon: 'Eye',
    colorTheme: 'from-amber-600 via-orange-800 to-stone-950'
  },
  {
    id: 'deadpool-wolverine',
    name: 'Logan & Wade Wilson',
    alias: 'Wolverine & Deadpool',
    actor: 'Hugh Jackman & Ryan Reynolds',
    faction: 'X_MEN_LEGACY',
    factionName: 'Earth-10005 Mutant Remnants / TVA Special Ops',
    threatLevel: 'VANGUARD_DEFENDER',
    threatScore: 86,
    powerRating: {
      intelligence: 78,
      mysticism: 30,
      combat: 98,
      multiverseInfluence: 85
    },
    comicOrigins: 'X-Men (1974) & New Mutants (1991). Major combatants in Battleworld domains.',
    quote: '“Let’s f***ing go.”',
    bio: 'The anchors and survivors of the Fox Earth-10005 universe. Having defied the TVA’s rogue pruner Paradox and destroyed Cassandra Nova’s Time Ripper, this duo represents the raw fighting spirit of the legacy multiverse crossing over into Earth-616.',
    doomsdayRole: 'Frontline combat vanguard ready to slice through Doombots and fight across collapsing dimensional rift zones.',
    keyAbilities: [
      'Indestructible Adamantium Skeleton & Claws',
      'Rapid Regenerative Healing Factor',
      'Fourth-Wall Awareness & Combat Instinct',
      'TVA TemPad Interdimensional Traversal'
    ],
    firstAppearance: 'X-Men (2000) / Deadpool & Wolverine (2024)',
    avatarIcon: 'Swords',
    colorTheme: 'from-yellow-600 via-red-800 to-neutral-950'
  },
  {
    id: 'sam-wilson',
    name: 'Sam Wilson',
    alias: 'Captain America',
    actor: 'Anthony Mackie',
    faction: 'AVENGERS_616',
    factionName: 'New Avengers Core / Earth-616 Defense',
    threatLevel: 'VANGUARD_DEFENDER',
    threatScore: 82,
    powerRating: {
      intelligence: 85,
      mysticism: 10,
      combat: 90,
      multiverseInfluence: 78
    },
    comicOrigins: 'Captain America #117 (1969). Took the mantle in All-New Captain America (2014).',
    quote: '“The only hope for tomorrow is if we stand our ground together today.”',
    bio: 'Wielding the Vibranium shield and soaring with advanced Stark/Wakandan flight wings, Sam Wilson leads the grounded tactical and moral response on Earth-616 as the global superpower matrix fractures under Adamantium disputes and impending cosmic collapse.',
    doomsdayRole: 'Rallies the disparate heroes of Earth-616 (Thunderbolts, Shang-Chi, Wakanda, Spider-Man) into a unified defense front against Latverian incursions.',
    keyAbilities: [
      'Master Tactician & Inspirational Combat Leader',
      'Vibranium Wing Suit with Sonic & Kinetic Thrusters',
      'Vibranium Shield Combat Mastery',
      'Redwing Aerial Recon Drone Network'
    ],
    firstAppearance: 'Captain America: The Winter Soldier (2014)',
    avatarIcon: 'Shield',
    colorTheme: 'from-blue-600 via-red-800 to-slate-950'
  }
];

export const COMIC_ARCHIVES: ComicIssue[] = [
  {
    id: 'secret-wars-2015',
    title: 'Secret Wars (2015)',
    arc: 'Secret Wars (2015)',
    writer: 'Jonathan Hickman',
    artist: 'Esad Ribić',
    year: 2015,
    issuesRange: 'Secret Wars #1 - #9 (Main Event)',
    summary: 'The Multiverse is dying. The final Incursion occurs between the Main Marvel Universe (Earth-616) and the Ultimate Marvel Universe (Earth-1610). While heroes fail to stop the collision, Doctor Doom—working with Doctor Strange and Molecule Man—steals the power of the omnipotent Beyonders. Doom rescues remaining fragments of broken realities and stitches them together into BATTLEWORLD, ruling over all as God Emperor Doom.',
    whyReadForDoomsday: 'This is the absolute bible and core blueprint for Avengers: Doomsday and Avengers: Secret Wars. Everything—from Incursions and the Life Raft to Doom’s supreme ascension—is derived directly from this run.',
    keyConceptsIntroduced: [
      'Final Incursion between Earth-616 & Earth-1610',
      'Battleworld: The patchwork planet of surviving multiversal domains',
      'God Emperor Doom & Sheriff Stephen Strange',
      'The Thor Corps: Doom’s multiversal police force',
      'The Life Raft containing surviving heroes (Reed, Peter Parker, Black Panther)'
    ],
    essentialMoment: 'Secret Wars #4 & #8: Doom ripping Thanos’s spine out with his bare hands and the final philosophical duel between Reed Richards and God Emperor Doom.'
  },
  {
    id: 'time-runs-out',
    title: 'Avengers / New Avengers: Time Runs Out',
    arc: 'Time Runs Out',
    writer: 'Jonathan Hickman',
    artist: 'Mike Deodato, Stefano Caselli, Jerome Opeña',
    year: 2014,
    issuesRange: 'Avengers (Vol 5) #35–44 / New Avengers (Vol 3) #24–33',
    summary: 'Spanning the 8 months leading directly into Secret Wars, the Illuminati (Iron Man, Mr. Fantastic, Namor, Black Panther, Beast) desperately build world-destroying antimatter bombs to vaporize colliding Earths in secret. As their morality crumbles and their friendship fractures, Doom operates from the shadows discovering the Beyonders’ master plan.',
    whyReadForDoomsday: 'Explains the grim psychological cost of Incursions: What would a hero do when forced to destroy another living planet to save their own children?',
    keyConceptsIntroduced: [
      'The 8-Hour Incursion Collision Window',
      'Rabum Alal (The Great Destroyer, revealed to be Victor von Doom)',
      'The Black Priests & The Mapmakers',
      'The Illuminati’s moral collapse and Antimatter Injector weapons'
    ],
    essentialMoment: 'New Avengers #33: Doom and Molecule Man traveling to the source of the Beyonders to detonate a bomb across the multiverse.'
  },
  {
    id: 'fantastic-four-hickman',
    title: 'Fantastic Four / FF: Solve Everything & War of the Four Cities',
    arc: 'Fantastic Four Rivalry',
    writer: 'Jonathan Hickman',
    artist: 'Dale Eaglesham, Steve Epting',
    year: 2009,
    issuesRange: 'Fantastic Four #570–611 / FF #1–23',
    summary: 'Reed Richards creates "The Bridge" to search the Multiverse for answers, discovering the Interdimensional Council of Reeds. Meanwhile, Victor von Doom battles to prove his supremacy over every Reed in existence, forming deep ties with Reed’s daughter Valeria Richards.',
    whyReadForDoomsday: 'Defines the modern dynamic between Pedro Pascal’s Reed Richards and Robert Downey Jr.’s Victor von Doom. Proves that Doom is always driven by the desire to outperform Reed.',
    keyConceptsIntroduced: [
      'The Council of Reeds (Alternate Reed Richards variants)',
      'The Bridge (Multiverse viewing device)',
      'Valeria Richards choosing Uncle Doom as her intellectual equal',
      'The Future Foundation and celestial threats'
    ],
    essentialMoment: 'Fantastic Four #611: Victor von Doom wielding an Infinity Gauntlet in an alternate universe declaring "I will not yield."'
  },
  {
    id: 'books-of-doom',
    title: 'Books of Doom',
    arc: 'Books of Doom',
    writer: 'Ed Brubaker',
    artist: 'Pablo Raimondi',
    year: 2005,
    issuesRange: 'Books of Doom #1 - #6',
    summary: 'The definitive origin story of Victor von Doom. Follows his childhood in Latveria as the son of Romani sorceress Cynthia von Doom, his university rivalry with Reed Richards in America, the explosion that scarred his face, his journey to Tibetan monks to forge his iconic iron mask, and his sovereign overthrow of Latveria.',
    whyReadForDoomsday: 'The ultimate psychological profile of why Doom believes he alone has the iron will required to lead humanity to salvation.',
    keyConceptsIntroduced: [
      'Cynthia von Doom’s soul trapped by Mephisto (Doom’s mystic motivation)',
      'The university explosion caused by Reed pointing out a flaw in Doom’s calculations',
      'The forging of the Titanium Iron Mask pressed onto his flesh while red hot',
      'The liberation and technological modernization of Latveria'
    ],
    essentialMoment: 'Books of Doom #6: Victor standing atop Castle Doom crowned monarch of Latveria, vowing to save all existence from itself.'
  }
];
