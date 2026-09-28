import React from 'react'

interface VatavaranIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}

/**
 * Official VataVaran Emblem Icon
 * Represents AI-downscaled Panchayat climate intelligence:
 * Atmosphere (Vata), Solar radiation, Cloud dynamics, Rainfall precision, and Agricultural vitality.
 */
export function VatavaranIcon({ size = 36, className = '', ...props }: VatavaranIconProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="VataVaran Logo"
      {...props}
    >
      <defs>
        <linearGradient id="v-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="48%" stopColor="#1E40AF" />
          <stop offset="90%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <radialGradient id="v-sun" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
        <linearGradient id="v-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F0F9FF" />
          <stop offset="100%" stopColor="#BAE6FD" />
        </linearGradient>
        <linearGradient id="v-drop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="v-sprout" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <filter id="v-shadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodOpacity="0.28" floodColor="#0f172a" />
        </filter>
      </defs>

      {/* Squircle Tile */}
      <rect width="128" height="128" rx="28" fill="url(#v-bg)" />
      <rect
        x="1.5"
        y="1.5"
        width="125"
        height="125"
        rx="26.5"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1.5"
      />

      {/* Atmospheric Wave Rings (Climate & Air Circulation) */}
      <circle
        cx="64"
        cy="64"
        r="54"
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      <circle
        cx="64"
        cy="64"
        r="42"
        fill="none"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth="1.2"
      />

      {/* Radiant Golden Sun */}
      <circle cx="78" cy="46" r="21" fill="url(#v-sun)" filter="url(#v-shadow)" />
      <path
        d="M78 18 L78 22 M98 26 L95 29 M106 46 L102 46 M98 66 L95 63"
        stroke="#FDE68A"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Atmospheric Streamlines (Vata - Wind flow) */}
      <path
        d="M20 64 C 36 64, 42 60, 56 60 C 66 60, 72 64, 88 64"
        fill="none"
        stroke="#7DD3FC"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M16 73 C 30 73, 38 69, 50 69 C 64 69, 72 73, 94 73"
        fill="none"
        stroke="#6EE7B7"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Weather Cloud */}
      <path
        d="M42 86 L84 86 C92.8 86 100 78.8 100 70 C100 61.8 93.9 55.1 86 54.2 C84.8 42.6 74.8 34 63 34 C52.2 34 43 41.2 40.5 51.5 C32.5 52.8 26 59.8 26 68.5 C26 78.1 33.2 86 42 86 Z"
        fill="url(#v-cloud)"
        filter="url(#v-shadow)"
      />

      {/* Rainfall Precision Drop */}
      <path
        d="M48 94 C48 94 43 102 43 105 C43 107.8 45.2 110 48 110 C50.8 110 53 107.8 53 105 C53 102 48 94 48 94 Z"
        fill="url(#v-drop)"
      />

      {/* Panchayat Agricultural Leaf */}
      <path
        d="M72 108 C72 99 82 95 86 93 C86 99 81 107 72 108 Z"
        fill="url(#v-sprout)"
      />
      <path
        d="M72 108 C68 102 69 98 71 96"
        fill="none"
        stroke="#A7F3D0"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * Full VataVaran Brand Logo with Typography
 */
export function VatavaranLogo({
  iconSize = 36,
  showSubtitle = false,
  className = '',
}: {
  iconSize?: number | string
  showSubtitle?: boolean
  className?: string
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <VatavaranIcon size={iconSize} className="shadow-sm transition-transform hover:scale-105" />
      <div className="flex flex-col leading-none">
        <span className="text-xl font-bold tracking-tight text-foreground">
          Vata<span className="text-primary">Varan</span>
        </span>
        {showSubtitle && (
          <span className="mt-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            Panchayat Intelligence
          </span>
        )}
      </div>
    </div>
  )
}
