import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Total display duration ~1.3s for a swift, luxurious entrance
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          id="loading-screen"
          role="status"
          aria-live="polite"
          aria-label="Loading Falguni's Photography studio"
          onClick={handleDismiss}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.02,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF5EF] cursor-pointer select-none overflow-hidden"
        >
          {/* Subtle warm ambient glow in background */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(234,211,206,0.25)_0%,_transparent_65%)]" />

          <div className="relative flex flex-col items-center justify-center p-8 max-w-sm text-center z-10">
            {/* Organic aperture and swaddle cocoon emblem */}
            <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
              {/* Outer soft breathing halo ring */}
              <motion.svg
                viewBox="0 0 140 140"
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  fill="none"
                  stroke="#9CAA8C"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  strokeOpacity="0.45"
                />
              </motion.svg>

              {/* Gentle camera lens aperture petals */}
              <svg
                viewBox="0 0 120 120"
                className="w-28 h-28 text-[#EAD3CE] overflow-visible"
              >
                {/* 6 Camera Iris / Swaddle Petals that gently rotate and bloom */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <motion.path
                    key={angle}
                    d="M60 22 C76 22 92 34 88 56 C74 54 62 42 60 22 Z"
                    fill="#FAF5EF"
                    stroke="#D8C7AA"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    initial={{ scale: 0.8, rotate: angle, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      rotate: angle + 25, 
                      opacity: 0.95 
                    }}
                    transition={{
                      duration: 0.9,
                      delay: i * 0.05,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    style={{ originX: "60px", originY: "60px" }}
                  />
                ))}

                {/* Delicate inner aperture ring */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="26"
                  fill="#FAF5EF"
                  stroke="#6E4E53"
                  strokeWidth="1.4"
                  strokeOpacity="0.8"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                />

                {/* Soft accent blush inner circle */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="21"
                  fill="#EAD3CE"
                  fillOpacity="0.35"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
                />
              </svg>

              {/* Center Monogram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <span className="font-display text-3xl font-medium text-[#6E4E53] tracking-wider select-none">
                  F
                </span>
              </motion.div>
            </div>

            {/* Studio Identity Revelation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              className="space-y-2"
            >
              <h2 className="font-display text-2xl text-[#362E2B] font-normal tracking-wide">
                Falguni&apos;s Photography
              </h2>

              {/* Delicate expanding divider line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-16 h-[1.5px] bg-[#9CAA8C]/70 mx-auto rounded-full origin-center"
              />

              <p className="caption-text text-[#6E4E53] text-xs uppercase tracking-[0.2em] pt-1">
                Lightsview, Adelaide
              </p>
            </motion.div>

            {/* Gentle tap to enter hint */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              transition={{ duration: 0.4, delay: 0.85 }}
              className="text-[11px] text-[#362E2B]/50 mt-6 tracking-wider font-light"
            >
              Unhurried Newborn &amp; Family Studio
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
