import { useState, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import {
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  MapPin,
  ChevronRight,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Compass,
  CheckCircle2,
  Calendar,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { districts, blocks, panchayats, getPanchayatFullForecast } from '@/data/mock-weather'
import { DemoBadge } from '@/components/grammausam/common'
import { useLanguage } from '@/lib/i18n'

// Localized weather details generator per panchayat
function getLocalizedWeather(panchayatId: string) {
  const f = getPanchayatFullForecast(panchayatId)
  if (f) {
    const diffRain = f.rainfall.value - 14
    const diffTemp = f.temperature.current - 32.0
    const diffHum = f.humidity.value - 68
    const diffWind = f.wind.speed - 10.0

    return {
      rainfall: {
        value: f.rainfall.value,
        unit: f.rainfall.unit,
        status: f.rainfall.intensityDesc,
        probability: f.rainfall.probability,
        blockVariance: `${diffRain >= 0 ? '+' : ''}${diffRain.toFixed(1)} mm vs ${f.blockName} avg`,
        advisory: f.advisory.action,
      },
      temperature: {
        current: f.temperature.current,
        unit: f.temperature.unit,
        min: f.temperature.min,
        max: f.temperature.max,
        feelsLike: f.temperature.feelsLike,
        status: f.temperature.condition,
        blockVariance: `${diffTemp >= 0 ? '+' : ''}${diffTemp.toFixed(1)} °C vs block avg`,
        advisory:
          f.temperature.risk === 'high'
            ? 'Elevated heat load; irrigate early morning to limit evapotranspiration.'
            : 'Optimal thermal comfort for vegetative and reproductive stages.',
      },
      humidity: {
        value: f.humidity.value,
        unit: f.humidity.unit,
        dewPoint: f.humidity.dewPoint,
        status: f.humidity.condition,
        blockVariance: `${diffHum >= 0 ? '+' : ''}${diffHum}% vs block avg`,
        advisory:
          f.humidity.risk === 'high'
            ? 'High humidity alert; inspect crop canopy for fungal incidence.'
            : 'Favorable relative humidity for field operations and transpiration.',
      },
      wind: {
        speed: f.wind.speed,
        unit: f.wind.unit,
        direction: f.wind.direction,
        gusts: f.wind.gusts,
        status: f.wind.condition,
        blockVariance: `${diffWind >= 0 ? '+' : ''}${diffWind.toFixed(1)} km/h vs block avg`,
        advisory: f.advisory.title,
      },
    }
  }

  // Fallback switch
  switch (panchayatId) {
    case 'panchale':
      return {
        rainfall: {
          value: 18,
          unit: 'mm',
          status: 'Passing Showers',
          probability: 82,
          blockVariance: '+3.2 mm vs Sinnar block',
          advisory: 'Adequate moisture for pulses; postpone spray operations.',
        },
        temperature: {
          current: 32.2,
          unit: '°C',
          min: 21.5,
          max: 33.6,
          feelsLike: 34.0,
          status: 'Scattered Clouds',
          blockVariance: '-0.3 °C vs block avg',
          advisory: 'Low crop heat stress; optimal daytime transpiration.',
        },
        humidity: {
          value: 76,
          unit: '%',
          dewPoint: 21.2,
          status: 'High Moisture',
          blockVariance: '+6% vs block avg',
          advisory: 'Watch for early fungal incidence on vine crops.',
        },
        wind: {
          speed: 11.2,
          unit: 'km/h',
          direction: 'SW (225°)',
          gusts: 18.5,
          status: 'Moderate Breeze',
          blockVariance: '+1.5 km/h vs block avg',
          advisory: 'Favorable wind for natural field ventilation.',
        },
      }

    case 'konambe':
      return {
        rainfall: {
          value: 12,
          unit: 'mm',
          status: 'Light Showers',
          probability: 60,
          blockVariance: '-2.8 mm vs Sinnar block',
          advisory: 'Light rainfall; good for post-sowing germination.',
        },
        temperature: {
          current: 30.5,
          unit: '°C',
          min: 20.4,
          max: 31.8,
          feelsLike: 31.9,
          status: 'Partly Sunny',
          blockVariance: '-2.0 °C vs block avg',
          advisory: 'Mild temperatures suited for leafy vegetables and onion.',
        },
        humidity: {
          value: 71,
          unit: '%',
          dewPoint: 19.6,
          status: 'Optimal Moisture',
          blockVariance: '+1% vs block avg',
          advisory: 'Standard irrigation schedule recommended.',
        },
        wind: {
          speed: 9.4,
          unit: 'km/h',
          direction: 'W (260°)',
          gusts: 14.0,
          status: 'Gentle Breeze',
          blockVariance: '-0.3 km/h vs block avg',
          advisory: 'Safe window for drone surveillance and foliar spraying.',
        },
      }

    case 'ozar':
      return {
        rainfall: {
          value: 8,
          unit: 'mm',
          status: 'Isolated Drizzle',
          probability: 45,
          blockVariance: '-4.2 mm vs Niphad block',
          advisory: 'Low rain expected; normal farm activities can proceed.',
        },
        temperature: {
          current: 33.1,
          unit: '°C',
          min: 22.0,
          max: 34.2,
          feelsLike: 34.8,
          status: 'Sunny & Clear',
          blockVariance: '+0.6 °C vs block avg',
          advisory: 'Maintain light soil mulching to conserve moisture.',
        },
        humidity: {
          value: 68,
          unit: '%',
          dewPoint: 18.9,
          status: 'Comfortable',
          blockVariance: '-4% vs block avg',
          advisory: 'Favorable low humidity reduces bacterial blight risks.',
        },
        wind: {
          speed: 8.6,
          unit: 'km/h',
          direction: 'NW (315°)',
          gusts: 13.0,
          status: 'Light Air',
          blockVariance: '-1.1 km/h vs block avg',
          advisory: 'Very stable air column; ideal for nursery handling.',
        },
      }

    case 'pimpalgaon':
      return {
        rainfall: {
          value: 11,
          unit: 'mm',
          status: 'Scattered Rain',
          probability: 58,
          blockVariance: '-1.2 mm vs Niphad block',
          advisory: 'Beneficial for grape vineyard pruning and canopy wash.',
        },
        temperature: {
          current: 32.4,
          unit: '°C',
          min: 21.6,
          max: 33.5,
          feelsLike: 33.9,
          status: 'Clear Sky',
          blockVariance: '-0.1 °C vs block avg',
          advisory: 'Good sunlight exposure; monitor soil moisture levels.',
        },
        humidity: {
          value: 70,
          unit: '%',
          dewPoint: 19.8,
          status: 'Moderate',
          blockVariance: '-2% vs block avg',
          advisory: 'Ideal humidity for horticultural orchards.',
        },
        wind: {
          speed: 9.8,
          unit: 'km/h',
          direction: 'WNW (290°)',
          gusts: 15.2,
          status: 'Gentle Breeze',
          blockVariance: '+0.1 km/h vs block avg',
          advisory: 'Wind conditions suitable for all tractor fieldwork.',
        },
      }

    case 'pirangut':
      return {
        rainfall: {
          value: 24,
          unit: 'mm',
          status: 'Heavy Showers',
          probability: 88,
          blockVariance: '+6.8 mm vs Mulshi block',
          advisory: 'High rainfall warning; ensure open drainage channels in paddy.',
        },
        temperature: {
          current: 28.6,
          unit: '°C',
          min: 19.5,
          max: 29.8,
          feelsLike: 30.2,
          status: 'Overcast & Rainy',
          blockVariance: '-3.9 °C vs block avg',
          advisory: 'Cool daytime conditions; delay nitrogen top dressing.',
        },
        humidity: {
          value: 86,
          unit: '%',
          dewPoint: 22.6,
          status: 'Very High',
          blockVariance: '+14% vs block avg',
          advisory: 'High fungal risk; monitor paddy nursery beds carefully.',
        },
        wind: {
          speed: 14.8,
          unit: 'km/h',
          direction: 'SSW (200°)',
          gusts: 23.0,
          status: 'Breezy',
          blockVariance: '+5.1 km/h vs block avg',
          advisory: 'Gusty mountain winds; stake young horticultural saplings.',
        },
      }

    case 'paud':
      return {
        rainfall: {
          value: 21,
          unit: 'mm',
          status: 'Moderate to Heavy',
          probability: 84,
          blockVariance: '+3.8 mm vs Mulshi block',
          advisory: 'Check bunds in terraced fields to prevent soil runoff.',
        },
        temperature: {
          current: 29.2,
          unit: '°C',
          min: 20.0,
          max: 30.4,
          feelsLike: 31.0,
          status: 'Cloudy',
          blockVariance: '-3.3 °C vs block avg',
          advisory: 'Sufficient ambient cooling for standing crops.',
        },
        humidity: {
          value: 83,
          unit: '%',
          dewPoint: 22.0,
          status: 'High Moisture',
          blockVariance: '+11% vs block avg',
          advisory: 'Keep harvesting implements dry and protected under cover.',
        },
        wind: {
          speed: 13.5,
          unit: 'km/h',
          direction: 'SW (220°)',
          gusts: 20.0,
          status: 'Moderate Breeze',
          blockVariance: '+3.8 km/h vs block avg',
          advisory: 'Avoid high-altitude spray equipment in hill slopes.',
        },
      }

    case 'dubera':
    default:
      return {
        rainfall: {
          value: 16,
          unit: 'mm',
          status: 'Moderate Rain',
          probability: 74,
          blockVariance: '+2.1 mm vs Sinnar block',
          advisory: 'Sufficient topsoil recharge; safe for post-rain sowing.',
        },
        temperature: {
          current: 31.0,
          unit: '°C',
          min: 21.0,
          max: 32.5,
          feelsLike: 32.8,
          status: 'Partly Cloudy',
          blockVariance: '-1.5 °C vs Sinnar block',
          advisory: 'Normal thermal comfort; suitable for open field cultivation.',
        },
        humidity: {
          value: 74,
          unit: '%',
          dewPoint: 20.8,
          status: 'Optimal Moisture',
          blockVariance: '+4% vs Sinnar block',
          advisory: 'Favorable relative humidity for kharif grain filling.',
        },
        wind: {
          speed: 10.0,
          unit: 'km/h',
          direction: 'WSW (245°)',
          gusts: 16.0,
          status: 'Gentle Breeze',
          blockVariance: '-0.9 km/h vs Sinnar block',
          advisory: 'Optimal wind conditions for all standard agricultural tasks.',
        },
      }
  }
}

export function HomeWeatherSection() {
  const { t, getPlaceName, getConditionName, getAdvisoryText, language } = useLanguage()

  const [district, setDistrict] = useState('nashik')
  const [block, setBlock] = useState('sinnar')
  const [panchayat, setPanchayat] = useState('dubera')

  // Available blocks and panchayats filtered by parent selection
  const availableBlocks = useMemo(
    () => blocks.filter((b) => b.districtId === district),
    [district]
  )
  const availablePanchayats = useMemo(
    () => panchayats.filter((p) => p.blockId === block),
    [block]
  )

  const currentDistrict = districts.find((d) => d.id === district)
  const currentBlock = blocks.find((b) => b.id === block)
  const currentPanchayat = panchayats.find((p) => p.id === panchayat)

  // Cascading change handlers
  const handleDistrictChange = (newDistrictId: string) => {
    setDistrict(newDistrictId)
    const validBlocks = blocks.filter((b) => b.districtId === newDistrictId)
    const firstBlock = validBlocks[0]
    if (firstBlock) {
      setBlock(firstBlock.id)
      const validPanchayats = panchayats.filter((p) => p.blockId === firstBlock.id)
      const firstPanchayat = validPanchayats[0]
      if (firstPanchayat) {
        setPanchayat(firstPanchayat.id)
      }
    }
  }

  const handleBlockChange = (newBlockId: string) => {
    setBlock(newBlockId)
    const validPanchayats = panchayats.filter((p) => p.blockId === newBlockId)
    const firstPanchayat = validPanchayats[0]
    if (firstPanchayat) {
      setPanchayat(firstPanchayat.id)
    }
  }

  const weather = useMemo(() => getLocalizedWeather(panchayat), [panchayat])

  const formatVariance = (varianceStr: string) => {
    if (language === 'en') return varianceStr
    return varianceStr
      .replace('mm', 'मिमी')
      .replace('km/h', 'किमी/तास')
      .replace('°C', '°से')
      .replace('vs Sinnar block', 'सिन्नर सरासरीपेक्षा')
      .replace('vs Mulshi block', 'मुळशी सरासरीपेक्षा')
      .replace('vs block avg', 'तालुका सरासरीपेक्षा')
  }

  return (
    <section className="page-shell pt-4 pb-12">
      {/* Section Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow">{t('weather.grassrootsEyebrow', 'Grassroots Climate Intelligence')}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t('weather.liveDownscaled', 'Live Downscaled')}
            </span>
          </div>
          <h2 className="section-title mt-1.5">
            {t('weather.dashboardTitle', 'Panchayat Weather Dashboard')}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(
              'weather.dashboardDesc',
              'Precision micro-climate outlook downscaled from block forecasts using elevation, GIS, and satellite data.'
            )}
          </p>
        </div>
        <div className="hidden sm:block">
          <DemoBadge label={language === 'mr' ? 'थेट डाउनस्केलिंग मॉडेल' : 'Real-time downscaling model'} />
        </div>
      </div>

      {/* Control: "Select District → Block → Panchayat" */}
      <div className="mt-6 rounded-xl border bg-card p-4 shadow-sm transition-all sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MapPin className="size-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-foreground sm:text-base">
                  {t('weather.selectLocationTitle', 'Select District → Block → Panchayat')}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                {t(
                  'weather.selectLocationDesc',
                  'Filter localized weather parameters by your administrative location'
                )}
              </p>
            </div>
          </div>

          {/* Cascading Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* 1. District */}
            <div className="min-w-[130px] flex-1 sm:flex-initial">
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {t('weather.district', 'District')}
              </label>
              <Select value={district} onValueChange={handleDistrictChange}>
                <SelectTrigger className="h-9.5 bg-background text-xs font-medium">
                  <SelectValue placeholder={t('weather.district', 'District')} />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((d) => (
                    <SelectItem key={d.id} value={d.id} className="text-xs">
                      {getPlaceName(d.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ChevronRight className="mt-4 hidden size-4 text-muted-foreground/60 sm:block" />

            {/* 2. Block */}
            <div className="min-w-[130px] flex-1 sm:flex-initial">
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {t('weather.block', 'Block')}
              </label>
              <Select value={block} onValueChange={handleBlockChange}>
                <SelectTrigger className="h-9.5 bg-background text-xs font-medium">
                  <SelectValue placeholder={t('weather.block', 'Block')} />
                </SelectTrigger>
                <SelectContent>
                  {availableBlocks.map((b) => (
                    <SelectItem key={b.id} value={b.id} className="text-xs">
                      {getPlaceName(b.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ChevronRight className="mt-4 hidden size-4 text-muted-foreground/60 sm:block" />

            {/* 3. Panchayat */}
            <div className="min-w-[145px] flex-1 sm:flex-initial">
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {t('weather.panchayat', 'Panchayat')}
              </label>
              <Select value={panchayat} onValueChange={setPanchayat}>
                <SelectTrigger className="h-9.5 bg-background text-xs font-semibold text-primary border-primary/40 shadow-xs">
                  <SelectValue placeholder={t('weather.panchayat', 'Panchayat')} />
                </SelectTrigger>
                <SelectContent>
                  {availablePanchayats.map((p) => (
                    <SelectItem key={p.id} value={p.id} className="text-xs font-medium">
                      {getPlaceName(p.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Current Active Location Pill */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs">
          <div className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
            <span className="font-semibold text-foreground">
              {t('weather.currentLocation', 'Current Location:')}
            </span>
            <span className="font-medium text-foreground">{getPlaceName(currentDistrict?.name ?? '')}</span>
            <span>→</span>
            <span className="font-medium text-foreground">
              {getPlaceName(currentBlock?.name ?? '')} {language === 'mr' ? 'तालुका' : 'Block'}
            </span>
            <span>→</span>
            <span className="rounded bg-primary/10 px-2 py-0.5 font-bold text-primary">
              {getPlaceName(currentPanchayat?.name ?? '')} {language === 'mr' ? 'ग्रामपंचायत' : 'Gram Panchayat'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="size-3 text-muted-foreground" />
              <span>
                {t('weather.forecastDate', 'Forecast Date:')} {language === 'mr' ? '२२ सप्टेंबर २०२६' : '22 Sep 2026'}
              </span>
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline font-mono">
              {t('weather.center', 'Center:')} {currentPanchayat?.center[0]}°N, {currentPanchayat?.center[1]}°E
            </span>
          </div>
        </div>
      </div>

      {/* 4 Weather Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: 🌧 Rainfall */}
        <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-sky-500/25 bg-gradient-to-br from-sky-50/70 via-card to-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/50 hover:shadow-md dark:from-sky-950/20">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  🌧 {t('metric.rainfall', 'Rainfall')}
                </span>
                <h3 className="mt-0.5 text-sm font-semibold text-foreground">
                  {t('metric.precipitation', 'Precipitation')}
                </h3>
              </div>
              <div className="flex size-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 transition-transform group-hover:scale-110 dark:text-sky-400">
                <CloudRain className="size-5" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {weather.rainfall.value}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {language === 'mr' ? 'मिमी' : weather.rainfall.unit}
              </span>
              <span className="ml-auto rounded-full bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-sky-700 dark:text-sky-300">
                {getConditionName(weather.rainfall.status)}
              </span>
            </div>

            {/* Precipitation Bar */}
            <div className="mt-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-sky-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, (weather.rainfall.value / 30) * 100)}%` }}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
                <span>
                  {language === 'mr' ? 'पावसाची शक्यता:' : 'Rain Chance:'} {weather.rainfall.probability}%
                </span>
                <span className="font-medium text-sky-600 dark:text-sky-400">
                  {formatVariance(weather.rainfall.blockVariance)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-border/60 pt-3 text-[11px] leading-relaxed text-muted-foreground">
            <b>{t('metric.advisory', 'Agronomic advisory:')}</b> {getAdvisoryText(weather.rainfall.advisory)}
          </div>
        </article>

        {/* Card 2: 🌡 Temperature */}
        <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-amber-500/25 bg-gradient-to-br from-amber-50/70 via-card to-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-md dark:from-amber-950/20">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  🌡 {t('metric.temperature', 'Temperature')}
                </span>
                <h3 className="mt-0.5 text-sm font-semibold text-foreground">
                  {t('metric.thermalCondition', 'Thermal Profile')}
                </h3>
              </div>
              <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 transition-transform group-hover:scale-110 dark:text-amber-400">
                <Thermometer className="size-5" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {weather.temperature.current.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {weather.temperature.unit}
              </span>
              <span className="ml-auto rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                {t('metric.feelsLike', 'Feels')} {weather.temperature.feelsLike.toFixed(1)}°C
              </span>
            </div>

            {/* Temperature Gauge */}
            <div className="mt-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, (weather.temperature.current / 45) * 100)}%` }}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
                <span>
                  {weather.temperature.min}°C – {weather.temperature.max}°C
                </span>
                <span className="font-medium text-amber-600 dark:text-amber-400">
                  {formatVariance(weather.temperature.blockVariance)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-border/60 pt-3 text-[11px] leading-relaxed text-muted-foreground">
            <b>{t('metric.advisory', 'Agronomic advisory:')}</b> {getAdvisoryText(weather.temperature.advisory)}
          </div>
        </article>

        {/* Card 3: 💧 Humidity */}
        <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-teal-500/25 bg-gradient-to-br from-teal-50/70 via-card to-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/50 hover:shadow-md dark:from-teal-950/20">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  💧 {t('metric.humidity', 'Humidity')}
                </span>
                <h3 className="mt-0.5 text-sm font-semibold text-foreground">
                  {t('metric.relativeMoisture', 'Relative Moisture')}
                </h3>
              </div>
              <div className="flex size-9 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 transition-transform group-hover:scale-110 dark:text-teal-400">
                <Droplets className="size-5" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {weather.humidity.value}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {weather.humidity.unit}
              </span>
              <span className="ml-auto rounded-full bg-teal-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-teal-700 dark:text-teal-300">
                {getConditionName(weather.humidity.status)}
              </span>
            </div>

            {/* Humidity Bar */}
            <div className="mt-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-teal-500 transition-all duration-500"
                  style={{ width: `${weather.humidity.value}%` }}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
                <span>
                  {t('metric.dewPoint', 'Dew point')}: {weather.humidity.dewPoint}°C
                </span>
                <span className="font-medium text-teal-600 dark:text-teal-400">
                  {formatVariance(weather.humidity.blockVariance)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-border/60 pt-3 text-[11px] leading-relaxed text-muted-foreground">
            <b>{t('metric.advisory', 'Agronomic advisory:')}</b> {getAdvisoryText(weather.humidity.advisory)}
          </div>
        </article>

        {/* Card 4: 💨 Wind Speed */}
        <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-indigo-500/25 bg-gradient-to-br from-indigo-50/70 via-card to-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-md dark:from-indigo-950/20">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  💨 {t('metric.windSpeed', 'Wind Speed')}
                </span>
                <h3 className="mt-0.5 text-sm font-semibold text-foreground">
                  {t('metric.airCirculation', 'Air Circulation')}
                </h3>
              </div>
              <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 transition-transform group-hover:scale-110 dark:text-indigo-400">
                <Wind className="size-5" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {weather.wind.speed.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {language === 'mr' ? 'किमी/तास' : weather.wind.unit}
              </span>
              <span className="ml-auto rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
                {getConditionName(weather.wind.status)}
              </span>
            </div>

            {/* Wind Speed Bar */}
            <div className="mt-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, (weather.wind.speed / 35) * 100)}%` }}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Compass className="size-3" />
                  {weather.wind.direction}
                </span>
                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                  {formatVariance(weather.wind.blockVariance)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-border/60 pt-3 text-[11px] leading-relaxed text-muted-foreground">
            <b>{t('metric.advisory', 'Agronomic advisory:')}</b> {getAdvisoryText(weather.wind.advisory)}
          </div>
        </article>
      </div>

      {/* Downscaling Insights & Direct Links */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-surface/70 px-5 py-3.5 text-xs shadow-xs">
        <div className="flex items-center gap-2.5 text-muted-foreground">
          <BrainCircuit className="size-4 shrink-0 text-primary" />
          <span>
            <b>{t('ai.calibrationTitle', 'AI Spatial Calibration:')}</b>{' '}
            {t(
              'ai.calibrationText',
              'Multi-source models adjust IMD block forecasts using SRTM elevation, NDVI vegetation index, and local topography.'
            )}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/crop-advisory"
            search={{ panchayat: currentPanchayat?.id }}
            className="flex items-center gap-1.5 font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 transition-colors"
          >
            🌾 {language === 'mr' ? 'पीक सल्ला मिळवा' : language === 'hi' ? 'फसल सलाह प्राप्त करें' : 'Get Crop Advisory'} <ArrowRight className="size-3.5" />
          </Link>
          <span className="text-muted-foreground/40 hidden sm:inline">|</span>
          <Link
            to="/forecast"
            className="flex items-center gap-1.5 font-semibold text-primary transition-colors hover:text-primary/80"
          >
            {t('ai.detailedForecast', 'Detailed 7-Day Forecast')} <ArrowRight className="size-3.5" />
          </Link>
          <span className="text-muted-foreground/40 hidden sm:inline">|</span>
          <Link
            to="/weather-map"
            className="flex items-center gap-1.5 font-semibold text-primary transition-colors hover:text-primary/80"
          >
            {t('ai.openGisMap', 'Open in GIS Weather Map')} <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

