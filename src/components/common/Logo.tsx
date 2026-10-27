import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

/**
 * Subtle, formal geometric athletic mark for KinetiQ.
 * Features a disciplined vertical anchor pillar, aerodynamic kinetic dual blades,
 * and a subtle high-tech cyan pulse node.
 */
export const KinetiQMark: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Vertical anchor pillar */}
    <rect x="4" y="4" width="3.5" height="20" rx="1.75" fill="currentColor" />
    
    {/* Upper aerodynamic kinetic wing */}
    <path
      d="M10.5 13.5L19.2 4.8C19.8 4.2 20.8 4.2 21.4 4.8C22.0 5.4 22.0 6.4 21.4 7.0L13.8 14.6L10.5 13.5Z"
      fill="currentColor"
    />
    
    {/* Lower aerodynamic kinetic wing */}
    <path
      d="M12.2 13.0L21.4 22.2C22.0 22.8 22.0 23.8 21.4 24.4C20.8 25.0 19.8 25.0 19.2 24.4L9.5 14.7L12.2 13.0Z"
      fill="currentColor"
      fillOpacity="0.88"
    />
    
    {/* Subtle biometric / kinetic pulse accent */}
    <circle cx="11.5" cy="14" r="1.5" fill="#38BDF8" />
  </svg>
);

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  textClassName = '',
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Formal, subtle badge container */}
      <div
        className={`${sizeClasses[size]} bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shadow-sm border border-slate-800 dark:border-slate-700/80 transition-all shrink-0`}
      >
        <KinetiQMark className={iconSizes[size]} />
      </div>

      {showText && (
        <div className="truncate">
          <h1
            className={`text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 truncate ${textClassName}`}
          >
            KinetiQ
          </h1>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">
            Sports & Fitness
          </p>
        </div>
      )}
    </div>
  );
};

