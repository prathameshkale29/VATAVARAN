import { createFileRoute } from '@tanstack/react-router'
import {
  Database,
  Upload,
  Play,
  BrainCircuit,
  ChartNoAxesCombined,
  CloudUpload,
  Download,
  CheckCircle2,
  Clock3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DemoBadge, EmptyMetric, PageHeader, meta } from '@/components/grammausam/common'
import { futureEndpoints } from '@/services/weather-api'
import { toast } from 'sonner'
import { useLanguage } from '@/lib/i18n'

export const Route = createFileRoute('/dashboard')({
  head: () =>
    meta(
      'Model Dashboard',
      'Demonstration dashboard for model, data pipeline, and forecast operations.'
    ),
  component: Dashboard,
})

function Dashboard() {
  const { language } = useLanguage()

  const overview = [
    [
      language === 'mr' ? 'एकूण ग्रामपंचायती' : 'Total Panchayats',
      language === 'mr' ? '५ नमुना' : '5 demo',
    ],
    [
      language === 'mr' ? 'डेटा नोंदी' : 'Data Records',
      language === 'mr' ? 'नमुना डेटा' : 'Demo dataset',
    ],
    [
      language === 'mr' ? 'मॉडेल आवृत्ती' : 'Model Version',
      language === 'mr' ? 'प्रतिक्षाधीन' : 'Not connected',
    ],
    [
      language === 'mr' ? 'शेवटचे अपडेट' : 'Last Data Update',
      language === 'mr' ? 'नमुना स्नॅपशॉट' : 'Sample snapshot',
    ],
    [
      language === 'mr' ? 'अंदाज स्थिती' : 'Forecast Status',
      language === 'mr' ? 'प्रात्यक्षिक' : 'Demonstration',
    ],
  ]

  const status = [
    [
      language === 'mr' ? 'हवामान माहिती (IMD/GFS)' : 'Weather Data',
      language === 'mr' ? 'जोडलेले' : 'Connected',
    ],
    [
      language === 'mr' ? 'उपग्रह माहिती (Sentinel/INSAT)' : 'Satellite Data',
      language === 'mr' ? 'प्रलंबित' : 'Pending',
    ],
    [
      language === 'mr' ? 'जीआयएस सीमा नकाशे' : 'GIS Data',
      language === 'mr' ? 'जोडलेले' : 'Connected',
    ],
    [
      language === 'mr' ? 'मातीचे गुणधर्म' : 'Soil Data',
      language === 'mr' ? 'प्रलंबित' : 'Pending',
    ],
    [
      language === 'mr' ? 'जमीन वापर (LULC)' : 'LULC Data',
      language === 'mr' ? 'प्रलंबित' : 'Pending',
    ],
  ]

  const actions = [
    [Upload, language === 'mr' ? 'डेटासेट अपलोड करा' : 'Upload Dataset'],
    [Play, language === 'mr' ? 'डेटा प्रक्रिया चालवा' : 'Run Preprocessing'],
    [BrainCircuit, language === 'mr' ? 'मॉडेल प्रशिक्षित करा' : 'Train Model'],
    [ChartNoAxesCombined, language === 'mr' ? 'मॉडेल मूल्यमापन' : 'Evaluate Model'],
    [CloudUpload, language === 'mr' ? 'अंदाज तयार करा' : 'Generate Forecast'],
    [Download, language === 'mr' ? 'निष्कर्ष डाउनलोड करा' : 'Export Results'],
  ] as const

  return (
    <>
      <PageHeader
        eyebrow={language === 'mr' ? 'प्रशासन' : 'Administration'}
        title={language === 'mr' ? 'मॉडेल व डेटा डॅशबोर्ड' : 'Model & Data Dashboard'}
        description={
          language === 'mr'
            ? 'डेटा प्रवाह तयारी, मॉडेल मूल्यांकन आणि अंदाज व्यवस्थापनासाठी प्रात्यक्षिक डॅशबोर्ड.'
            : 'A project demonstration workspace for pipeline readiness, model evaluation and forecast operations.'
        }
      />
      <div className="page-shell">
        <div className="flex justify-end">
          <DemoBadge label={language === 'mr' ? 'केवळ प्रात्यक्षिक नियंत्रणे' : 'UI-only controls'} />
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {overview.map(([a, b]) => (
            <div className="metric-card" key={a}>
              <p className="text-xs text-muted-foreground">{a}</p>
              <strong className="mt-2 block text-lg">{b}</strong>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="panel">
            <h2 className="font-bold">
              {language === 'mr' ? 'डेटा पाइपलाइन स्थिती' : 'Data Pipeline Status'}
            </h2>
            <div className="mt-5 grid gap-3">
              {status.map(([a, b]) => {
                const isConnected = b === 'Connected' || b === 'जोडलेले'
                return (
                  <div className="flex items-center justify-between rounded-md bg-muted p-3" key={a}>
                    <span className="flex items-center gap-2 text-sm">
                      <Database className="size-4 text-primary" />
                      {a}
                    </span>
                    <span
                      className={`flex items-center gap-1 text-xs font-bold ${
                        isConnected ? 'text-success' : 'text-muted-foreground'
                      }`}
                    >
                      {isConnected ? <CheckCircle2 className="size-3" /> : <Clock3 className="size-3" />}
                      {b}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
          <section className="panel">
            <h2 className="font-bold">{language === 'mr' ? 'मॉडेल स्थिती' : 'Model Status'}</h2>
            <dl className="mt-5 grid gap-4 text-sm">
              {[
                [
                  language === 'mr' ? 'मॉडेलचे नाव' : 'Model Name',
                  language === 'mr' ? 'निवडलेले नाही' : 'Not selected',
                ],
                [
                  language === 'mr' ? 'आवृत्ती' : 'Model Version',
                  language === 'mr' ? 'जोडलेले नाही' : 'Not connected',
                ],
                [
                  language === 'mr' ? 'प्रशिक्षण तारीख' : 'Training Date',
                  language === 'mr' ? 'प्रतिक्षाधीन' : 'Awaiting training',
                ],
                [
                  language === 'mr' ? 'प्रशिक्षण डेटासेट' : 'Training Dataset',
                  language === 'mr' ? 'अपलोड प्रतिक्षा' : 'Awaiting upload',
                ],
                [
                  language === 'mr' ? 'मूल्यांकन स्थिती' : 'Validation Status',
                  language === 'mr' ? 'मूल्यांकन नाही' : 'Not evaluated',
                ],
              ].map(([a, b]) => (
                <div className="flex justify-between border-b pb-3" key={a}>
                  <dt className="text-muted-foreground">{a}</dt>
                  <dd className="font-semibold">{b}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <section className="mt-10">
          <h2 className="section-title">
            {language === 'mr' ? 'मॉडेल अचूकता कामगिरी' : 'Model Performance'}
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {['MAE', 'RMSE', 'R²'].map((x) => (
              <EmptyMetric key={x} name={x} />
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="panel">
            <h2 className="font-bold">
              {language === 'mr' ? 'अंदाज निरीक्षण' : 'Prediction Monitor'}
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {[
                [language === 'mr' ? 'अंदाज केलेल्या पंचायती' : 'Panchayats predicted', '0'],
                [language === 'mr' ? 'यशस्वी अंदाज' : 'Successful predictions', '0'],
                [language === 'mr' ? 'अनुपलब्ध डेटा' : 'Missing data', language === 'mr' ? 'तपासणी नाही' : 'Not assessed'],
                [language === 'mr' ? 'अंदाज वेळ' : 'Prediction timestamp', language === 'mr' ? 'तयार नाही' : 'Not generated'],
              ].map(([a, b]) => (
                <div className="rounded-md bg-muted p-3" key={a}>
                  <span className="text-xs text-muted-foreground">{a}</span>
                  <strong className="mt-1 block">{b}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="panel">
            <h2 className="font-bold">
              {language === 'mr' ? 'प्रशासकीय कृती' : 'Admin Actions'}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {language === 'mr'
                ? 'बॅकएंड ऑपरेशन्स जोडण्यासाठी नियंत्रणे सज्ज आहेत.'
                : 'Controls are ready to connect to authenticated backend operations.'}
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {actions.map(([Icon, t]) => (
                <Button
                  variant="outline"
                  key={t}
                  onClick={() =>
                    toast.info(
                      language === 'mr'
                        ? `${t} एपीआय जोडणीसाठी सज्ज आहे.`
                        : `${t} is ready for API connection.`
                    )
                  }
                >
                  <Icon />
                  {t}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <details className="mt-8 rounded-lg border bg-card p-5">
          <summary className="cursor-pointer font-semibold">
            {language === 'mr' ? 'नियोजित फास्टएपीआय एंडपॉइंट्स (FastAPI)' : 'Planned FastAPI contract'}
          </summary>
          <div className="mt-4 flex flex-wrap gap-2">
            {futureEndpoints.map((x) => (
              <code className="rounded bg-muted px-2 py-1 text-xs" key={x}>
                {x}
              </code>
            ))}
          </div>
        </details>
      </div>
    </>
  )
}
