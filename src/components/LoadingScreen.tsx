import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Graceful progress progression over 1.6s
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev < 50 ? 4 : prev < 85 ? 5 : 7;
        return Math.min(100, prev + increment);
      });
    }, 40);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
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
            scale: 1.03,
            filter: "blur(6px)",
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF5EF] cursor-pointer select-none overflow-hidden"
        >
          {/* Ambient warm studio light vignette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: [0.85, 1.1, 1] }}
            transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(234,211,206,0.5)_0%,_rgba(216,199,170,0.18)_42%,_transparent_72%)]"
          />

          {/* Central content container */}
          <div className="relative flex flex-col items-center justify-center px-6 py-8 max-w-sm w-full text-center z-10">
            
            {/* Unified mathematically centered emblem (160x160 coordinate space) */}
            <div className="relative w-36 h-36 mb-6 flex items-center justify-center">
              
              {/* Outer Slow Rotating Calibration Dial */}
              <motion.svg
                viewBox="0 0 160 160"
                className="absolute inset-0 w-full h-full"
                style={{ transformOrigin: "50% 50%" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="80"
                  cy="80"
                  r="74"
                  fill="none"
                  stroke="#9CAA8C"
                  strokeWidth="0.8"
                  strokeDasharray="2 6"
                  strokeOpacity="0.45"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="78"
                  fill="none"
                  stroke="#D8C7AA"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                />
              </motion.svg>

              {/* Counter-Rotating Aperture Ring */}
              <motion.svg
                viewBox="0 0 160 160"
                className="absolute inset-0 w-full h-full"
                style={{ transformOrigin: "50% 50%" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="80"
                  cy="80"
                  r="66"
                  fill="none"
                  stroke="#EAD3CE"
                  strokeWidth="1.2"
                  strokeDasharray="5 9"
                  strokeOpacity="0.7"
                />
              </motion.svg>

              {/* Main Perfectly Centered Vector Composition */}
              <svg
                viewBox="0 0 160 160"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <linearGradient id="swaddle-blade-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FAF5EF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#EAD3CE" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="warm-blade-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6E4E53" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#D8C7AA" stopOpacity="0.85" />
                  </linearGradient>
                </defs>

                {/* 6 Swaddle / Iris Petals rotating symmetrically around (80, 80) */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <motion.g
                    key={angle}
                    style={{ transformOrigin: "80px 80px" }}
                    initial={{ scale: 0.5, rotate: angle, opacity: 0 }}
                    animate={{ scale: 1, rotate: angle + 25, opacity: 0.95 }}
                    transition={{
                      duration: 1.0,
                      delay: i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <path
                      d="M80 24 C104 24 125 43 120 75 C99 72 83 53 80 24 Z"
                      fill="url(#swaddle-blade-gradient)"
                      stroke="url(#warm-blade-stroke)"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  </motion.g>
                ))}

                {/* Central Soft Warm Ring */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r="34"
                  fill="#FAF5EF"
                  stroke="#6E4E53"
                  strokeWidth="1.5"
                  style={{ transformOrigin: "80px 80px" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Inner Warm Rose Cocoon Core */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r="28"
                  fill="#EAD3CE"
                  fillOpacity="0.5"
                  style={{ transformOrigin: "80px 80px" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.06, 1] }}
                  transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                />

                {/* Shutter Accent Dashed Ring */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r="24"
                  fill="none"
                  stroke="#D8C7AA"
                  strokeWidth="0.8"
                  strokeDasharray="2.5 2.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                />

                {/* Precision Centered Monogram "F" via SVG textAnchor and dominantBaseline */}
                <motion.text
                  x="80"
                  y="81"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#6E4E53"
                  className="font-display font-medium select-none pointer-events-none"
                  fontSize="32"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ transformOrigin: "80px 80px" }}
                  transition={{ duration: 0.5, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  F
                </motion.text>
              </svg>
            </div>

            {/* Studio Identity Branding */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-2 flex flex-col items-center"
            >
              <h2 className="font-display text-2xl sm:text-[26px] text-[#362E2B] font-normal tracking-[0.06em] leading-tight">
                Falguni&apos;s Photography
              </h2>

              {/* Symmetrical Divider Line */}
              <div className="flex items-center justify-center gap-2 py-0.5 w-full">
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-10 h-[1px] bg-[#D8C7AA] origin-right"
                />
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="w-1.5 h-1.5 rounded-full bg-[#6E4E53]/70 shrink-0"
                />
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-10 h-[1px] bg-[#D8C7AA] origin-left"
                />
              </div>

              <p className="caption-text text-[#6E4E53] text-[11px] uppercase tracking-[0.22em] font-medium">
                Lightsview &middot; Adelaide
              </p>
            </motion.div>

            {/* Centered Thin Golden Progress Bar */}
            <div className="w-44 mt-6">
              <div className="w-full h-[2px] bg-[#EAD3CE]/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#D8C7AA] via-[#6E4E53] to-[#9CAA8C] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="text-[12px] text-[#362E2B]/70 mt-3 tracking-wide font-light italic"
            >
              Unhurried, baby-led newborn &amp; family sessions
            </motion.p>

            {/* Skip hint */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.3] }}
              transition={{ duration: 1.2, delay: 0.9, repeat: Infinity, repeatType: "reverse" }}
              className="text-[10px] text-[#6E4E53]/60 uppercase tracking-[0.18em] mt-4 font-sans"
            >
              Tap to enter
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
