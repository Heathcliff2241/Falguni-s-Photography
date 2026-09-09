import React from 'react';

interface RibbonDividerProps {
  className?: string;
  variant?: 'subtle' | 'centered';
}

export const RibbonDivider: React.FC<RibbonDividerProps> = ({ 
  className = '', 
  variant = 'centered' 
}) => {
  return (
    <div 
      className={`w-full flex items-center justify-center my-12 md:my-16 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg 
        width="240" 
        height="24" 
        viewBox="0 0 240 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#9CAA8C] max-w-[80vw]"
      >
        {/* Soft undulating ribbon wrap fabric motif */}
        <path 
          d="M2 12C30 8 50 16 80 12C105 8.5 112 15 120 12C128 9 135 15.5 160 12C190 8 210 16 238 12" 
          stroke="currentColor" 
          strokeWidth="1.25" 
          strokeLinecap="round"
          strokeOpacity="0.75"
        />
        {/* Delicate central wrap tie-off loop */}
        <circle cx="120" cy="12" r="2.5" fill="#FAF5EF" stroke="currentColor" strokeWidth="1.25" />
        <path 
          d="M117 14.5C115 18 112 19 110 21M123 14.5C125 18 128 19 130 21" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
      </svg>
    </div>
  );
};
