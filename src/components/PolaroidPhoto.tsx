import React from 'react';

export interface PolaroidPhotoProps {
  src: string;
  alt: string;
  caption?: string;
  subcaption?: string;
  tapeVariant?: 'kraft' | 'sage' | 'blush';
  tapeAngle?: number; // e.g. -2, 0, 2
  tapePosition?: 'center' | 'left' | 'right';
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  aspectRatio?: string;
  fallbackSrc?: string;
}

export const PolaroidPhoto: React.FC<PolaroidPhotoProps> = ({
  src,
  alt,
  caption,
  subcaption,
  tapeVariant = 'kraft',
  tapeAngle = -1.5,
  tapePosition = 'center',
  className = '',
  onClick,
  interactive = false,
  aspectRatio = 'aspect-[4/3]',
  fallbackSrc,
}) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  React.useEffect(() => {
    setImgSrc(src);
  }, [src]);
  // Tape color themes with semi-translucence and realistic texture
  const tapeColors = {
    kraft: {
      fill: 'fill-[#EDE2CF]/85',
      border: 'stroke-[#D8C7AA]/60',
      crease: 'stroke-[#C8B799]/40',
    },
    sage: {
      fill: 'fill-[#DDE7D6]/85',
      border: 'stroke-[#BFCEB5]/60',
      crease: 'stroke-[#A8BA9D]/40',
    },
    blush: {
      fill: 'fill-[#F0DFDC]/85',
      border: 'stroke-[#D9BFBA]/60',
      crease: 'stroke-[#C5A59E]/40',
    },
  };

  const currentTape = tapeColors[tapeVariant];

  const tapePosClasses = {
    center: 'left-1/2 -translate-x-1/2',
    left: 'left-6',
    right: 'right-6',
  };

  return (
    <div
      className={`relative inline-block w-full max-w-[420px] mx-auto select-none ${className}`}
    >
      {/* Cartoonish / Almost Realistic Washi Tape */}
      <div
        className={`absolute -top-3.5 sm:-top-4 z-20 pointer-events-none ${tapePosClasses[tapePosition]}`}
        style={{
          transform: `${tapePosition === 'center' ? 'translateX(-50%) ' : ''}rotate(${tapeAngle}deg)`,
        }}
      >
        <svg
          viewBox="0 0 140 36"
          className="w-28 sm:w-36 h-7 sm:h-9 drop-shadow-[0_2px_4px_rgba(54,46,43,0.22)] overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Main tape polygon with torn/jagged ends */}
          <polygon
            points="
              0,0 
              7,3 2,7 8,11 1,16 7,20 2,25 8,30 0,36 
              140,36 
              133,31 138,26 132,21 139,16 133,11 138,6 132,0
            "
            className={`${currentTape.fill} ${currentTape.border}`}
            strokeWidth="0.8"
          />

          {/* Realistic tape highlights and crinkles */}
          <line
            x1="8"
            y1="10"
            x2="132"
            y2="10"
            stroke="white"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            strokeDasharray="20 10 30 15"
          />
          <line
            x1="12"
            y1="24"
            x2="128"
            y2="24"
            stroke="white"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
          {/* Subtle crinkle marks */}
          <path
            d="M 45,2 Q 48,18 43,34"
            fill="none"
            className={currentTape.crease}
            strokeWidth="0.75"
          />
          <path
            d="M 95,3 Q 92,19 96,33"
            fill="none"
            className={currentTape.crease}
            strokeWidth="0.75"
          />
        </svg>
      </div>

      {/* Polaroid Card Frame */}
      <div
        onClick={onClick}
        className={`relative w-full bg-[#FFFFFF] rounded-[2px] p-3.5 sm:p-4 pb-11 sm:pb-12 border border-[#E8E1D5] shadow-[0_12px_28px_-6px_rgba(54,46,43,0.14),0_3px_8px_-2px_rgba(54,46,43,0.06)] transition-all duration-300 ${
          interactive ? 'cursor-pointer hover:shadow-[0_18px_36px_-6px_rgba(54,46,43,0.22)] hover:-translate-y-1' : ''
        }`}
      >
        {/* Photo Cutout - UNIFORM ASPECT RATIO */}
        <div className={`relative w-full ${aspectRatio} overflow-hidden bg-[#F6F2EB] border border-[#E3DCD0]/70`}>
          <img
            src={imgSrc}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => {
              if (fallbackSrc && imgSrc !== fallbackSrc) {
                setImgSrc(fallbackSrc);
              }
            }}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out hover:scale-102"
          />
          {/* Subtle glossy photo sheen overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/10 pointer-events-none" />
        </div>

        {/* Polaroid Chin / Caption Area */}
        <div className="absolute bottom-2.5 sm:bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
          {caption ? (
            <span className="font-display italic text-[#6E4E53] text-sm sm:text-base tracking-wide truncate pr-2">
              {caption}
            </span>
          ) : (
            <span className="font-display italic text-[#6E4E53]/70 text-xs tracking-wide">
              Falguni&apos;s Photography
            </span>
          )}

          {subcaption && (
            <span className="text-[10px] sm:text-[11px] text-[#9CAA8C] uppercase tracking-wider shrink-0 font-sans">
              {subcaption}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
