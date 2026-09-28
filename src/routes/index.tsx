import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  BrainCircuit,
  MapPinned,
  Satellite,
  LocateFixed,
  Database,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  ShieldCheck,
  CloudSun,
  CheckCircle2,
  MapPin,
  Radio,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DemoBadge, meta } from '@/components/grammausam/common'
import { HomeWeatherSection } from '@/components/grammausam/home-weather-section'
import { useLanguage } from '@/lib/i18n'

export const Route = createFileRoute('/')({
  head: () =>
    meta(
      'Panchayat Weather Intelligence · VataVaran',
      'AI-powered spatial downscaling for localized Panchayat-level weather forecasting and farmer advisories.'
    ),
  component: Home,
})

function Home() {
  const { t, language } = useLanguage()

  const features = [
    [
      MapPinned,
      language === 'mr' ? 'अचूक १ किमी अंदाज' : '1km Hyperlocal Forecast',
      language === 'mr'
        ? 'तालुका स्तरावरील हवामानाचे प्रत्येक गावासाठी अचूक स्थानिक ज्ञानात रूपांतर.'
        : 'Block-level weather converted into exact 1km village-level forecasts.',
    ],
    [
      BrainCircuit,
      language === 'mr' ? 'स्थानिक एआय मॉडेल' : 'AI-Powered Downscaling',
      language === 'mr'
        ? 'डोंगर, नद्या व स्थानिक भूपृष्ठानुसार सूक्ष्म-हवामान अचूक शिकणारे मॉडेल.'
        : 'Learns terrain, elevation, and micro-climates for accurate local predictions.',
    ],
    [
      Satellite,
      language === 'mr' ? 'थेट उपग्रह व हवामान माहिती' : 'Live Satellite & GIS Data',
      language === 'mr'
        ? 'इस्रो भुवन, ओपन-मेटिओ आणि आयएमडीच्या अचूक उपग्रह माहितीचा थेट संगम.'
        : 'Combines satellite radar, elevation grids, and local weather station data.',
    ],
    [
      LocateFixed,
      language === 'mr' ? 'शेतकऱ्यांसाठी कृषी सल्ला' : 'Actionable Farm Advisories',
      language === 'mr'
        ? 'पेरणी, फवारणी आणि सिंचनासाठी वेळेवर मिळणारा सोपा स्थानिक सल्ला.'
        : 'Clear daily recommendations for irrigation, spraying, and crop protection.',
    ],
  ] as const

  const steps = [
    {
      icon: Database,
      label: language === 'mr' ? 'माहिती संकलन' : 'Satellite Data',
      desc: language === 'mr' ? '२५ किमी जागतिक हवामान' : '25km NWP Weather Grid',
    },
    {
      icon: SlidersHorizontal,
      label: language === 'mr' ? 'भूपृष्ठ संरेखन' : 'Terrain & Elevation',
      desc: language === 'mr' ? 'एसआरटीएम ३० मी उंची' : 'SRTM 30m Micro-Contours',
    },
    {
      icon: Sparkles,
      label: language === 'mr' ? 'एआय प्रक्रिया' : 'AI Downscaling',
      desc: language === 'mr' ? 'मशीन लर्निंग विश्लेषण' : 'Sub-pixel spatial resolution',
    },
    {
      icon: MapPinned,
      label: language === 'mr' ? 'पंचायत अंदाज' : '1km Panchayat Forecast',
      desc: language === 'mr' ? 'प्रत्येक गावासाठी हवामान' : 'Accurate to your farm',
    },
  ]

  return (
    <>
      {/* 1. HERO SECTION WITH APPEALING FARMER IMAGE & USER-FRIENDLY INTRO */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-emerald-50/40 via-surface to-surface">
        <div className="grid-paper absolute inset-0 opacity-20 pointer-events-none" />
        
        <div className="relative mx-auto grid min-h-[640px] max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          {/* Left Column: Clear, Friendly Text & Easy Actions */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 text-xs font-bold text-emerald-800 shadow-xs">
                <span className="size-2 rounded-full bg-emerald-600 animate-pulse" />
                {language === 'mr' ? 'स्मार्ट कृषी हवामान मंच' : 'Smart Agriculture Weather Platform'}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                SIH 2024 · Gov. of India
              </span>
            </div>

            <h1 className="mt-5 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:leading-[1.15]">
              {language === 'mr' ? (
                <>
                  प्रत्येक ग्रामपंचायतीसाठी{' '}
                  <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy underline-offset-8">
                    अचूक स्थानिक
                  </span>{' '}
                  हवामान अंदाज
                </>
              ) : (
                <>
                  Hyperlocal Weather for Every{' '}
                  <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy underline-offset-8">
                    Gram Panchayat
                  </span>
                </>
              )}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {language === 'mr'
                ? 'तालुका पातळीवरील अंदाज आता तुमच्या गावाच्या पातळीवर (१ किमी). पेरणी, फवारणी आणि सिंचनासाठी हवामानाची खात्रीशीर माहिती.'
                : 'Turn generic block-level forecasts into precision 1km micro-climate data for your specific village. Know exact rain timings, topsoil moisture, and farming advisories.'}
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/25 text-sm h-11 px-6">
                <Link to="/weather-map">
                  <MapPinned className="mr-1.5 size-4" />
                  {language === 'mr' ? 'हवामान नकाशा पहा' : 'Explore Weather Map'}
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm h-11 px-5">
                <a href="#quick-dashboard">
                  <Sprout className="mr-1.5 size-4 text-emerald-600" />
                  {language === 'mr' ? 'माझ्या गावाची माहिती' : 'Check My Panchayat'}
                </a>
              </Button>
            </div>

            {/* User-friendly quick village pills */}
            <div className="mt-8 border-t border-slate-200 pt-5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2.5">
                <MapPin className="size-3.5 text-emerald-600" />
                <span>{language === 'mr' ? 'लोकप्रिय पंचायती (थेट पहा):' : 'Quick View Panchayats:'}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: language === 'mr' ? 'सेवाग्राम' : 'Sevagram', dist: 'Wardha', temp: '29.8°C' },
                  { name: language === 'mr' ? 'डुबेरा' : 'Dubera', dist: 'Nashik', temp: '31.0°C' },
                  { name: language === 'mr' ? 'पांचाळे' : 'Panchale', dist: 'Nashik', temp: '32.2°C' },
                  { name: language === 'mr' ? 'सेलू' : 'Seloo', dist: 'Wardha', temp: '30.4°C' },
                  { name: language === 'mr' ? 'देवळी' : 'Deoli', dist: 'Wardha', temp: '31.5°C' },
                ].map((p) => (
                  <Link
                    key={p.name}
                    to="/weather-map"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50/50 shadow-xs transition-colors"
                  >
                    <span>{p.name}</span>
                    <span className="text-[10px] font-bold text-emerald-600">{p.temp}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Appealing Hero Image Showcase with Glassmorphism Overlays */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl">
              {/* Main Photograph: Farmer in green fields with weather IoT station */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src="/images/panchayat_farm_hero.jpg"
                  alt="Indian farmer using smart IoT weather intelligence in agricultural field"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />

                {/* Top Floating Glass Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between rounded-xl bg-slate-900/85 px-3 py-2 text-white backdrop-blur-md border border-white/20 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white tracking-wide">
                      {language === 'mr' ? 'थेट १ किमी सूक्ष्म-हवामान नेटवर्क' : '1km Micro-Climate Network'}
                    </span>
                  </div>
                  <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-black text-emerald-300 border border-emerald-400/30">
                    Live
                  </span>
                </div>

                {/* Bottom Floating Downscaling Comparison Card */}
                <div className="absolute bottom-3 inset-x-3 rounded-xl bg-white/95 p-3.5 backdrop-blur-md border border-slate-200/90 shadow-xl text-slate-800">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5">
                    <span>{language === 'mr' ? 'हवामान रूपांतर तुलना' : 'Downscaling In Action'}</span>
                    <span className="text-emerald-700 font-bold">98.4% Spatial Accuracy</span>
                  </div>

                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg bg-slate-50 p-2 border border-slate-200">
                    <div className="text-left">
                      <span className="block text-[9px] font-bold text-slate-500 uppercase">
                        {language === 'mr' ? 'तालुका अंदाज (२५ किमी)' : 'Block (25km)'}
                      </span>
                      <strong className="text-sm font-black text-slate-700">32.5°C</strong>
                    </div>

                    <div className="grid size-6 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      <ArrowRight className="size-3.5" />
                    </div>

                    <div className="text-right">
                      <span className="block text-[9px] font-bold text-emerald-700 uppercase">
                        {language === 'mr' ? 'तुमचे गाव (१ किमी)' : 'Your Village (1km)'}
                      </span>
                      <strong className="text-sm font-black text-emerald-700">31.0°C · Showers</strong>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-emerald-800">
                      <CheckCircle2 className="size-3 text-emerald-600" />
                      {language === 'mr' ? 'पेरणीसाठी अनुकूल ओलावा' : 'Favorable topsoil moisture for sowing'}
                    </span>
                    <Link to="/weather-map" className="font-bold text-emerald-600 hover:underline flex items-center gap-0.5">
                      {language === 'mr' ? 'नकाशा पहा' : 'View GIS'} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle decorative glowing blur */}
            <div className="absolute -bottom-6 -right-6 -z-10 size-48 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
            <div className="absolute -top-6 -left-6 -z-10 size-48 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 2. STATS BAR: SIMPLE & TRUST-BUILDING */}
      <section className="border-b bg-white py-6">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 text-center">
            <div className="p-3">
              <strong className="block text-2xl sm:text-3xl font-black text-emerald-700">82+</strong>
              <span className="text-xs font-semibold text-slate-600">
                {language === 'mr' ? 'ग्रामपंचायती समाविष्ट' : 'Gram Panchayats Covered'}
              </span>
            </div>
            <div className="p-3 border-l border-slate-100">
              <strong className="block text-2xl sm:text-3xl font-black text-slate-900">1 km²</strong>
              <span className="text-xs font-semibold text-slate-600">
                {language === 'mr' ? 'अचूक स्थानिक रेझोल्यूशन' : 'Ultra-Fine Resolution'}
              </span>
            </div>
            <div className="p-3 border-l border-slate-100">
              <strong className="block text-2xl sm:text-3xl font-black text-emerald-700">Hourly</strong>
              <span className="text-xs font-semibold text-slate-600">
                {language === 'mr' ? 'थेट उपग्रह अपडेट्स' : 'Satellite Telemetry Updates'}
              </span>
            </div>
            <div className="p-3 border-l border-slate-100">
              <strong className="block text-2xl sm:text-3xl font-black text-slate-900">100% Free</strong>
              <span className="text-xs font-semibold text-slate-600">
                {language === 'mr' ? 'शेतकऱ्यांसाठी मोफत' : 'Open Access for Farmers'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE 4 WEATHER CARDS & PANCHAYAT SELECTOR */}
      <div id="quick-dashboard">
        <HomeWeatherSection />
      </div>

      {/* 4. VISUAL SHOWCASE: RURAL LANDSCAPE & HOW IT HELPS FARMERS */}
      <section className="border-t bg-slate-50/60 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left: Beautiful Drone Aerial Image of Indian Villages */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                <img
                  src="/images/village_panchayat_aerial.jpg"
                  alt="Aerial view of lush Indian village farms and rivers in Maharashtra"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block rounded-md bg-emerald-600/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-1">
                    {language === 'mr' ? 'ग्रामीण महाराष्ट्र' : 'Rural Agriculture GIS'}
                  </span>
                  <p className="text-sm font-bold text-white drop-shadow-sm">
                    {language === 'mr'
                      ? 'सह्याद्रीच्या डोंगर-दर्‍यांतील शेतांसाठी अचूक स्थानिक हवामान'
                      : 'High-resolution micro-climate modeling for river valleys and farm clusters'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Simple 3-point explanation for farmers */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {language === 'mr' ? 'शेतकऱ्यांसाठी का महत्त्वाचे?' : 'Why Hyperlocal Weather Matters'}
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {language === 'mr'
                    ? 'प्रत्येक गावाचे हवामान वेगळे असते, मग अंदाज एकच का?'
                    : 'Weather changes every few kilometers. Why rely on distant district forecasts?'}
                </h2>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {language === 'mr'
                    ? 'डोंगर, नदी किंवा झाडांमुळे एका गावात पाऊस पडतो आणि शेजारच्या गावात ऊन असते. वातवरण एआय या सूक्ष्म फरकाचा अभ्यास करून अचूक अंदाज देते.'
                    : 'Topography, river basins, and elevation create micro-climates where one village receives heavy showers while another 5km away stays dry. VataVaran captures these exact differences.'}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                  <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                    <CloudSun className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {language === 'mr' ? 'पावसाची अचूक वेळ' : 'Precise Rain Timings'}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {language === 'mr'
                        ? 'फवारणी आणि खत वाहून जाण्यापासून वाचवण्यासाठी पावसाची अचूक वेळ जाणून घ्या.'
                        : 'Know the window of rainfall so expensive sprays and fertilizers are not washed away.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                  <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-indigo-100 text-indigo-700">
                    <Sprout className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {language === 'mr' ? 'हंगामी कृषी सल्ला' : 'Smart Agricultural Advisories'}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {language === 'mr'
                        ? 'मातीतील ओलावा व तापमानानुसार कापूस, सोयाबीन आणि कांदा पिकांसाठी मार्गदर्शन.'
                        : 'Custom advice for soybean, cotton, onion, and pulses based on localized topsoil moisture.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                  <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {language === 'mr' ? 'वातावरणातील संकटांची पूर्वसूचना' : 'Advance Storm & Heat Alerts'}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {language === 'mr'
                        ? 'वादळ, गारपीट आणि तीव्र उष्णतेची वेळीच सूचना मिळवून पिकांचे नुकसान टाळा.'
                        : 'Early alerts for hailstorms, sudden gusty winds, and heatwaves directly for your panchayat.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm">
                  <Link to="/weather-map">
                    <MapPinned className="mr-1.5 size-4" />
                    {language === 'mr' ? 'तुमच्या गावाचा नकाशा उघडा' : 'Open Panchayat Map'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PLATFORM CAPABILITIES */}
      <section className="page-shell border-t">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">
            {language === 'mr' ? 'व्यासपीठाची वैशिष्ट्ये' : 'Platform capabilities'}
          </p>
          <h2 className="section-title mt-2">
            {language === 'mr'
              ? 'शेतकऱ्यांच्या स्थानिक निर्णयांसाठी तयार केलेली हवामान बुद्धिमत्ता'
              : 'Weather intelligence built for local decisions'}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map(([I, tTitle, d]) => (
            <article className="panel border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all bg-white" key={tTitle}>
              <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                <I className="size-5" />
              </span>
              <h3 className="mt-5 font-bold text-slate-900">{tTitle}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {d}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 6. HOW IT WORKS: 4 SIMPLE STEPS */}
      <section className="border-y bg-white py-14">
        <div className="page-shell">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow">{language === 'mr' ? 'कार्यपद्धती' : 'How it works'}</p>
            <h2 className="section-title mt-2">
              {language === 'mr'
                ? 'कच्च्या हवामान माहितीचे गावाच्या अंदाजात रूपांतर कसे होते?'
                : 'How Block Forecasts Turn Into Village Forecasts'}
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, label, desc }, i) => (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-center relative group hover:bg-emerald-50/40 transition-colors" key={label}>
                <span className="inline-grid size-12 place-items-center rounded-xl bg-white shadow-xs border border-slate-200 text-emerald-700 mx-auto">
                  <Icon className="size-6" />
                </span>
                <span className="mt-3 block text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 font-bold text-slate-900 text-sm">{label}</h3>
                <p className="mt-1 text-xs text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

