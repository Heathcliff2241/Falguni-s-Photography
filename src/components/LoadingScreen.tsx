import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);
  const [unfolded, setUnfolded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Step 1: Start swaddle blanket unfold after 150ms
    const unfoldTimer = setTimeout(() => {
      setUnfolded(true);
    }, 150);

    // Step 2: Start fade out after 1000ms
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1050);

    // Step 3: Complete and remove from DOM after 1200ms
    const completeTimer = setTimeout(() => {
      setHidden(true);
      if (onComplete) onComplete();
    }, 1250);

    return () => {
      clearTimeout(unfoldTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      id="loading-screen"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#FAF5EF] transition-opacity duration-300 ease-out ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center p-6 text-center">
        {/* Soft swaddle blanket wrap animation */}
        <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
          {/* Outer swaddle fold layer */}
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full text-[#EAD3CE] transition-all duration-700 ease-out"
          >
            {/* Base swaddle cocoon shape */}
            <path
              d="M60 14C38 14 22 34 22 62C22 88 38 106 60 106C82 106 98 88 98 62C98 34 82 14 60 14Z"
              fill="#FAF5EF"
              stroke="#9CAA8C"
              strokeWidth="1.5"
            />
            {/* Left wrap fold opening */}
            <path
              d={unfolded ? "M28 40C40 45 48 58 46 80" : "M22 40C44 55 60 68 62 88"}
              stroke="#EAD3CE"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-700 ease-out"
            />
            {/* Right wrap fold crossing over and gently opening */}
            <path
              d={unfolded ? "M92 40C80 45 72 58 74 80" : "M98 40C76 55 58 68 56 88"}
              stroke="#EAD3CE"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-700 ease-out"
            />
            {/* Sage wrap tie thread */}
            <path
              d={unfolded ? "M42 62C54 60 66 60 78 62" : "M36 68C52 66 68 66 84 68"}
              stroke="#9CAA8C"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              fill="none"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Studio monogram in center */}
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
              unfolded ? 'opacity-100 scale-100' : 'opacity-30 scale-95'
            }`}
          >
            <span className="font-display text-2xl text-[#6E4E53] font-medium tracking-wider">
              F
            </span>
          </div>
        </div>

        {/* Studio title revelation */}
        <h2 className="font-display text-xl text-[#362E2B] font-medium tracking-wide">
          Falguni&apos;s Photography
        </h2>
        <p className="caption-text text-[#9CAA8C] mt-1">
          Lightsview, Adelaide
        </p>
      </div>
    </div>
  );
};
