'use client';

import { useTheme } from '@/context/ThemeContext';

interface GroovifyLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function GroovifyLogo({ width = 200, height = 150, className = '' }: GroovifyLogoProps) {
  const { theme } = useTheme();
  
  // Define colors based on theme
  const playButtonColor = theme === 'dark' ? 'white' : '#191414';
  
  return (
    <div 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 160 120"
        width={width} 
        height={height}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Play button - perfectly centered */}
        <polygon 
          points="65,25 125,60 65,95" 
          fill={playButtonColor}
        />
        
        {/* Sound waves left - balanced from center */}
        <rect x="20" y="45" width="8" height="30" fill="#FF73FA" rx="4" ry="4" />
        <rect x="36" y="35" width="8" height="50" fill="#7B61FF" rx="4" ry="4" />
        
        {/* Sound waves right - balanced from center */}
        <rect x="132" y="45" width="8" height="30" fill="#73DDFF" rx="4" ry="4" />
        <rect x="148" y="35" width="8" height="50" fill="#FF8B59" rx="4" ry="4" />
      </svg>
    </div>
  );
}
