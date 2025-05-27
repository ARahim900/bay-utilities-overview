import React from 'react';
import { MUSCAT_BAY_THEME } from '@/lib/theme';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showText?: boolean;
}

export const MuscatBayLogo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'light', 
  showText = true 
}) => {
  const dimensions = {
    sm: { width: '32px', height: '32px', fontSize: '14px' },
    md: { width: '48px', height: '48px', fontSize: '16px' },
    lg: { width: '64px', height: '64px', fontSize: '20px' },
  };

  const colors = {
    light: {
      primary: MUSCAT_BAY_THEME.colors.primary[500],
      secondary: MUSCAT_BAY_THEME.colors.secondary[500],
      text: 'white',
    },
    dark: {
      primary: MUSCAT_BAY_THEME.colors.primary[500],
      secondary: MUSCAT_BAY_THEME.colors.secondary[500],
      text: MUSCAT_BAY_THEME.colors.gray[900],
    },
  };

  const theme = colors[variant];
  const { width, height, fontSize } = dimensions[size];

  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon */}
      <div 
        className="relative overflow-hidden rounded-xl shadow-md"
        style={{ 
          width, 
          height, 
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)` 
        }}
      >
        {/* MB Text */}
        <div 
          className="absolute inset-0 flex items-center justify-center font-bold text-white"
          style={{ fontSize }}
        >
          MB
        </div>
        
        {/* Decorative Elements */}
        <div 
          className="absolute bottom-0 left-0 w-2 h-full opacity-80"
          style={{ backgroundColor: theme.secondary }}
        />
        <div 
          className="absolute bottom-0 right-0 w-3 h-3 opacity-60"
          style={{ 
            backgroundColor: 'white',
            clipPath: 'polygon(100% 0, 0 100%, 100% 100%)'
          }}
        />
      </div>
      
      {/* Text */}
      {showText && (
        <div>
          <h1 
            className="font-bold leading-tight"
            style={{ 
              color: theme.text,
              fontSize: size === 'lg' ? '1.5rem' : size === 'md' ? '1.25rem' : '1rem'
            }}
          >
            Muscat Bay
          </h1>
          <p 
            className="text-sm opacity-80"
            style={{ color: theme.text }}
          >
            Integrated Systems
          </p>
        </div>
      )}
    </div>
  );
};
