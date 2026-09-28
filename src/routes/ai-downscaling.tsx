import { createFileRoute } from '@tanstack/react-router'
import {
  BrainCircuit,
  CloudSun,
  Database,
  Layers3,
  MapPinned,
  ArrowDown,
  Mountain,
  Sprout,
  Satellite,
} from 'lucide-react'
import { DemoBadge, PageHeader, TechTip, meta } from '@/components/grammausam/common'
import { useLanguage } from '@/lib/i18n'

export const Route = createFileRoute('/ai-downscaling')({
  head: () =>
    meta(
      'How AI Downscaling Works',
      'Explore the candidate model pipeline for Panchayat-level weather downscaling.'
    ),
  component: AIPage,
})

function AIPage() {
  const { language } = useLanguage()

  const inputs = [
    [CloudSun, language === 'mr' ? 'हवामान अंदाज' : 'Weather Forecast'],
    [Database, language === 'mr' ? 'ऐतिहासिक हवामान' : 'Historical Weather'],
    [Satellite, language === 'mr' ? 'उपग्रह माहिती' : 'Satellite Data'],
    [Mountain, language === 'mr' ? 'जमिनीची उंची (DEM)' : 'Elevation'],
    [Sprout, language === 'mr' ? 'मातीचे गुणधर्म' : 'Soil'],
    [Layers3, language === 'mr' ? 'जमीन वापर (LULC)' : 'LULC'],
    [MapPinned, language === 'mr' ? 'जीआयएस नकाशे' : 'GIS Features'],
  ] as const

  const pipeline = [
    language === 'mr' ? 'डेटा पूर्वप्रक्रिया' : 'Data Preprocessing',
    language === 'mr' ? 'वैशिष्ट्य निर्मिती' : 'Feature Engineering',
    language === 'mr' ? 'एआय/एमएल डाउनस्केलिंग मॉडेल' : 'AI/ML Downscaling Model',
    language === 'mr' ? 'ग्रामपंचायत अंदाज' : 'Panchayat-Level Forecast',
  ]

  const flow = [
    language === 'mr' ? 'मोठ्या क्षेत्राचा हवामान इनपुट' : 'Coarse Weather Input',
    language === 'mr' ? 'भौगोलिक + कालानुरूप वैशिष्ट्ये' : 'Spatial + Temporal Features',
    language === 'mr' ? 'पर्यावरणीय घटक' : 'Environmental Features',
    language === 'mr' ? 'माहिती एकत्रीकरण' : 'Feature Fusion',
    language === 'mr' ? 'एआय मॉडेल' : 'AI Model',
    language === 'mr' ? 'ग्रामपंचायत अंदाज' : 'Panchayat Forecast',
  ]

  const importance = [
    { en: 'Elevation', mr: 'जमिनीची उंची (Elevation)' },
    { en: 'Historical Temperature', mr: 'मागील काळातील तापमान कल' },
    { en: 'Satellite Vegetation Index', mr: 'उपग्रह वनस्पती निर्देशांक (NDVI)' },
    { en: 'Soil Properties', mr: 'मातीची जलधारण क्षमता व गुणधर्म' },
    { en: 'Land Use / Land Cover', mr: 'जमीन व पिकांचा वापर (LULC)' },
    { en: 'Nearby Weather Observations', mr: 'जवळपासच्या स्वयंचलित वेधशाळा नोंदी' },
  ]

  return (
    <>
      <PageHeader
        eyebrow={language === 'mr' ? 'एआय डाउनस्केलिंग' : 'AI Downscaling'}
        title={language === 'mr' ? 'एआय डाउनस्केलिंग कसे कार्य करते?' : 'How AI Downscaling Works'}
        description={
          language === 'mr'
            ? 'मोठ्या क्षेत्राचा अंदाज आणि स्थानिक पर्यावरणीय माहिती एकत्र करून अचूक ग्रामपंचायत अंदाज कसा तयार होतो याचे पारदर्शक सादरीकरण.'
            : 'A transparent view of how coarse forecasts and local environmental features can produce higher-resolution weather intelligence.'
        }
      />
      <div className="page-shell">
        <div className="flex justify-end">
          <DemoBadge label={language === 'mr' ? 'संकल्पनात्मक प्रवाह' : 'Conceptual pipeline'} />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {inputs.map(([Icon, t]) => (
            <div className="pipeline-step flex-col gap-2" key={t}>
              <Icon className="text-primary" />
              <span>{t}</span>
            </div>
          ))}
        </div>
        <ArrowDown className="mx-auto my-4 text-primary" />
        <div className="grid gap-3 md:grid-cols-4">
          {pipeline.map((x) => (
            <div className="pipeline-step bg-accent" key={x}>
              {x}
            </div>
          ))}
        </div>
        <section className="mt-14">
          <p className="eyebrow">{language === 'mr' ? 'मॉडेल रचना' : 'Model landscape'}</p>
          <h2 className="section-title mt-2">
            {language === 'mr' ? 'अभ्यासाधीन व प्रायोगिक मॉडेल्स' : 'Candidate / Experimental Models'}
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="panel">
              <h3 className="font-bold">
                {language === 'mr' ? 'मूलभूत मॉडेल्स (Baseline)' : 'Baseline Models'}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Linear Regression', 'Random Forest', 'XGBoost'].map((x) => (
                  <span className="rounded-md bg-muted px-3 py-2 text-sm" key={x}>
                    {x}
                  </span>
                ))}
              </div>
            </article>
            <article className="panel">
              <h3 className="font-bold">
                {language === 'mr' ? 'प्रगत डीप लर्निंग मॉडेल्स' : 'Advanced Models'}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Neural Network', 'CNN', 'LSTM / Temporal', 'Transformer'].map((x) => (
                  <span className="rounded-md bg-muted px-3 py-2 text-sm" key={x}>
                    {x}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="mt-14 border-y bg-primary px-5 py-10 text-primary-foreground sm:rounded-lg sm:border">
          <p className="text-xs font-bold uppercase opacity-70">
            {language === 'mr' ? 'मॉडेल कार्यप्रवाह' : 'Model flow'}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-6">
            {flow.map((x, i) => (
              <div className="flex items-center gap-3" key={x}>
                <div className="flex min-h-24 flex-1 items-center justify-center rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 p-3 text-center text-sm font-semibold">
                  {x}
                </div>
                {i < 5 && <span className="hidden md:block">→</span>}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <p className="eyebrow">{language === 'mr' ? 'स्पष्टीकरण' : 'Explainability'}</p>
          <h2 className="section-title mt-2">
            {language === 'mr' ? 'अंदाजावर कशाचा प्रभाव पडतो?' : 'What Influences the Prediction?'}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {language === 'mr'
              ? 'केवळ उदाहरण घटक. प्रत्यक्ष प्रशिक्षणानंतर मॉडेलच्या अचूक क्रमवारीनुसार दर्शविले जाईल.'
              : 'Example feature categories only. Actual importance will appear after the trained model is evaluated.'}
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {importance.map((x, i) => (
              <div className="panel flex items-center gap-4" key={x.en}>
                <span className="grid size-9 place-items-center rounded-md bg-secondary font-bold text-secondary-foreground">
                  {i + 1}
                </span>
                <TechTip
                  label={language === 'mr' ? x.mr : x.en}
                  tip={
                    language === 'mr'
                      ? 'इनपुट घटकाचे उदाहरण; प्रत्यक्ष मोजलेले रँकिंग नाही.'
                      : 'Example input category; not a calculated importance ranking.'
                  }
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
