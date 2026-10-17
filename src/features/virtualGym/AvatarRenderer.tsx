import React from 'react';
import { AvatarCustomization } from '../../types/virtualGym';

interface AvatarRendererProps {
  customization: AvatarCustomization;
  heightCm: number;
  weightKg: number;
  level: number;
  isAnimated?: boolean;
}

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({
  customization,
  heightCm,
  weightKg,
  level,
  isAnimated = true,
}) => {
  // Calculate BMI to dynamically adjust body dimensions
  const heightM = Math.max(1.2, heightCm / 100);
  const bmi = weightKg / (heightM * heightM);

  // Dynamic dimension scaling based on BMI (clamped for aesthetics)
  // Normal BMI: 18.5 - 24.9. Lower = leaner, Higher = broader/more muscular
  const bmiFactor = Math.min(Math.max((bmi - 18.5) / 12, -0.35), 0.75);

  const shoulderWidth = 60 + bmiFactor * 26 + (customization.bodyFrame === 'masculine' || customization.bodyFrame === 'heroic' ? 8 : 0);
  const waistWidth = 36 + bmiFactor * 16 - (customization.bodyFrame === 'feminine' ? 6 : 0);
  const chestWidth = 54 + bmiFactor * 22;
  const armThickness = 12 + bmiFactor * 7;
  const legThickness = 15 + bmiFactor * 8;

  // Outfit color palettes
  const outfitThemes: Record<string, { primary: string; secondary: string; accent: string; belt: string }> = {
    cyber: { primary: '#06B6D4', secondary: '#0F172A', accent: '#F43F5E', belt: '#0284C7' },
    stealth: { primary: '#334155', secondary: '#0F172A', accent: '#EF4444', belt: '#475569' },
    crimson: { primary: '#E11D48', secondary: '#881337', accent: '#FBBF24', belt: '#9F1239' },
    gold: { primary: '#F59E0B', secondary: '#1E1B4B', accent: '#FCD34D', belt: '#B45309' },
    neon: { primary: '#10B981', secondary: '#064E3B', accent: '#A7F3D0', belt: '#047857' },
  };

  const theme = outfitThemes[customization.gearOutfit] || outfitThemes.cyber;

  // Skin tones
  const skinColor = customization.skinTone || '#E2A781';

  // Hair style geometry
  const renderHair = () => {
    switch (customization.hairStyle) {
      case 'spiky':
        return (
          <path
            d="M 85 45 Q 80 25 90 20 Q 100 30 105 18 Q 112 28 120 22 Q 124 35 115 45 Z"
            fill={customization.hairColor}
          />
        );
      case 'long':
        return (
          <path
            d="M 82 45 C 80 25 120 25 118 45 C 126 65 122 90 116 100 C 114 90 114 70 114 55 C 86 55 86 90 84 100 C 78 90 74 65 82 45 Z"
            fill={customization.hairColor}
          />
        );
      case 'bun':
        return (
          <g>
            <circle cx="100" cy="22" r="12" fill={customization.hairColor} />
            <path d="M 85 45 C 85 28 115 28 115 45 Z" fill={customization.hairColor} />
          </g>
        );
      case 'headband':
        return (
          <g>
            <path d="M 85 45 C 85 28 115 28 115 45 Z" fill={customization.hairColor} />
            <rect x="83" y="38" width="34" height="7" rx="3" fill={theme.accent} />
          </g>
        );
      case 'buzz':
      default:
        return (
          <path
            d="M 86 44 C 86 30 114 30 114 44 Z"
            fill={customization.hairColor}
          />
        );
    }
  };

  const isFlexing = customization.pose === 'flex';
  const isLifting = customization.pose === 'lift';

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-[280px] sm:max-w-[340px] mx-auto">
      {/* Background Stage Halo / Holographic Ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-64 h-64 rounded-full blur-2xl transition-all duration-700 ${
          customization.hasGlowingAura
            ? 'bg-gradient-to-tr from-purple-500/30 via-indigo-500/30 to-amber-500/30 scale-110 animate-pulse'
            : 'bg-indigo-500/10'
        }`} />
      </div>

      {/* SVG Procedural Vector Avatar */}
      <svg
        viewBox="0 0 200 280"
        className={`w-full h-auto drop-shadow-2xl transition-transform duration-300 ${
          isAnimated ? 'hover:scale-105' : ''
        }`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glowing Aura Gradient */}
          <radialGradient id="auraGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={theme.accent} stopOpacity="0.8" />
            <stop offset="50%" stopColor={theme.primary} stopOpacity="0.4" />
            <stop offset="100%" stopColor={theme.primary} stopOpacity="0" />
          </radialGradient>

          {/* Armor Shading Gradient */}
          <linearGradient id="bodySuitGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={theme.primary} />
            <stop offset="100%" stopColor={theme.secondary} />
          </linearGradient>

          {/* Muscle Highlight Gradient */}
          <linearGradient id="muscleShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
          </linearGradient>

          {/* Barbell Steel */}
          <linearGradient id="chromeSteel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* 1. Unlocked Mythic Aura (if enabled or level >= 3) */}
        {(customization.hasGlowingAura || level >= 3) && (
          <g className="animate-pulse">
            <circle cx="100" cy="140" r="95" fill="url(#auraGlow)" />
            {/* Sparkle energy motes */}
            <circle cx="45" cy="90" r="2.5" fill="#FDE047" className="animate-ping" />
            <circle cx="155" cy="85" r="3" fill="#67E8F9" className="animate-ping" style={{ animationDelay: '0.4s' }} />
            <circle cx="160" cy="180" r="2" fill="#F43F5E" className="animate-ping" style={{ animationDelay: '0.8s' }} />
            <circle cx="38" cy="190" r="2.5" fill="#A855F7" className="animate-ping" style={{ animationDelay: '1.2s' }} />
          </g>
        )}

        {/* 2. Character Shadow / Floor Disc */}
        <ellipse cx="100" cy="265" rx={55 + bmiFactor * 12} ry="10" fill="#000000" opacity="0.25" />

        {/* 3. Barbell in Background if Lifting */}
        {isLifting && (
          <g>
            <rect x="25" y="70" width="150" height="6" rx="3" fill="url(#chromeSteel)" />
            {/* Left Plates */}
            <rect x="18" y="50" width="8" height="46" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1" />
            <rect x="26" y="55" width="6" height="36" rx="2" fill="#DC2626" />
            {/* Right Plates */}
            <rect x="174" y="50" width="8" height="46" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1" />
            <rect x="168" y="55" width="6" height="36" rx="2" fill="#DC2626" />
          </g>
        )}

        {/* 4. Legs */}
        <g id="legs">
          {/* Left Leg */}
          <rect
            x={100 - waistWidth / 2 + 2}
            y="170"
            width={legThickness}
            height="75"
            rx={legThickness / 2}
            fill={theme.secondary}
          />
          {/* Left Sneaker */}
          <path
            d={`M ${100 - waistWidth / 2} 242 L ${100 - waistWidth / 2 - 8} 258 L ${100 - waistWidth / 2 + legThickness + 2} 258 L ${100 - waistWidth / 2 + legThickness} 242 Z`}
            fill={theme.accent}
          />
          {/* Right Leg */}
          <rect
            x={100 + waistWidth / 2 - legThickness - 2}
            y="170"
            width={legThickness}
            height="75"
            rx={legThickness / 2}
            fill={theme.secondary}
          />
          {/* Right Sneaker */}
          <path
            d={`M ${100 + waistWidth / 2 - legThickness} 242 L ${100 + waistWidth / 2 - legThickness - 2} 258 L ${100 + waistWidth / 2 + 8} 258 L ${100 + waistWidth / 2} 242 Z`}
            fill={theme.accent}
          />
        </g>

        {/* 5. Torso / Chest / Core */}
        <g id="torso">
          {/* Main Upper Torso Polygon */}
          <path
            d={`
              M ${100 - shoulderWidth / 2} 80
              Q ${100 - chestWidth / 2} 115 ${100 - waistWidth / 2} 165
              L ${100 + waistWidth / 2} 165
              Q ${100 + chestWidth / 2} 115 ${100 + shoulderWidth / 2} 80
              Z
            `}
            fill="url(#bodySuitGrad)"
          />

          {/* Chest Muscle Definition Lines */}
          <path
            d={`
              M ${100 - chestWidth / 3} 105
              Q 100 115 ${100 + chestWidth / 3} 105
            `}
            fill="none"
            stroke="url(#muscleShade)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="100"
            y1="88"
            x2="100"
            y2="135"
            stroke="url(#muscleShade)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Six-pack Abs Indicator (Scales with fitness) */}
          <g opacity={bmi <= 26 ? '0.4' : '0.2'}>
            <rect x="94" y="122" width="5" height="7" rx="1.5" fill="#FFFFFF" />
            <rect x="101" y="122" width="5" height="7" rx="1.5" fill="#FFFFFF" />
            <rect x="94" y="132" width="5" height="7" rx="1.5" fill="#FFFFFF" />
            <rect x="101" y="132" width="5" height="7" rx="1.5" fill="#FFFFFF" />
            <rect x="94" y="142" width="5" height="7" rx="1.5" fill="#FFFFFF" />
            <rect x="101" y="142" width="5" height="7" rx="1.5" fill="#FFFFFF" />
          </g>

          {/* Power Lifting Belt (if enabled) */}
          {customization.hasLiftingBelt && (
            <g>
              <rect
                x={100 - waistWidth / 2 - 2}
                y="150"
                width={waistWidth + 4}
                height="14"
                rx="3"
                fill={theme.belt}
                stroke="#1E293B"
                strokeWidth="1.5"
              />
              <rect x="95" y="152" width="10" height="10" rx="2" fill="#F8FAFC" stroke="#334155" strokeWidth="1" />
            </g>
          )}
        </g>

        {/* 6. Arms & Shoulders */}
        <g id="arms">
          {/* Shoulders Deltoid Caps */}
          <circle cx={100 - shoulderWidth / 2 + 4} cy="86" r={armThickness + 2} fill={skinColor} />
          <circle cx={100 + shoulderWidth / 2 - 4} cy="86" r={armThickness + 2} fill={skinColor} />

          {/* Pose-dependent Arms */}
          {isFlexing ? (
            /* Flexing Bicep Pose */
            <g>
              {/* Left Flexed Arm */}
              <path
                d={`M ${100 - shoulderWidth / 2} 88 Q ${100 - shoulderWidth / 2 - 24} 95 ${100 - shoulderWidth / 2 - 18} 65 Q ${100 - shoulderWidth / 2 - 8} 52 ${100 - shoulderWidth / 2 - 4} 65 Z`}
                fill={skinColor}
              />
              {/* Left Bicep Bulge */}
              <ellipse cx={100 - shoulderWidth / 2 - 14} cy="72" rx={armThickness * 0.9} ry={armThickness * 1.1} fill={skinColor} />
              {/* Left Fist */}
              <circle cx={100 - shoulderWidth / 2 - 6} cy="56" r="8" fill={skinColor} />

              {/* Right Flexed Arm */}
              <path
                d={`M ${100 + shoulderWidth / 2} 88 Q ${100 + shoulderWidth / 2 + 24} 95 ${100 + shoulderWidth / 2 + 18} 65 Q ${100 + shoulderWidth / 2 + 8} 52 ${100 + shoulderWidth / 2 + 4} 65 Z`}
                fill={skinColor}
              />
              {/* Right Bicep Bulge */}
              <ellipse cx={100 + shoulderWidth / 2 + 14} cy="72" rx={armThickness * 0.9} ry={armThickness * 1.1} fill={skinColor} />
              {/* Right Fist */}
              <circle cx={100 + shoulderWidth / 2 + 6} cy="56" r="8" fill={skinColor} />
            </g>
          ) : isLifting ? (
            /* Overhead / Barbell Holding Pose */
            <g>
              {/* Left Arm gripping bar */}
              <path
                d={`M ${100 - shoulderWidth / 2} 86 L 55 72`}
                stroke={skinColor}
                strokeWidth={armThickness * 1.8}
                strokeLinecap="round"
              />
              <circle cx="55" cy="72" r="8" fill={customization.hasWristWraps ? theme.accent : skinColor} />

              {/* Right Arm gripping bar */}
              <path
                d={`M ${100 + shoulderWidth / 2} 86 L 145 72`}
                stroke={skinColor}
                strokeWidth={armThickness * 1.8}
                strokeLinecap="round"
              />
              <circle cx="145" cy="72" r="8" fill={customization.hasWristWraps ? theme.accent : skinColor} />
            </g>
          ) : (
            /* Confident Standing Arms */
            <g>
              {/* Left Arm */}
              <path
                d={`M ${100 - shoulderWidth / 2 + 2} 86 Q ${100 - shoulderWidth / 2 - 8} 125 ${100 - shoulderWidth / 2 - 4} 155`}
                stroke={skinColor}
                strokeWidth={armThickness * 1.8}
                strokeLinecap="round"
              />
              {/* Left Wrist Wrap */}
              {customization.hasWristWraps && (
                <rect x={100 - shoulderWidth / 2 - 10} y="142" width="12" height="6" rx="2" fill={theme.accent} />
              )}
              {/* Left Fist */}
              <circle cx={100 - shoulderWidth / 2 - 4} cy="158" r="7.5" fill={skinColor} />

              {/* Right Arm */}
              <path
                d={`M ${100 + shoulderWidth / 2 - 2} 86 Q ${100 + shoulderWidth / 2 + 8} 125 ${100 + shoulderWidth / 2 + 4} 155`}
                stroke={skinColor}
                strokeWidth={armThickness * 1.8}
                strokeLinecap="round"
              />
              {/* Right Wrist Wrap */}
              {customization.hasWristWraps && (
                <rect x={100 + shoulderWidth / 2 - 2} y="142" width="12" height="6" rx="2" fill={theme.accent} />
              )}
              {/* Right Fist */}
              <circle cx={100 + shoulderWidth / 2 + 4} cy="158" r="7.5" fill={skinColor} />
            </g>
          )}
        </g>

        {/* 7. Neck & Head */}
        <g id="head">
          {/* Muscular Neck */}
          <rect x="91" y="65" width="18" height="20" rx="4" fill={skinColor} />

          {/* Head Base */}
          <ellipse cx="100" cy="50" rx="16" ry="19" fill={skinColor} />

          {/* Eyes & Fierce Expression */}
          <ellipse cx="94" cy="50" rx="2" ry="2" fill="#0F172A" />
          <ellipse cx="106" cy="50" rx="2" ry="2" fill="#0F172A" />
          {/* Eyebrows */}
          <path d="M 91 45 L 97 47" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M 103 47 L 109 45" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          {/* Confident Smirk */}
          <path d="M 97 59 Q 100 62 104 60" fill="none" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />

          {/* Hair Layer */}
          {renderHair()}
        </g>
      </svg>

      {/* Floating Level & Archetype Banner */}
      <div className="mt-3 flex items-center gap-2">
        <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs rounded-full shadow-md tracking-wider uppercase flex items-center gap-1">
          <span>⚡ LVL {level}</span>
        </span>
        <span className="px-2.5 py-1 bg-slate-900/80 dark:bg-white/10 text-slate-200 dark:text-slate-100 font-extrabold text-xs rounded-full border border-slate-700/60 backdrop-blur-sm tracking-wide capitalize">
          {customization.archetype} {customization.bodyFrame}
        </span>
      </div>
    </div>
  );
};
