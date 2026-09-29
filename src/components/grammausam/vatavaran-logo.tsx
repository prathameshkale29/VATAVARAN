import React from 'react'

interface VatavaranIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number | string
  className?: string
}

/**
 * Official VataVaran Emblem Icon — uses the real VATAVARAN brand logo.
 * Displays the emblem portion (globe + satellite + crops + weather).
 */
export function VatavaranIcon({ size = 36, className = '', style, ...props }: VatavaranIconProps) {
  return (
    <img
      src="/vatavaran-emblem-transparent.png"
      alt="VataVaran Logo"
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      style={{ width: size, height: size, ...style }}
      {...props}
    />
  )
}

/**
 * Full VataVaran Brand Logo — shows the complete logo with the "VATAVARAN" text.
 */
export function VatavaranLogo({
  iconSize = 36,
  showSubtitle = false,
  showFullLogo = false,
  className = '',
}: {
  iconSize?: number | string
  showSubtitle?: boolean
  showFullLogo?: boolean
  className?: string
}) {
  if (showFullLogo) {
    // Show the full logo image (emblem + VATAVARAN text as one image)
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src="/vatavaran-logo-transparent.png"
          alt="VATAVARAN"
          style={{ height: iconSize, width: 'auto' }}
          className="object-contain shrink-0"
        />
      </div>
    )
  }

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
