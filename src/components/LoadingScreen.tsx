import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress gracefully over 1.6 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate smoothly
        const increment = prev < 60 ? 3.5 : prev < 90 ? 4.5 : 6;
        return Math.min(100, prev + increment);
      });
    }, 45);

    // Complete and trigger seamless fadeout after progress finishes
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
            scale: 1.04,
            filter: "blur(8px)",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF5EF] cursor-pointer select-none overflow-hidden"
        >
          {/* Soft ambient photographic window light / lens bloom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: [0.8, 1.15, 1.05] }}
            transition={{ duration: 2.2, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(234,211,206,0.45)_0%,_rgba(216,199,170,0.18)_40%,_transparent_72%)]"
          />

          {/* Secondary warm golden rim glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,_rgba(255,255,255,0.7)_0%,_transparent_50%)] mix-blend-soft-light" />

          <div className="relative flex flex-col items-center justify-center p-8 max-w-md text-center z-10">
            {/* Camera Lens Aperture & Swaddle Cocoon Emblem */}
            <div className="relative w-36 h-36 mb-7 flex items-center justify-center">
              {/* Outer delicate calibration dial / celestial marks */}
              <motion.svg
                viewBox="0 0 160 160"
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="80"
                  cy="80"
                  r="74"
                  fill="none"
                  stroke="#9CAA8C"
                  strokeWidth="0.8"
                  strokeDasharray="2 6"
                  strokeOpacity="0.4"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="78"
                  fill="none"
                  stroke="#D8C7AA"
                  strokeWidth="0.5"
                  strokeOpacity="0.25"
                />
              </motion.svg>

              {/* Counter-rotating subtle aperture ring */}
              <motion.svg
                viewBox="0 0 160 160"
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="80"
                  cy="80"
                  r="66"
                  fill="none"
                  stroke="#EAD3CE"
                  strokeWidth="1.2"
                  strokeDasharray="6 10"
                  strokeOpacity="0.6"
                />
              </motion.svg>

              {/* Main Aperture / Swaddle cocoon vector illustration with smooth path drawing */}
              <svg
                viewBox="0 0 120 120"
                className="w-32 h-32 text-[#EAD3CE] overflow-visible"
              >
                <defs>
                  {/* Delicate gradient for lens blades */}
                  <linearGradient id="blade-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FAF5EF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#EAD3CE" stopOpacity="0.75" />
                  </linearGradient>
                  <linearGradient id="gold-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6E4E53" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#D8C7AA" stopOpacity="0.85" />
                  </linearGradient>
                </defs>

                {/* 6 Curving Swaddle & Iris Petals with sequenced entry */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <motion.path
                    key={angle}
                    d="M60 18 C78 18 94 32 90 56 C74 54 62 40 60 18 Z"
                    fill="url(#blade-gradient)"
                    stroke="url(#gold-stroke)"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    initial={{
                      scale: 0.6,
                      rotate: angle,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      rotate: angle + 28,
                      opacity: 0.95,
                    }}
                    transition={{
                      duration: 1.1,
                      delay: i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ originX: "60px", originY: "60px" }}
                  />
                ))}

                {/* Central Soft Warm Ring */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="27"
                  fill="#FAF5EF"
                  stroke="#6E4E53"
                  strokeWidth="1.5"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Inner Warm Rose Cocoon Core */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="22"
                  fill="#EAD3CE"
                  fillOpacity="0.45"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.08, 1] }}
                  transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                />

                {/* Shutter Accent Ring */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="19"
                  fill="none"
                  stroke="#D8C7AA"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                />
              </svg>

              {/* Center Handcrafted Monogram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 3 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <span className="font-display text-[34px] font-medium text-[#6E4E53] tracking-wider select-none transform -translate-y-0.5">
                  F
                </span>
              </motion.div>
            </div>

            {/* Studio Identity Revelation */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-2.5"
            >
              <h2 className="font-display text-2xl sm:text-[27px] text-[#362E2B] font-normal tracking-[0.08em] leading-tight">
                Falguni&apos;s Photography
              </h2>

              {/* Delicate Expanding Warm Divider Line */}
              <div className="flex items-center justify-center gap-2 pt-0.5">
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-10 h-[1px] bg-[#D8C7AA] origin-right"
                />
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="w-1.5 h-1.5 rounded-full bg-[#6E4E53]/70"
                />
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-10 h-[1px] bg-[#D8C7AA] origin-left"
                />
              </div>

              <p className="caption-text text-[#6E4E53] text-[11.5px] uppercase tracking-[0.24em] font-medium">
                Lightsview &middot; Adelaide
              </p>
            </motion.div>

            {/* Luxury Whisper-Thin Golden Progress Bar */}
            <div className="w-48 mt-7 relative">
              <div className="w-full h-[2px] bg-[#EAD3CE]/40 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#D8C7AA] via-[#6E4E53] to-[#9CAA8C] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
            </div>

            {/* Delicate Studio Philosophy Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-[12px] text-[#362E2B]/60 mt-3.5 tracking-wide font-light italic"
            >
              Unhurried, baby-led newborn &amp; family sessions
            </motion.p>

            {/* Click to enter hint */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.45, 0.3] }}
              transition={{ duration: 1.2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
              className="text-[10px] text-[#6E4E53]/70 uppercase tracking-[0.2em] mt-5 font-sans"
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
