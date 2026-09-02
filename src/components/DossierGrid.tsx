import React, { useState } from 'react';
import { DOSSIER_CHARACTERS } from '../data/dossierData';
import { DossierCharacter, FactionId, ThreatLevel } from '../types';
import { 
  ShieldAlert, 
  Crown, 
  Atom, 
  TreePine, 
  Eye, 
  Swords, 
  Shield, 
  Zap, 
  Brain, 
  Flame, 
  Globe, 
  CheckCircle, 
  ChevronRight,
  Info
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const DossierGrid: React.FC = () => {
  const [selectedFaction, setSelectedFaction] = useState<'ALL' | FactionId>('ALL');
  const [selectedCharacter, setSelectedCharacter] = useState<DossierCharacter | null>(DOSSIER_CHARACTERS[0]);

  const factionFilters = [
    { id: 'ALL', label: 'All Factions' },
    { id: 'DOOM_LATVERIA', label: 'Latverian Hegemony (Doom)' },
    { id: 'FANTASTIC_FOUR', label: 'Fantastic Four (Earth-828)' },
    { id: 'TVA_CHRONOS', label: 'TVA & God Loki' },
    { id: 'AVENGERS_616', label: 'Avengers (Earth-616)' },
    { id: 'X_MEN_LEGACY', label: 'X-Men Legacy Units' },
  ] as const;

  const filteredCharacters = DOSSIER_CHARACTERS.filter((char) => {
    if (selectedFaction === 'ALL') return true;
    return char.faction === selectedFaction;
  });

  const getThreatBadge = (level: ThreatLevel) => {
    switch (level) {
      case 'OMEGA_UNIVERSAL':
        return {
          label: 'OMEGA // UNIVERSAL THREAT',
          style: 'bg-[#1a2e1a] text-[#22c55e] border-[#22c55e]/60 shadow-[0_0_12px_rgba(34,197,94,0.3)]',
        };
      case 'COSMIC_NEXUS':
        return {
          label: 'COSMIC NEXUS ENTITY',
          style: 'bg-[#080d08] text-[#22c55e] border-[#22c55e]/50',
        };
      case 'ALPHA_THREAT':
        return {
          label: 'ALPHA DEFENSE CLASS',
          style: 'bg-[#080d08] text-white border-[#1a2e1a]',
        };
      case 'VANGUARD_DEFENDER':
        return {
          label: 'VANGUARD OPERATIVE',
          style: 'bg-[#020402] text-[#e0e7e0]/70 border-[#1a2e1a]',
        };
      default:
        return { label: 'UNKNOWN', style: 'bg-[#020402] text-[#e0e7e0]/60 border-[#1a2e1a]' };
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown': return <Crown className="w-5 h-5 text-[#22c55e]" />;
      case 'Atom': return <Atom className="w-5 h-5 text-[#22c55e]" />;
      case 'TreePine': return <TreePine className="w-5 h-5 text-[#22c55e]" />;
      case 'Eye': return <Eye className="w-5 h-5 text-[#22c55e]" />;
      case 'Swords': return <Swords className="w-5 h-5 text-[#22c55e]" />;
      case 'Shield': return <Shield className="w-5 h-5 text-[#22c55e]" />;
      default: return <ShieldAlert className="w-5 h-5 text-[#22c55e]" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-mono">
      {/* Header Overview in Comic Style */}
      <div className="rounded bg-[#080d08] border-2 border-[#1a2e1a] p-5 sm:p-6 comic-shadow-dark doom-glow bg-comic-dots">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#22c55e] mb-1">
              <span className="px-2 py-0.5 bg-[#22c55e] text-black font-comic text-xs uppercase font-black">
                CLASSIFIED
              </span>
              <span className="uppercase tracking-widest font-bold">MULTIVERSE INTELLIGENCE</span>
            </div>
            <h2 className="font-comic text-3xl sm:text-4xl text-white uppercase comic-title-stroke tracking-wide">
              The Dossier: Factions & Threat Matrix
            </h2>
            <p className="text-xs sm:text-sm text-[#e0e7e0]/80 mt-1 max-w-2xl leading-relaxed">
              Operational records of the primary factions, cosmic leaders, and multiversal strike forces converging upon <strong className="text-white">Avengers: Doomsday</strong>.
            </p>
          </div>

          <div className="px-3.5 py-2.5 rounded bg-[#020402] border-2 border-[#1a2e1a] text-center shrink-0 shadow-[2px_2px_0px_#000]">
            <div className="text-[10px] text-[#22c55e] font-comic uppercase tracking-wider">Primary Omega Variant</div>
            <div className="text-base font-comic text-white flex items-center justify-center gap-1.5 mt-0.5 tracking-wider">
              <Crown className="w-4 h-4 text-[#22c55e]" />
              VICTOR VON DOOM (RDJ)
            </div>
          </div>
        </div>

        {/* Faction Filter Buttons in Comic Style */}
        <div className="mt-5 flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          {factionFilters.map((tab) => (
            <button
              key={tab.id}
              id={`faction-btn-${tab.id.toLowerCase()}`}
              onClick={() => {
                soundEngine.playClick();
                setSelectedFaction(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all shadow-[2px_2px_0px_#000] ${
                selectedFaction === tab.id
                  ? 'bg-[#1a2e1a] text-[#22c55e] border-2 border-[#22c55e]'
                  : 'bg-[#020402] text-[#e0e7e0]/70 hover:text-white border-2 border-[#1a2e1a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split-View: Character Cards & Deep Intel Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of Characters (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredCharacters.map((char) => {
            const isSelected = selectedCharacter?.id === char.id;
            const threat = getThreatBadge(char.threatLevel);

            return (
              <div
                key={char.id}
                id={`dossier-card-${char.id}`}
                onClick={() => {
                  if (char.id === 'dr-doom') soundEngine.playDoomSurge();
                  else soundEngine.playClick();
                  setSelectedCharacter(char);
                }}
                className={`p-4 rounded border-2 cursor-pointer transition-all duration-200 relative overflow-hidden shadow-[3px_3px_0px_#000] ${
                  isSelected
                    ? 'border-[#22c55e] bg-[#1a2e1a]/40 doom-glow shadow-[4px_4px_0px_#22c55e]'
                    : 'border-[#1a2e1a] bg-[#080d08] hover:border-[#22c55e] hover:bg-[#020402]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded bg-[#020402] border-2 border-[#1a2e1a] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000]">
                      {renderIcon(char.avatarIcon)}
                    </div>
                    <div>
                      <h3 className="font-comic text-xl text-white flex items-center gap-1.5 uppercase comic-title-stroke tracking-wide">
                        {char.alias}
                      </h3>
                      <div className="text-xs text-[#e0e7e0]/70">
                        {char.name} • <span className="text-[#22c55e] font-bold">{char.actor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-comic text-[#22c55e] tracking-wider">
                      {char.threatScore}/100
                    </div>
                    <div className="text-[9px] text-[#e0e7e0]/60 uppercase font-bold">
                      THREAT INDEX
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold tracking-wider ${threat.style}`}>
                    {char.threatLevel.replace('_', ' ')}
                  </span>

                  <span className="text-[11px] text-[#e0e7e0]/70 flex items-center gap-1 font-bold">
                    <span>Inspect Profile</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#22c55e]" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Deep Profile Hologram Display (7 cols on lg) */}
        {selectedCharacter && (
          <div className="lg:col-span-7 rounded border-2 border-[#22c55e] bg-[#080d08] p-5 sm:p-7 doom-glow space-y-5 relative overflow-hidden shadow-[5px_5px_0px_#1a2e1a] bg-comic-dots">
            {/* Ambient Background Aura */}
            <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#22c55e]/10 to-transparent rounded-full blur-3xl pointer-events-none`} />

            {/* Profile Header */}
            <div className="flex items-start justify-between gap-4 border-b-2 border-[#1a2e1a] pb-4 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded border-2 uppercase font-bold bg-[#1a2e1a] text-[#22c55e] border-[#22c55e] tracking-wider shadow-[2px_2px_0px_#000]">
                    {selectedCharacter.factionName}
                  </span>
                  <span className="text-xs text-[#e0e7e0]/70 uppercase font-bold">
                    PORTRAYED BY: <strong className="text-white">{selectedCharacter.actor}</strong>
                  </span>
                </div>
                <h2 className="font-comic text-3xl sm:text-4xl text-white uppercase comic-title-stroke tracking-wide">
                  {selectedCharacter.alias}
                </h2>
                <div className="text-xs text-[#e0e7e0]/70">
                  REAL NAME: <strong className="text-white">{selectedCharacter.name}</strong> • FIRST APPEARANCE: <span className="text-[#22c55e]">{selectedCharacter.firstAppearance}</span>
                </div>
              </div>

              <div className="text-center bg-[#020402] border-2 border-[#1a2e1a] p-3 rounded shrink-0 shadow-[3px_3px_0px_#000]">
                <div className="text-3xl font-comic text-[#22c55e] comic-title-stroke">
                  {selectedCharacter.threatScore}
                </div>
                <div className="text-[9px] text-[#e0e7e0]/60 uppercase tracking-wider font-bold">
                  COMPOSITE POWER
                </div>
              </div>
            </div>

            {/* Character Comic Speech Bubble / Quote */}
            <div className="comic-narration-box p-3.5 rounded text-xs sm:text-sm text-white font-bold tracking-wide">
              "{selectedCharacter.quote}"
            </div>

            {/* Power Attribute Matrix */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 font-comic text-sm">
                <Zap className="w-3.5 h-3.5 text-[#22c55e]" />
                Multiversal Power Matrix
              </h4>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {/* Intelligence */}
                <div className="p-2.5 rounded bg-[#020402] border-2 border-[#1a2e1a] shadow-[2px_2px_0px_#000]">
                  <div className="flex justify-between text-xs text-[#e0e7e0]/80 mb-1 font-bold">
                    <span className="flex items-center gap-1">
                      <Brain className="w-3 h-3 text-[#22c55e]" /> Intellect
                    </span>
                    <span className="text-white">{selectedCharacter.powerRating.intelligence}%</span>
                  </div>
                  <div className="w-full bg-[#080d08] h-2 rounded overflow-hidden border border-[#1a2e1a]">
                    <div className="bg-[#22c55e] h-full rounded" style={{ width: `${selectedCharacter.powerRating.intelligence}%` }} />
                  </div>
                </div>

                {/* Mysticism */}
                <div className="p-2.5 rounded bg-[#020402] border-2 border-[#1a2e1a] shadow-[2px_2px_0px_#000]">
                  <div className="flex justify-between text-xs text-[#e0e7e0]/80 mb-1 font-bold">
                    <span className="flex items-center gap-1">
                      Mysticism
                    </span>
                    <span className="text-white">{selectedCharacter.powerRating.mysticism}%</span>
                  </div>
                  <div className="w-full bg-[#080d08] h-2 rounded overflow-hidden border border-[#1a2e1a]">
                    <div className="bg-[#22c55e] h-full rounded" style={{ width: `${selectedCharacter.powerRating.mysticism}%` }} />
                  </div>
                </div>

                {/* Combat */}
                <div className="p-2.5 rounded bg-[#020402] border-2 border-[#1a2e1a] shadow-[2px_2px_0px_#000]">
                  <div className="flex justify-between text-xs text-[#e0e7e0]/80 mb-1 font-bold">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-red-400" /> Combat Lethality
                    </span>
                    <span className="text-white">{selectedCharacter.powerRating.combat}%</span>
                  </div>
                  <div className="w-full bg-[#080d08] h-2 rounded overflow-hidden border border-[#1a2e1a]">
                    <div className="bg-red-500 h-full rounded" style={{ width: `${selectedCharacter.powerRating.combat}%` }} />
                  </div>
                </div>

                {/* Multiverse Influence */}
                <div className="p-2.5 rounded bg-[#020402] border-2 border-[#1a2e1a] shadow-[2px_2px_0px_#000]">
                  <div className="flex justify-between text-xs text-[#e0e7e0]/80 mb-1 font-bold">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-[#22c55e]" /> Multiverse Influence
                    </span>
                    <span className="text-white">{selectedCharacter.powerRating.multiverseInfluence}%</span>
                  </div>
                  <div className="w-full bg-[#080d08] h-2 rounded overflow-hidden border border-[#1a2e1a]">
                    <div className="bg-[#22c55e] h-full rounded" style={{ width: `${selectedCharacter.powerRating.multiverseInfluence}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Role in Avengers: Doomsday */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#22c55e] flex items-center gap-1.5 font-comic text-sm">
                <Info className="w-3.5 h-3.5" />
                Strategic Role in Avengers: Doomsday
              </h4>
              <p className="text-xs sm:text-sm text-[#e0e7e0] leading-relaxed bg-[#020402] p-3 rounded border-2 border-[#1a2e1a]">
                {selectedCharacter.doomsdayRole}
              </p>
            </div>

            {/* Key Arsenal & Abilities */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#22c55e] font-comic text-sm">
                Arsenal & Tactical Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedCharacter.keyAbilities.map((ab, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded bg-[#020402] border-2 border-[#1a2e1a] text-xs text-[#e0e7e0] font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                    <span>{ab}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comic Origins Reference */}
            <div className="text-[11px] text-[#e0e7e0]/70 pt-2 border-t-2 border-[#1a2e1a] font-bold">
              COMIC ROOTS: <span className="text-white">{selectedCharacter.comicOrigins}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
