import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  DemoBadge,
  EmptyMetric,
  LocationFilters,
  PageHeader,
  meta,
} from '@/components/grammausam/common'
import { HistoricalChart } from '@/components/grammausam/charts'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLanguage } from '@/lib/i18n'

export const Route = createFileRoute('/historical')({
  head: () =>
    meta(
      'Historical Analysis',
      'Compare observed and sample AI-downscaled weather trends over time.'
    ),
  component: Historical,
})

function Historical() {
  const { language } = useLanguage()
  const [d, setD] = useState('nashik')
  const [b, setB] = useState('sinnar')
  const [p, setP] = useState('dubera')

  const seasons = [
    {
      name: language === 'mr' ? 'उन्हाळा (Summer)' : 'Summer',
      desc: language === 'mr' ? 'उष्ण आणि कोरडे हवामान' : 'Warmer and typically drier',
    },
    {
      name: language === 'mr' ? 'पावसाळा (Monsoon)' : 'Monsoon',
      desc: language === 'mr' ? 'मुख्य पर्जन्यकाळ आणि शेती हंगाम' : 'Primary rainfall season',
    },
    {
      name: language === 'mr' ? 'हिवाळा (Winter)' : 'Winter',
      desc: language === 'mr' ? 'थंड आणि कमी पावसाचे दिवस' : 'Cooler, lower rainfall',
    },
  ]

  return (
    <>
      <PageHeader
        eyebrow={language === 'mr' ? 'विश्लेषण' : 'Analytics'}
        title={language === 'mr' ? 'ऐतिहासिक हवामान विश्लेषण' : 'Historical Weather Analysis'}
        description={
          language === 'mr'
            ? 'मागील काळातील हवामानाचा अभ्यास आणि प्रत्यक्ष विरुद्ध एआय अंदाजाची तुलना.'
            : 'Explore temporal patterns and prepare observed-versus-predicted evaluation workflows.'
        }
      />
      <div className="page-shell">
        <div className="panel">
          <div className="flex justify-between">
            <h2 className="font-bold">
              {language === 'mr' ? 'विश्लेषण फिल्टर्स' : 'Analysis filters'}
            </h2>
            <DemoBadge />
          </div>
          <div className="mt-5">
            <LocationFilters
              district={d}
              setDistrict={setD}
              block={b}
              setBlock={setB}
              panchayat={p}
              setPanchayat={setP}
            />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <label className="grid gap-1 text-xs font-semibold text-muted-foreground">
              {language === 'mr' ? 'हवामान घटक' : 'WEATHER VARIABLE'}
              <Select defaultValue="temperature">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperature">
                    {language === 'mr' ? 'तापमान (Temperature)' : 'Temperature'}
                  </SelectItem>
                  <SelectItem value="rainfall">
                    {language === 'mr' ? 'पाऊस (Rainfall)' : 'Rainfall'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </label>
            <label className="grid gap-1 text-xs font-semibold text-muted-foreground">
              {language === 'mr' ? 'तारखेपासून (FROM)' : 'FROM'}
              <Input type="date" defaultValue="2025-09-01" />
            </label>
            <label className="grid gap-1 text-xs font-semibold text-muted-foreground">
              {language === 'mr' ? 'तारखेपर्यंत (TO)' : 'TO'}
              <Input type="date" defaultValue="2026-09-01" />
            </label>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="panel">
            <h2 className="font-bold">
              {language === 'mr'
                ? 'ऐतिहासिक तापमान · प्रत्यक्ष विरुद्ध एआय मॉडेल'
                : 'Historical Temperature · Actual vs AI Downscaled'}
            </h2>
            <HistoricalChart />
          </article>
          <article className="panel">
            <h2 className="font-bold">
              {language === 'mr' ? 'ऐतिहासिक पर्जन्यमान · मासिक' : 'Historical Rainfall · Monthly'}
            </h2>
            <HistoricalChart rain />
          </article>
        </div>

        <section className="mt-8">
          <h2 className="section-title">
            {language === 'mr' ? 'हंगामी कल (Seasonal Trends)' : 'Seasonal Trends'}
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {seasons.map((s) => (
              <article className="panel" key={s.name}>
                <span className="eyebrow">{s.name}</span>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                <span className="mt-5 block text-xs font-semibold text-warning-foreground">
                  {language === 'mr' ? 'प्रात्यक्षिक सारांश' : 'Illustrative summary'}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="section-title">
            {language === 'mr' ? 'मॉडेल अचूकता कामगिरी' : 'Model Performance'}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {language === 'mr'
              ? 'प्रत्यक्ष वेधशाळा नोंदी जोडल्यानंतर ही आकडेवारी स्वयंचलितपणे दिसेल.'
              : 'These cards will populate automatically when evaluation results are connected.'}
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {['MAE', 'RMSE', 'R²'].map((x) => (
              <EmptyMetric key={x} name={x} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
