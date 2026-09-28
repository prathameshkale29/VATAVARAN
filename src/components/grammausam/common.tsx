import React from 'react'
import { ChevronRight, Info, Database, LoaderCircle } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { blocks, districts, panchayats } from '@/data/mock-weather'
import { useLanguage } from '@/lib/i18n'

export function DemoBadge({ label }: { label?: string }) {
  const { t } = useLanguage()
  const displayLabel = label ?? t('common.demoBadge', 'Demo Data')
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning-soft px-2.5 py-1 text-xs font-semibold text-warning-foreground">
      <Database className="size-3" />
      {displayLabel}
    </span>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  const { t } = useLanguage()
  return (
    <div className="border-b bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
          <Link to="/">{t('nav.home', 'Home')}</Link>
          <ChevronRight className="size-3" />
          <span className="text-primary">{eyebrow}</span>
        </div>
        <h1 className="max-w-4xl text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export function TechTip({ label, tip }: { label: string; tip: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex cursor-help items-center gap-1 border-b border-dashed border-muted-foreground">
            {label}
            <Info className="size-3" />
          </span>
        </TooltipTrigger>
        <TooltipContent>{tip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function LocationFilters({
  district,
  setDistrict,
  block,
  setBlock,
  panchayat,
  setPanchayat,
  extras,
}: {
  district: string
  setDistrict: (v: string) => void
  block: string
  setBlock: (v: string) => void
  panchayat: string
  setPanchayat: (v: string) => void
  extras?: React.ReactNode
}) {
  const { t, getPlaceName } = useLanguage()
  const bs = blocks.filter((x) => x.districtId === district)
  const ps = panchayats.filter((x) => x.blockId === block)

  const S = ({
    label,
    value,
    onChange,
    items,
  }: {
    label: string
    value: string
    onChange: (v: string) => void
    items: { id: string; name: string }[]
  }) => (
    <label className="grid gap-1.5 text-xs font-semibold text-muted-foreground">
      {label}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-10 bg-background">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((x) => (
            <SelectItem key={x.id} value={x.id}>
              {getPlaceName(x.name)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  )

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <S
        label={t('weather.district', 'DISTRICT').toUpperCase()}
        value={district}
        onChange={(v) => {
          setDistrict(v)
          const b = blocks.find((x) => x.districtId === v)
          if (b) {
            setBlock(b.id)
            const p = panchayats.find((x) => x.blockId === b.id)
            if (p) setPanchayat(p.id)
          }
        }}
        items={districts}
      />
      <S
        label={t('weather.block', 'BLOCK').toUpperCase()}
        value={block}
        onChange={(v) => {
          setBlock(v)
          const p = panchayats.find((x) => x.blockId === v)
          if (p) setPanchayat(p.id)
        }}
        items={bs}
      />
      <S
        label={t('weather.panchayat', 'PANCHAYAT').toUpperCase()}
        value={panchayat}
        onChange={setPanchayat}
        items={ps}
      />
      {extras}
    </div>
  )
}

export function EmptyMetric({ name }: { name: string }) {
  const { language } = useLanguage()
  return (
    <div className="metric-card">
      <span className="text-sm text-muted-foreground">{name}</span>
      <strong className="mt-2 block text-lg">
        {language === 'mr' ? 'मूल्यांकनाची प्रतीक्षा' : 'Awaiting evaluation'}
      </strong>
      <span className="mt-1 block text-xs text-muted-foreground">
        {language === 'mr'
          ? 'मॉडेल जोडल्यानंतर येथे निष्कर्ष दिसतील.'
          : 'Connected model results will appear here.'}
      </span>
    </div>
  )
}

export function LoadingState() {
  const { t } = useLanguage()
  return (
    <div className="flex min-h-48 items-center justify-center gap-2 text-muted-foreground">
      <LoaderCircle className="size-5 animate-spin" />
      {t('common.loading', 'Loading weather data…')}
    </div>
  )
}

export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} — VataVaran` },
    { name: 'description', content: description },
    { property: 'og:title', content: `${title} — VataVaran` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
