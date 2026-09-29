import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { CloudRain, ThermometerSun, Wind, TriangleAlert, ShieldAlert } from 'lucide-react'
import { alerts } from '@/data/mock-weather'
import { DemoBadge, LocationFilters, PageHeader, meta } from '@/components/grammausam/common'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/i18n'

export const Route = createFileRoute('/alerts')({
  head: () =>
    meta(
      'Weather Alerts',
      'Demonstration alert monitoring for localized weather thresholds.'
    ),
  component: Alerts,
})

function Alerts() {
  const { getPlaceName, language } = useLanguage()
  const [d, setD] = useState('nashik')
  const [b, setB] = useState('sinnar')
  const [p, setP] = useState('dubera')
  const icons = [CloudRain, ThermometerSun, Wind]

  const alertTypes = [
    { id: 'all', en: 'All Alerts', mr: 'सर्व इशारे' },
    { id: 'heavy-rainfall', en: 'Heavy Rainfall', mr: 'मुसळधार पाऊस' },
    { id: 'high-temperature', en: 'High Temperature', mr: 'उच्च तापमान' },
    { id: 'strong-wind', en: 'Strong Wind', mr: 'वेगवान वारे' },
    { id: 'high-humidity', en: 'High Humidity', mr: 'जास्त आर्द्रता' },
    { id: 'extreme-weather', en: 'Extreme Weather', mr: 'अति-गंभीर हवामान' },
  ]

  return (
    <>
      <PageHeader
        eyebrow={language === 'mr' ? 'हवामान निरीक्षण' : 'Monitoring'}
        title={language === 'mr' ? 'हवामान इशारे व पूर्वसूचना' : 'Weather Alerts'}
        description={
          language === 'mr'
            ? 'स्थानिक हवामान मर्यादांवर आधारित भविष्यातील प्रमाणित ग्रामपंचायत हवामान इशाऱ्यांचे प्रात्यक्षिक.'
            : 'A demonstration view for future validated, threshold-based Panchayat weather advisories.'
        }
      />
      <div className="page-shell">
        <div className="rounded-lg border border-warning/30 bg-warning-soft p-4 text-sm text-warning-foreground">
          <div className="flex gap-3">
            <ShieldAlert className="mt-0.5 size-5 shrink-0" />
            <p>
              <b>{language === 'mr' ? 'केवळ प्रात्यक्षिकासाठी:' : 'Demonstration only.'}</b>{' '}
              {language === 'mr'
                ? 'प्रमाणित हवामान माहिती आणि निश्चित मर्यादांशी जोडल्यानंतर हे इशारे प्रत्यक्ष कार्यान्वित होतील.'
                : 'Alerts become operational only when connected to validated forecast data and defined thresholds.'}
            </p>
          </div>
        </div>

        <div className="panel mt-6">
          <LocationFilters
            district={d}
            setDistrict={setD}
            block={b}
            setBlock={setB}
            panchayat={p}
            setPanchayat={setP}
          />
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-xs font-semibold text-muted-foreground">
              {language === 'mr' ? 'इशाऱ्याचा प्रकार' : 'ALERT TYPE'}
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {alertTypes.map((x) => (
                    <SelectItem value={x.id} key={x.id}>
                      {language === 'mr' ? x.mr : x.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
            <label className="grid gap-1 text-xs font-semibold text-muted-foreground">
              {language === 'mr' ? 'तारीख' : 'DATE'}
              <Input type="date" defaultValue="2026-09-22" />
            </label>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {alerts.map((a, i) => {
            const Icon = icons[i] ?? TriangleAlert
            return (
              <article className="panel" key={a.id}>
                <div className="flex justify-between">
                  <span className="grid size-10 place-items-center rounded-md bg-warning-soft text-warning-foreground">
                    <Icon />
                  </span>
                  <DemoBadge label={language === 'mr' ? 'नमुना इशारा' : 'Sample alert'} />
                </div>
                <h2 className="mt-5 text-lg font-bold">
                  {language === 'mr'
                    ? a.type === 'Rainfall'
                      ? 'पाऊस इशारा'
                      : a.type === 'Temperature'
                        ? 'तापमान इशारा'
                        : `${a.type} इशारा`
                    : `${a.type} Alert`}
                </h2>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground">
                      {language === 'mr' ? 'ग्रामपंचायत' : 'Panchayat'}
                    </dt>
                    <dd className="font-semibold">{getPlaceName(a.panchayat)}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">
                      {language === 'mr' ? 'अपेक्षित प्रमाण' : 'Expected parameter'}
                    </dt>
                    <dd>{a.expected}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">
                      {language === 'mr' ? 'अंदाज कालावधी' : 'Forecast period'}
                    </dt>
                    <dd>{a.period}</dd>
                  </div>
                </dl>
                <div className="mt-5 flex justify-between border-t pt-4 text-xs">
                  <span>{a.severity}</span>
                  <b className="text-warning-foreground">{a.status}</b>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </>
  )
}
