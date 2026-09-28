import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { CloudRain, Sun, CloudSun, Droplets, Wind, ArrowDown } from 'lucide-react'
import { DemoBadge, LocationFilters, PageHeader, meta } from '@/components/grammausam/common'
import { forecast, panchayats, blocks, districts } from '@/data/mock-weather'
import { TemperatureChart, RainChart, HumidityChart } from '@/components/grammausam/charts'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/i18n'

export const Route = createFileRoute('/forecast')({
  head: () =>
    meta(
      'Panchayat Forecast',
      'Detailed seven-day sample weather outlook for a selected Panchayat.'
    ),
  component: ForecastPage,
})

function ForecastPage() {
  const { t, getPlaceName, language } = useLanguage()
  const [d, setD] = useState('nashik')
  const [b, setB] = useState('sinnar')
  const [p, setP] = useState('dubera')

  const f = forecast[0] ?? {
    date: '',
    rainfall: 0,
    maxTemp: 0,
    minTemp: 0,
    humidity: 0,
    wind: 0,
  }

  const place = panchayats.find((x) => x.id === p)
  const currentBlock = blocks.find((x) => x.id === b)
  const currentDistrict = districts.find((x) => x.id === d)

  const vals = [
    [CloudRain, t('metric.rainfall', 'Rainfall'), `${f.rainfall} ${language === 'mr' ? 'मिमी' : 'mm'}`],
    [Sun, language === 'mr' ? 'कमाल तापमान' : 'Maximum Temperature', `${f.maxTemp} °C`],
    [CloudSun, language === 'mr' ? 'किमान तापमान' : 'Minimum Temperature', `${f.minTemp} °C`],
    [Droplets, t('metric.humidity', 'Relative Humidity'), `${f.humidity} %`],
    [Wind, t('metric.windSpeed', 'Wind Speed'), `${f.wind} ${language === 'mr' ? 'किमी/तास' : 'km/h'}`],
  ] as const

  return (
    <>
      <PageHeader
        eyebrow={language === 'mr' ? 'हवामान अंदाज' : 'Forecast'}
        title={language === 'mr' ? 'ग्रामपंचायत हवामान अंदाज' : 'Panchayat Weather Forecast'}
        description={
          language === 'mr'
            ? 'तालुका पातळीवरील अंदाज आणि स्थानिक भौगोलिक माहिती एकत्रित करून तयार केलेला सूक्ष्म हवामान अंदाज.'
            : 'A localized outlook combining block forecasts with spatial and environmental context.'
        }
      />
      <div className="page-shell">
        <div className="panel">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-bold">
              {language === 'mr' ? 'स्थान आणि तारीख निवडा' : 'Location & date'}
            </h2>
            <DemoBadge label={language === 'mr' ? 'नमुना अंदाज' : 'Sample forecast'} />
          </div>
          <div className="mt-5">
            <LocationFilters
              district={d}
              setDistrict={setD}
              block={b}
              setBlock={setB}
              panchayat={p}
              setPanchayat={setP}
              extras={
                <label className="grid gap-1.5 text-xs font-semibold text-muted-foreground">
                  {language === 'mr' ? 'तारीख' : 'DATE'}
                  <Input type="date" defaultValue="2026-09-22" className="h-10" />
                </label>
              }
            />
          </div>
        </div>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {vals.map(([Icon, n, v]) => (
            <article className="metric-card" key={n}>
              <Icon className="size-5 text-primary" />
              <p className="mt-4 text-xs text-muted-foreground">{n}</p>
              <strong className="mt-1 block text-2xl">{v}</strong>
              <span className="mt-3 block text-xs font-semibold text-warning-foreground">
                {language === 'mr' ? 'नमुना आकडेवारी' : 'Sample Data'}
              </span>
            </article>
          ))}
        </section>

        <div className="mt-6 rounded-lg bg-primary p-5 text-primary-foreground">
          <p className="text-xs opacity-70">
            {language === 'mr' ? 'निवडलेली ग्रामपंचायत' : 'SELECTED PANCHAYAT'}
          </p>
          <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-bold">
              {getPlaceName(place?.name ?? '')} · {getPlaceName(currentBlock?.name ?? '')} ·{' '}
              {getPlaceName(currentDistrict?.name ?? '')}
            </h2>
            <span className="text-sm opacity-80">
              {language === 'mr' ? 'अंदाज तारीख · २२ सप्टेंबर २०२६' : 'Forecast date · 22 September 2026'}
            </span>
          </div>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="panel">
            <h2 className="font-bold">
              {language === 'mr' ? '७ दिवसांचा तापमान अंदाज' : '7-Day Temperature Forecast'}
            </h2>
            <TemperatureChart />
          </article>
          <article className="panel">
            <h2 className="font-bold">
              {language === 'mr' ? 'पावसाचा अंदाज (मिमी)' : 'Rainfall Forecast'}
            </h2>
            <RainChart />
          </article>
          <article className="panel lg:col-span-2">
            <h2 className="font-bold">
              {language === 'mr' ? 'आर्द्रता अंदाज (%)' : 'Humidity Forecast'}
            </h2>
            <HumidityChart />
          </article>
        </section>

        <section className="mt-10 rounded-lg border bg-surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow">{language === 'mr' ? 'अंदाज प्रक्रिया' : 'Prediction path'}</p>
              <h2 className="section-title mt-1">
                {language === 'mr' ? 'एआय डाउनस्केल्ड अंदाज' : 'AI Downscaled Forecast'}
              </h2>
            </div>
            <DemoBadge />
          </div>
          <div className="mt-6 grid items-center gap-3 text-center md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="pipeline-step">
              {language === 'mr' ? 'तालुका पातळीवरील इनपुट' : 'Block-level input'}
            </div>
            <ArrowDown className="mx-auto md:-rotate-90" />
            <div className="pipeline-step border-primary/30 bg-accent">
              {language === 'mr' ? 'एआय मॉडेल (AI Model)' : 'AI model'}
            </div>
            <ArrowDown className="mx-auto md:-rotate-90" />
            <div className="pipeline-step">
              {language === 'mr' ? 'ग्रामपंचायत पातळीवरील अंदाज' : 'Panchayat-level output'}
            </div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            <b>{language === 'mr' ? 'अनिश्चितता:' : 'Uncertainty:'}</b>{' '}
            {language === 'mr'
              ? 'मॉडेल कॅलिब्रेशन आणि मूल्यांकनानंतर उपलब्ध होईल.'
              : 'Available after model calibration'}
          </p>
        </section>
      </div>
    </>
  )
}
