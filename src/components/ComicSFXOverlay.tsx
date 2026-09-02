import React from 'react';
import { useApp } from '../context/AppContext';

export const ComicSFXOverlay: React.FC = () => {
  const { sfxQueue } = useApp();

  if (sfxQueue.length === 0) return null;

  const getColorClasses = (color: string | undefined) => {
    switch (color) {
      case 'yellow':
        return 'text-yellow-400 comic-sfx-stroke-yellow';
      case 'red':
        return 'text-red-500 comic-sfx-stroke-red';
      case 'cyan':
        return 'text-cyan-400 comic-sfx-stroke-cyan';
      case 'purple':
        return 'text-purple-400 comic-sfx-stroke-purple';
      case 'orange':
        return 'text-orange-500 comic-sfx-stroke-orange';
      case 'green':
      default:
        return 'text-[#22c55e] comic-sfx-stroke-green';
    }
  };

  const getStarburstFill = (color: string | undefined) => {
    switch (color) {
      case 'yellow':
        return 'fill-yellow-400/30 stroke-yellow-300';
      case 'red':
        return 'fill-red-500/30 stroke-red-400';
      case 'cyan':
        return 'fill-cyan-400/30 stroke-cyan-300';
      case 'purple':
        return 'fill-purple-500/30 stroke-purple-400';
      case 'orange':
        return 'fill-orange-500/30 stroke-orange-400';
      case 'green':
      default:
        return 'fill-[#22c55e]/30 stroke-[#22c55e]';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {sfxQueue.map((sfx) => {
        const posX = sfx.x !== undefined ? `${sfx.x}px` : '50%';
        const posY = sfx.y !== undefined ? `${sfx.y}px` : '40%';
        const rotation = sfx.rotation !== undefined ? sfx.rotation : -8;
        const scale = sfx.scale || 1;

        return (
          <div
            key={sfx.id}
            className="absolute animate-comic-sfx pointer-events-none select-none flex items-center justify-center"
            style={{
              left: posX,
              top: posY,
              // @ts-ignore
              '--sfx-rot': `${rotation}deg`,
            }}
          >
            {/* Comic Starburst Backing SVG */}
            <div className="absolute inset-0 flex items-center justify-center animate-comic-starburst -z-10 scale-150">
              <svg
                width="220"
                height="220"
                viewBox="0 0 100 100"
                className={`w-44 h-44 sm:w-56 sm:h-56 ${getStarburstFill(sfx.color)}`}
                style={{ filter: 'drop-shadow(0px 0px 8px rgba(0,0,0,0.8))' }}
              >
                {/* 16-point comic blast polygon */}
                <polygon
                  points="50,0 62,35 98,30 75,55 95,85 60,78 50,100 40,78 5,85 25,55 2,30 38,35"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Impact Lines & Halftone Aura */}
            <div className="relative flex items-center justify-center">
              <span
                className={`font-comic font-black text-4xl sm:text-6xl md:text-7xl tracking-wider uppercase whitespace-nowrap drop-shadow-2xl ${getColorClasses(
                  sfx.color
                )}`}
                style={{
                  transform: `scale(${scale})`,
                  letterSpacing: '0.05em',
                }}
              >
                {sfx.text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
