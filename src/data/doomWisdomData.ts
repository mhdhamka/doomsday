export interface DoomWisdomQuote {
  id: string;
  quote: string;
  source: string;
  context: string;
  mood: 'OMINOUS' | 'TRIUMPHANT' | 'PHILOSOPHICAL' | 'CONTEMPTUOUS' | 'DIVINE';
  comicIssue: string;
  target?: string;
}

export const DOOM_WISDOM_QUOTES: DoomWisdomQuote[] = [
  {
    id: 'dw-1',
    quote: '“I was a god, Valeria. I found it... beneath me.”',
    source: 'GOD EMPEROR DOOM',
    context: 'Reflecting on the burden and limitations of omnipotence over Battleworld.',
    mood: 'DIVINE',
    comicIssue: 'SECRET WARS (2015) #9',
    target: 'Cosmic Order'
  },
  {
    id: 'dw-2',
    quote: '“DOOM does not beg for salvation. DOOM commands the cosmos to yield!”',
    source: 'MONARCH OF LATVERIA',
    context: 'Direct address before shattering the Beyonders’ multidimensional armada.',
    mood: 'TRIUMPHANT',
    comicIssue: 'NEW AVENGERS (VOL. 3) #33',
    target: 'The Beyonders'
  },
  {
    id: 'dw-3',
    quote: '“You speak of hope as if it were currency. In the coming incursion, only iron will and unmatched intellect shall purchase survival.”',
    source: 'VICTOR VON DOOM',
    context: 'Dismissing the Avengers’ appeals for diplomatic compromise.',
    mood: 'CONTEMPTUOUS',
    comicIssue: 'AVENGERS: DOOMSDAY INTEL',
    target: 'Earth-616 Heroes'
  },
  {
    id: 'dw-4',
    quote: '“Reed Richards believed he could save the world with a lifeboat. He failed to see that to save creation, one must become its author.”',
    source: 'SOVEREIGN OF DOOMSTADT',
    context: 'Analyzing the fundamental difference between survival and reinvention.',
    mood: 'PHILOSOPHICAL',
    comicIssue: 'FANTASTIC FOUR #645',
    target: 'Reed Richards'
  },
  {
    id: 'dw-5',
    quote: '“Bow before the inevitable. When two universes collide, the weak pray for mercy—the supreme forge a new reality from the ash.”',
    source: 'SUPREME SORCERER & SCIENTIST',
    context: 'Inscribing the foundational law of Domain Zero upon Battleworld’s creation.',
    mood: 'OMINOUS',
    comicIssue: 'SECRET WARS (2015) #3',
    target: 'The Multiverse'
  },
  {
    id: 'dw-6',
    quote: '“Pain is merely knowledge arriving before acceptance. Latveria knows neither fear nor failure.”',
    source: 'CHIEF OF THE LATVERIAN EMPIRE',
    context: 'Teaching Valeria the disciplines of mind over physical agony.',
    mood: 'PHILOSOPHICAL',
    comicIssue: 'DOCTOR DOOM (2019) #1',
    target: 'Latverian Youth'
  },
  {
    id: 'dw-7',
    quote: '“There is no universe where Doom kneels. If such a world existed, Doom would destroy it with his bare hands.”',
    source: 'VICTOR VON DOOM',
    context: 'Rebuffing Kang the Conqueror’s timeline treaty proposals.',
    mood: 'TRIUMPHANT',
    comicIssue: 'INFINITY GAUNTLET #4',
    target: 'Council of Kangs'
  },
  {
    id: 'dw-8',
    quote: '“Let the stars expire and galaxies disintegrate into silence. As long as Victor von Doom breathes, reality has a master.”',
    source: 'GOD OF CREATION',
    context: 'Final proclamation before the collapse of the Seventh Cosmos.',
    mood: 'OMINOUS',
    comicIssue: 'SECRET WARS #1',
    target: 'The Living Tribunal'
  },
  {
    id: 'dw-9',
    quote: '“Your laws of physics are polite suggestions. Doom writes the universe’s definitive equations.”',
    source: 'MASTER OF SCIENCE & SORCERY',
    context: 'Synthesizing dark matter siphon coils with the mystic flames of Cagliostro.',
    mood: 'CONTEMPTUOUS',
    comicIssue: 'AVENGERS / FANTASTIC FOUR #1',
    target: 'Mister Fantastic'
  },
  {
    id: 'dw-10',
    quote: '“A throne is not a prize of vanity; it is the fulcrum upon which the entire weight of existence must rest.”',
    source: 'LORD DOOM',
    context: 'Addressing the Lords of the 50 Domains of Battleworld.',
    mood: 'DIVINE',
    comicIssue: 'SECRET WARS (2015) #4',
    target: 'The 50 Domains'
  }
];
