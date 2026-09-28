import { createFileRoute } from '@tanstack/react-router'
import { CloudSun, Satellite, Mountain, Sprout, Wheat, Map, ArrowDown } from 'lucide-react'
import { PageHeader, meta } from '@/components/grammausam/common'
import { useLanguage } from '@/lib/i18n'

export const Route = createFileRoute('/methodology')({
  head: () =>
    meta(
      'Data & Methodology',
      'Data sources and validation methodology for VataVaran.'
    ),
  component: Methodology,
})

function Methodology() {
  const { language } = useLanguage()

  const sources = [
    [
      CloudSun,
      language === 'mr' ? 'हवामान माहिती (Weather Data)' : 'Weather Data',
      language === 'mr'
        ? 'ऐतिहासिक वेधशाळा नोंदी आणि जागतिक संख्यात्मक हवामान अंदाज (NWP)'
        : 'Historical observations and NWP forecasts',
    ],
    [
      Satellite,
      language === 'mr' ? 'उपग्रह माहिती (Satellite Data)' : 'Satellite Data',
      language === 'mr'
        ? 'उपग्रहाद्वारे मिळणारे पर्यावरणीय व वनस्पती निर्देशांक'
        : 'Satellite-derived environmental information',
    ],
    [
      Mountain,
      language === 'mr' ? 'जमिनीची उंची (Elevation - DEM)' : 'Elevation',
      language === 'mr'
        ? 'डिजिटल एलिव्हेशन मॉडेल (SRTM / Cartosat) द्वारे स्थानिक डोंगरदऱ्यांचा अभ्यास'
        : 'Digital Elevation Model',
    ],
    [
      Sprout,
      language === 'mr' ? 'मातीचे गुणधर्म (Soil)' : 'Soil',
      language === 'mr'
        ? 'मातीची जलधारण क्षमता, पोत आणि ओलावा गुणधर्म'
        : 'Soil characteristics',
    ],
    [
      Wheat,
      language === 'mr' ? 'जमीन व पीक वापर (LULC)' : 'LULC',
      language === 'mr'
        ? 'जमिनीचा वापर आणि पिकांचे आच्छादन विश्लेषण'
        : 'Land Use / Land Cover',
    ],
    [
      Map,
      language === 'mr' ? 'जीआयएस नकाशे (GIS Boundaries)' : 'GIS',
      language === 'mr'
        ? 'तालुका व ग्रामपंचायतींच्या अचूक प्रशासकीय सीमा'
        : 'Block and Panchayat boundaries',
    ],
  ] as const

  const pipeline = [
    language === 'mr' ? 'माहिती स्त्रोत' : 'Data Sources',
    language === 'mr' ? 'माहिती संकलन' : 'Data Ingestion',
    language === 'mr' ? 'गुणवत्ता तपासणी' : 'Quality Check',
    language === 'mr' ? 'भौगोलिक मांडणी' : 'Spatial Alignment',
    language === 'mr' ? 'कालानुरूप मांडणी' : 'Temporal Alignment',
    language === 'mr' ? 'वैशिष्ट्ये निर्मिती' : 'Feature Engineering',
    language === 'mr' ? 'मॉडेल प्रशिक्षण' : 'Model Training',
    language === 'mr' ? 'प्रमाणीकरण' : 'Validation',
    language === 'mr' ? 'ग्रामपंचायत अंदाज' : 'Panchayat Forecast',
  ]

  const methods = [
    language === 'mr' ? 'अनेक अधिकृत स्त्रोतांकडून डेटा संकलित करणे.' : 'Collect multi-source datasets.',
    language === 'mr'
      ? 'भौगोलिक व कालानुरूप रिझोल्यूशनचे मानकीकरण करणे.'
      : 'Standardize spatial and temporal resolution.',
    language === 'mr'
      ? 'हवामान माहिती ग्रामपंचायत सीमांशी सुसंगत करणे.'
      : 'Match weather data with Panchayat boundaries.',
    language === 'mr' ? 'स्थानिक भौगोलिक वैशिष्ट्ये (उंची, डोंगर) तयार करणे.' : 'Generate spatial features.',
    language === 'mr' ? 'कालानुरूप हंगामी वैशिष्ट्ये तयार करणे.' : 'Generate temporal features.',
    language === 'mr' ? 'एआय डाउनस्केलिंग मॉडेल प्रशिक्षित करणे.' : 'Train the downscaling model.',
    language === 'mr'
      ? 'प्रत्यक्ष नोंदवलेल्या हवामानाशी तुलना करून पडताळणी करणे.'
      : 'Validate against observed weather.',
    language === 'mr'
      ? 'ग्रामपंचायत पातळीवरील अचूक सूक्ष्म-हवामान अंदाज तयार करणे.'
      : 'Generate Panchayat-level predictions.',
    language === 'mr'
      ? 'जीआयएस नकाशावर शेतकऱ्यांसाठी सोप्या पद्धतीने प्रदर्शित करणे.'
      : 'Display predictions on the GIS map.',
  ]

  return (
    <>
      <PageHeader
        eyebrow={language === 'mr' ? 'माहिती व कार्यपद्धती' : 'Data & Methodology'}
        title={
          language === 'mr'
            ? 'विविध पर्यावरणीय माहितीवर आधारित शास्त्रीय कार्यपद्धती'
            : 'Built on Multi-Source Environmental Intelligence'
        }
        description={
          language === 'mr'
            ? 'हवामान आणि भौगोलिक स्त्रोतांपासून ते थेट शेतकऱ्यांसाठी उपयुक्त स्थानिक अंदाजापर्यंतची संपूर्ण शास्त्रीय प्रक्रिया.'
            : 'A reproducible path from weather and geospatial inputs to locally useful forecasts.'
        }
      />
      <div className="page-shell">
        <p className="eyebrow">{language === 'mr' ? 'माहितीचे स्त्रोत' : 'Data sources'}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sources.map(([Icon, t, d]) => (
            <article className="panel" key={t}>
              <Icon className="text-primary" />
              <h3 className="mt-4 font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </article>
          ))}
        </div>

        <section className="mt-14">
          <p className="eyebrow">{language === 'mr' ? 'डेटा प्रक्रिया प्रवाह' : 'Data pipeline'}</p>
          <h2 className="section-title mt-2">
            {language === 'mr'
              ? 'स्त्रोतापासून ते प्रत्यक्ष अंदाजापर्यंत गुणवत्ता नियंत्रण'
              : 'Quality controlled from source to forecast'}
          </h2>
          <div className="mt-6 grid items-center gap-2 sm:grid-cols-3 lg:grid-cols-9">
            {pipeline.map((x, i) => (
              <div key={x} className="contents">
                <div className="pipeline-step min-h-20 text-xs">{x}</div>
                {i < 8 && <ArrowDown className="mx-auto sm:hidden" />}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="eyebrow">{language === 'mr' ? 'पद्धती' : 'Methodology'}</p>
            <h2 className="section-title mt-2">
              {language === 'mr' ? 'नऊ स्पष्ट व पारदर्शक टप्पे' : 'Nine clear, auditable steps'}
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              {language === 'mr'
                ? 'प्रत्येक टप्पा पारदर्शकता, अचूकता आणि स्थानिक शेतीविषयक निरीक्षणांशी पडताळणी करण्यासाठी तयार केला गेला आहे.'
                : 'Each stage is designed to support reproducibility, traceability and future validation against local observations.'}
            </p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {methods.map((x, i) => (
              <li className="panel flex gap-4" key={x}>
                <span className="font-bold text-primary">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm">{x}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  )
}
