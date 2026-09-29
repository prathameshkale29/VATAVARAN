'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { Link } from '@tanstack/react-router'
import {
  AlertTriangle,
  AlertOctagon,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Volume2,
  VolumeX,
  Share2,
  Send,
  PhoneCall,
  Phone,
  MapPin,
  Sliders,
  Sparkles,
  CloudRain,
  ThermometerSun,
  Wind,
  Sprout,
  RefreshCw,
  Clock,
  ArrowUpRight,
  Radio,
  Filter,
  Check,
  Building2,
  Search,
  BellRing,
  Flame,
  Zap,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'
import {
  AGRO_ALERTS_DATA,
  IMD_SEVERITY_CONFIG,
  EMERGENCY_HELPLINES,
  type AgroAlert,
  type IMDSeverity,
} from '@/data/alerts-data'
import { districts, blocks, panchayats } from '@/data/mock-weather'

export function AlertsView() {
  const { language, getPlaceName } = useLanguage()

  // Filters state
  const [selectedSeverity, setSelectedSeverity] = useState<IMDSeverity | 'all'>('all')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all')
  const [selectedBlock, setSelectedBlock] = useState<string>('all')
  const [selectedCrop, setSelectedCrop] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Speech TTS state
  const [speakingAlertId, setSpeakingAlertId] = useState<string | null>(null)

  // SMS Simulation state
  const [smsFeedback, setSmsFeedback] = useState<{ id: string; message: string } | null>(null)

  // Live Refresh Telemetry state
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('Just now')

  // Threshold Simulator state
  const [simulatedRain, setSimulatedRain] = useState<number>(25)
  const [simulatedTemp, setSimulatedTemp] = useState<number>(32)

  // Handle Speech Synthesis
  const handleToggleVoice = useCallback(
    (alert: AgroAlert) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        window.alert('Speech synthesis is not supported on this browser.')
        return
      }

      if (speakingAlertId === alert.id) {
        window.speechSynthesis.cancel()
        setSpeakingAlertId(null)
        return
      }

      window.speechSynthesis.cancel()
      const textToSpeak = language === 'mr' ? alert.audioScript.mr : alert.audioScript.en
      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.lang = language === 'mr' ? 'mr-IN' : 'en-IN'
      utterance.rate = 0.95

      utterance.onend = () => setSpeakingAlertId(null)
      utterance.onerror = () => setSpeakingAlertId(null)

      setSpeakingAlertId(alert.id)
      window.speechSynthesis.speak(utterance)
    },
    [speakingAlertId, language]
  )

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Handle WhatsApp Share
  const handleWhatsAppShare = (alert: AgroAlert) => {
    const isMr = language === 'mr'
    const severityLabel = isMr ? IMD_SEVERITY_CONFIG[alert.severity].labelMr : IMD_SEVERITY_CONFIG[alert.severity].labelEn
    const title = isMr ? alert.title.mr : alert.title.en
    const headline = isMr ? alert.headline.mr : alert.headline.en
    const panchayat = isMr ? alert.panchayatName.mr : alert.panchayatName.en
    const block = isMr ? alert.blockName.mr : alert.blockName.en
    const district = isMr ? alert.districtName.mr : alert.districtName.en

    const dosText = alert.actions.dos.map((d, i) => `✅ ${isMr ? d.mr : d.en}`).join('\n')
    const dontsText = alert.actions.donts.map((d, i) => `❌ ${isMr ? d.mr : d.en}`).join('\n')

    const message = `🚨 *VataVaran Agro-Climate Alert* 🚨\n\n` +
      `⚠️ *${severityLabel}*\n` +
      `📍 *${panchayat}*, ${block} (${district})\n\n` +
      `📋 *${title}*\n${headline}\n\n` +
      `⏱️ *Trigger:* ${alert.metricTrigger.currentValue} (Threshold: ${alert.metricTrigger.thresholdValue})\n\n` +
      `🌾 *करावे (Do's):*\n${dosText}\n\n` +
      `🚫 *टाळावे (Don'ts):*\n${dontsText}\n\n` +
      `📞 *Kisan Helpline:* 1800-180-1551\n` +
      `🌐 *Live 1km Map:* ${typeof window !== 'undefined' ? window.location.origin : ''}/weather-map`

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  // Handle Simulated SMS Dispatch
  const handleSimulateSms = (alertId: string, panchayatName: string) => {
    setSmsFeedback({
      id: alertId,
      message: language === 'mr'
        ? `इशारा संदेश ${panchayatName} मधील ४२० नोंदणीकृत शेतकऱ्यांना यशस्वीरीत्या पाठवला!`
        : `Emergency SMS dispatched to 420 registered farmers in ${panchayatName}!`,
    })
    setTimeout(() => setSmsFeedback(null), 4500)
  }

  // Handle Telemetry Refresh
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      const now = new Date()
      setLastRefreshedTime(
        `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
      )
    }, 900)
  }

  // Distinct crop list
  const availableCrops = useMemo(() => {
    const crops = new Set<string>()
    AGRO_ALERTS_DATA.forEach((a) => {
      a.affectedCrops.forEach((c) => crops.add(c.crop))
    })
    return Array.from(crops)
  }, [])

  // Filtered Alerts
  const filteredAlerts = useMemo(() => {
    return AGRO_ALERTS_DATA.filter((a) => {
      if (selectedSeverity !== 'all' && a.severity !== selectedSeverity) return false
      if (selectedDistrict !== 'all' && a.districtId !== selectedDistrict) return false
      if (selectedBlock !== 'all' && a.blockId !== selectedBlock) return false
      if (selectedCrop !== 'all' && !a.affectedCrops.some((c) => c.crop === selectedCrop)) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesText =
          a.title.en.toLowerCase().includes(q) ||
          a.title.mr.toLowerCase().includes(q) ||
          a.panchayatName.en.toLowerCase().includes(q) ||
          a.panchayatName.mr.toLowerCase().includes(q) ||
          a.blockName.en.toLowerCase().includes(q) ||
          a.districtName.en.toLowerCase().includes(q)
        if (!matchesText) return false
      }
      return true
    })
  }, [selectedSeverity, selectedDistrict, selectedBlock, selectedCrop, searchQuery])

  // Counts by severity
  const severityCounts = useMemo(() => {
    return {
      red: AGRO_ALERTS_DATA.filter((a) => a.severity === 'red').length,
      orange: AGRO_ALERTS_DATA.filter((a) => a.severity === 'orange').length,
      yellow: AGRO_ALERTS_DATA.filter((a) => a.severity === 'yellow').length,
      green: AGRO_ALERTS_DATA.filter((a) => a.severity === 'green').length,
    }
  }, [])

  // Active critical ticker alert
  const tickerAlert = useMemo(() => {
    return AGRO_ALERTS_DATA.find((a) => a.severity === 'red') || AGRO_ALERTS_DATA[0]
  }, [])

  // Simulated threshold calculation
  const simulatedRisk = useMemo(() => {
    if (simulatedRain >= 40 || simulatedTemp >= 38) {
      return {
        severity: 'red' as IMDSeverity,
        title: language === 'mr' ? 'लाल इशारा (गंभीर धोका)' : 'Red Warning (Critical Threat)',
        desc: language === 'mr'
          ? `पाऊस ${simulatedRain} मिमी / तापमान ${simulatedTemp}° से. मुळे पिकांना तातडीने धोका आहे.`
          : `Rainfall ${simulatedRain}mm / Temp ${simulatedTemp}°C exceeds emergency threshold.`,
      }
    } else if (simulatedRain >= 25 || simulatedTemp >= 35) {
      return {
        severity: 'orange' as IMDSeverity,
        title: language === 'mr' ? 'केशरी इशारा (सतर्कता)' : 'Orange Alert (High Caution)',
        desc: language === 'mr'
          ? `पाऊस ${simulatedRain} मिमी किंवा तापमान ${simulatedTemp}° से. मुळे फवारणी थांबवावी लागेल.`
          : `Conditions reach caution threshold. Spraying and irrigation adjustments required.`,
      }
    } else if (simulatedRain >= 15 || simulatedTemp >= 33) {
      return {
        severity: 'yellow' as IMDSeverity,
        title: language === 'mr' ? 'पिवळा इशारा (सावध राहा)' : 'Yellow Watch (Monitor Weather)',
        desc: language === 'mr'
          ? `हवामानात मध्यम बदल; शेतातील पाण्याचा निचरा तपासा.`
          : `Moderate weather transition; inspect field drainage.`,
      }
    } else {
      return {
        severity: 'green' as IMDSeverity,
        title: language === 'mr' ? 'हिरवा (अनुकूल हवामान)' : 'Green (All Clear)',
        desc: language === 'mr'
          ? `हवामान पूर्णपणे सुरक्षित व शेतीकामांसाठी उत्तम आहे.`
          : `Weather conditions are safe and favorable for all agricultural tasks.`,
      }
    }
  }, [simulatedRain, simulatedTemp, language])

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. TOP EMERGENCY MARQUEE TICKER (High-Impact Banner) */}
      {tickerAlert && (
        <div className="border-b border-rose-200 bg-gradient-to-r from-rose-700 via-red-600 to-rose-700 text-white shadow-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider backdrop-blur-xs shrink-0 animate-pulse">
                <BellRing className="size-3.5 text-yellow-300" />
                {language === 'mr' ? 'थेट आपत्कालीन इशारा' : 'Live Urgent Warning'}
              </span>
              <p className="truncate text-xs sm:text-sm font-semibold tracking-wide">
                <span className="font-extrabold text-yellow-200 underline decoration-yellow-400 decoration-wavy underline-offset-2">
                  {language === 'mr' ? tickerAlert.panchayatName.mr : tickerAlert.panchayatName.en} (
                  {language === 'mr' ? tickerAlert.blockName.mr : tickerAlert.blockName.en}):
                </span>{' '}
                {language === 'mr' ? tickerAlert.headline.mr : tickerAlert.headline.en}
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 shrink-0">
              <Link
                to="/weather-map"
                className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-rose-800 hover:bg-yellow-50 transition-colors shadow-xs"
              >
                <Radio className="size-3 text-rose-600 animate-ping" />
                {language === 'mr' ? 'नकाशावर थेट पहा' : 'View on Radar'} →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. HERO PAGE HEADER & TELEMETRY CONTROLS */}
      <div className="relative border-b border-slate-200 bg-white pt-8 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-300">
                  <ShieldAlert className="size-3.5 text-emerald-700" />
                  {language === 'mr' ? 'आयएमडी ४-स्तरीय रंग संकेत प्रणाली' : 'IMD 4-Color Protocol'}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 border border-slate-200">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  {language === 'mr' ? 'थेट उपग्रह व रडार सिंक' : 'Live Satellite & Radar Synced'}
                </span>
              </div>

              <h1 className="mt-3 text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
                {language === 'mr'
                  ? 'हवामान इशारे व शेतीविषयक पूर्वसूचना'
                  : 'Agro-Climate Alerts & Early Warnings'}
              </h1>
              <p className="mt-2 max-w-3xl text-sm sm:text-base text-slate-600 leading-relaxed">
                {language === 'mr'
                  ? '१ किमी सूक्ष्म-हवामान मॉडेल व उपग्रह डेटावरून थेट काढलेले शेती इशारे. अतिवृष्टी, गारपीट, उष्णतेची लाट आणि किडी-रोगांपासून पिकांचे रक्षण करण्यासाठी प्रमाणित मार्गदर्शन.'
                  : 'Hyperlocal 1km weather downscaling and IMD thresholds evaluated for every Gram Panchayat. Real-time protection guidance for soybean, cotton, onions, and orchards.'}
              </p>
            </div>

            {/* Quick Actions & Live Sync Pill */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href="tel:18001801551"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                title="Direct call to Kisan Call Center"
              >
                <PhoneCall className="size-4 animate-bounce" />
                <div className="text-left">
                  <span className="block text-[10px] font-medium opacity-90">
                    {language === 'mr' ? 'किसान कॉल सेंटर' : 'Kisan Helpline (Toll-Free)'}
                  </span>
                  <span className="font-extrabold text-sm tracking-wide">1800-180-1551</span>
                </div>
              </a>

              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold h-11 px-3.5 shadow-xs"
              >
                <RefreshCw className={`size-3.5 mr-1.5 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
                <span>
                  {language === 'mr' ? 'अपडेट करा' : 'Sync'} ({lastRefreshedTime})
                </span>
              </Button>
            </div>
          </div>

          {/* 3. IMD 4-TIER SEVERITY SUMMARY CARDS (Clickable Filter Badges) */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {/* Red Warning */}
            <button
              type="button"
              onClick={() => setSelectedSeverity(selectedSeverity === 'red' ? 'all' : 'red')}
              className={`rounded-2xl border p-4 text-left transition-all cursor-pointer shadow-xs ${
                selectedSeverity === 'red'
                  ? 'border-rose-500 bg-rose-50/90 ring-2 ring-rose-500 shadow-md scale-[1.02]'
                  : 'border-rose-200 bg-rose-50/40 hover:bg-rose-50/80 hover:border-rose-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-xl bg-rose-600 text-white font-black text-sm shadow-sm">
                  <AlertOctagon className="size-5" />
                </span>
                <span className="text-2xl font-black text-rose-700">{severityCounts.red}</span>
              </div>
              <h3 className="mt-3 text-xs sm:text-sm font-bold text-rose-950 uppercase tracking-tight">
                {language === 'mr' ? 'लाल इशारा' : 'Red Warning'}
              </h3>
              <p className="text-[11px] font-medium text-rose-800 mt-0.5">
                {language === 'mr' ? 'तात्काळ कृती करा (अतिधोका)' : 'Take Immediate Action'}
              </p>
            </button>

            {/* Orange Alert */}
            <button
              type="button"
              onClick={() => setSelectedSeverity(selectedSeverity === 'orange' ? 'all' : 'orange')}
              className={`rounded-2xl border p-4 text-left transition-all cursor-pointer shadow-xs ${
                selectedSeverity === 'orange'
                  ? 'border-amber-500 bg-amber-50/90 ring-2 ring-amber-500 shadow-md scale-[1.02]'
                  : 'border-amber-200 bg-amber-50/40 hover:bg-amber-50/80 hover:border-amber-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-xl bg-amber-600 text-white font-black text-sm shadow-sm">
                  <AlertTriangle className="size-5" />
                </span>
                <span className="text-2xl font-black text-amber-700">{severityCounts.orange}</span>
              </div>
              <h3 className="mt-3 text-xs sm:text-sm font-bold text-amber-950 uppercase tracking-tight">
                {language === 'mr' ? 'केशरी इशारा' : 'Orange Alert'}
              </h3>
              <p className="text-[11px] font-medium text-amber-800 mt-0.5">
                {language === 'mr' ? 'पूर्ण सतर्क राहा' : 'Be Prepared'}
              </p>
            </button>

            {/* Yellow Watch */}
            <button
              type="button"
              onClick={() => setSelectedSeverity(selectedSeverity === 'yellow' ? 'all' : 'yellow')}
              className={`rounded-2xl border p-4 text-left transition-all cursor-pointer shadow-xs ${
                selectedSeverity === 'yellow'
                  ? 'border-yellow-400 bg-yellow-50/90 ring-2 ring-yellow-400 shadow-md scale-[1.02]'
                  : 'border-yellow-200 bg-yellow-50/40 hover:bg-yellow-50/80 hover:border-yellow-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-xl bg-yellow-500 text-slate-950 font-black text-sm shadow-sm">
                  <ShieldAlert className="size-5" />
                </span>
                <span className="text-2xl font-black text-yellow-800">{severityCounts.yellow}</span>
              </div>
              <h3 className="mt-3 text-xs sm:text-sm font-bold text-yellow-950 uppercase tracking-tight">
                {language === 'mr' ? 'पिवळा इशारा' : 'Yellow Watch'}
              </h3>
              <p className="text-[11px] font-medium text-yellow-800 mt-0.5">
                {language === 'mr' ? 'हवामानावर लक्ष ठेवा' : 'Be Updated'}
              </p>
            </button>

            {/* Green All Clear */}
            <button
              type="button"
              onClick={() => setSelectedSeverity(selectedSeverity === 'green' ? 'all' : 'green')}
              className={`rounded-2xl border p-4 text-left transition-all cursor-pointer shadow-xs ${
                selectedSeverity === 'green'
                  ? 'border-emerald-500 bg-emerald-50/90 ring-2 ring-emerald-500 shadow-md scale-[1.02]'
                  : 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50/80 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-xl bg-emerald-600 text-white font-black text-sm shadow-sm">
                  <CheckCircle2 className="size-5" />
                </span>
                <span className="text-2xl font-black text-emerald-700">{severityCounts.green}</span>
              </div>
              <h3 className="mt-3 text-xs sm:text-sm font-bold text-emerald-950 uppercase tracking-tight">
                {language === 'mr' ? 'हिरवा (अनुकूल)' : 'Green (Normal)'}
              </h3>
              <p className="text-[11px] font-medium text-emerald-800 mt-0.5">
                {language === 'mr' ? 'नियमित कामे सुरू ठेवा' : 'Normal Farm Operations'}
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* 4. SMART LOCATION & CROP FILTER PANEL */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Geographic Dropdowns */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <MapPin className="size-3.5 text-emerald-600" />
                {language === 'mr' ? 'स्थान निवडा:' : 'Filter Location:'}
              </span>

              {/* District */}
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value)
                  setSelectedBlock('all')
                }}
                className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">{language === 'mr' ? 'सर्व जिल्हे (All Districts)' : 'All Districts'}</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {getPlaceName(d.name)} {language === 'mr' ? 'जिल्हा' : 'Dist.'}
                  </option>
                ))}
              </select>

              {/* Block */}
              <select
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">{language === 'mr' ? 'सर्व तालुके (All Blocks)' : 'All Blocks'}</option>
                {blocks
                  .filter((b) => selectedDistrict === 'all' || b.districtId === selectedDistrict)
                  .map((b) => (
                    <option key={b.id} value={b.id}>
                      {getPlaceName(b.name)} {language === 'mr' ? 'तालुका' : 'Block'}
                    </option>
                  ))}
              </select>

              {/* Reset filter button */}
              {(selectedDistrict !== 'all' || selectedBlock !== 'all' || selectedSeverity !== 'all' || selectedCrop !== 'all' || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDistrict('all')
                    setSelectedBlock('all')
                    setSelectedSeverity('all')
                    setSelectedCrop('all')
                    setSearchQuery('')
                  }}
                  className="text-xs font-bold text-rose-600 hover:text-rose-800 underline decoration-rose-300 cursor-pointer ml-1"
                >
                  {language === 'mr' ? 'फिल्टर रीसेट' : 'Reset All'}
                </button>
              )}
            </div>

            {/* Right: Quick Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'mr' ? 'गाव, तालुका किंवा हवामान शोधा...' : 'Search Panchayat or Hazard...'}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-9 pr-3 py-1.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Crop Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3">
            <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Sprout className="size-3.5 text-emerald-600" />
              {language === 'mr' ? 'पिकानुसार निवडा:' : 'Crop Filter:'}
            </span>
            <button
              type="button"
              onClick={() => setSelectedCrop('all')}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                selectedCrop === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {language === 'mr' ? 'सर्व पिके' : 'All Crops'}
            </button>
            {availableCrops.map((crop) => (
              <button
                type="button"
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                  selectedCrop === crop
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                🌾 {crop}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. SMS DISPATCH NOTIFICATION FEEDBACK (When Triggered) */}
      {smsFeedback && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-3.5 text-xs font-bold text-emerald-900 shadow-md">
            <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
            <span>{smsFeedback.message}</span>
          </div>
        </div>
      )}

      {/* 6. MAIN ALERTS CARDS GRID */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900">
              {language === 'mr' ? 'सक्रीय हवामान इशारे' : 'Active Weather Advisories'}
            </h2>
            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-700">
              {filteredAlerts.length}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium hidden sm:block">
            {language === 'mr' ? '१ किमी पंचायत पातळीवरील अचूक अंदाज' : 'Downscaled 1km Panchayat Predictions'}
          </p>
        </div>

        {filteredAlerts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <CheckCircle2 className="mx-auto size-12 text-emerald-500" />
            <h3 className="mt-3 text-base font-bold text-slate-900">
              {language === 'mr' ? 'कोणताही धोकादायक इशारा नाही' : 'No Critical Alerts Found'}
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
              {language === 'mr'
                ? 'निवडलेल्या निकषांनुसार सर्व हवामान सामान्य आहे. शेतकरी नियमित कामे सुरू ठेवू शकतात.'
                : 'All parameters in the selected location are currently within normal baseline limits.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredAlerts.map((alert) => {
              const cfg = IMD_SEVERITY_CONFIG[alert.severity]
              const isSpeaking = speakingAlertId === alert.id

              return (
                <article
                  key={alert.id}
                  className={`relative overflow-hidden rounded-3xl border bg-white shadow-md transition-all hover:shadow-xl ${cfg.border}`}
                >
                  {/* Card Header Banner (Severity Color Gradient) */}
                  <div className={`px-5 py-3.5 flex items-center justify-between ${cfg.bannerBg}`}>
                    <div className="flex items-center gap-2">
                      <span className={`size-2.5 rounded-full ${cfg.pulseColor} animate-ping`} />
                      <span className="text-xs font-black tracking-wider uppercase">
                        {language === 'mr' ? cfg.labelMr : cfg.labelEn}
                      </span>
                    </div>

                    <span className="text-[11px] font-medium opacity-90 flex items-center gap-1">
                      <Clock className="size-3" />
                      {alert.issuedAt}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6 space-y-5">
                    {/* Location Title & Downscaling Tag */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                          <MapPin className="size-3.5 text-emerald-600" />
                          <span>
                            {language === 'mr' ? alert.panchayatName.mr : alert.panchayatName.en} (
                            {language === 'mr' ? alert.blockName.mr : alert.blockName.en} ·{' '}
                            {language === 'mr' ? alert.districtName.mr : alert.districtName.en})
                          </span>
                        </div>
                        <h3 className="mt-1.5 text-lg font-black text-slate-900 leading-snug">
                          {language === 'mr' ? alert.title.mr : alert.title.en}
                        </h3>
                      </div>

                      <span className="shrink-0 rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1 text-[10px] font-black text-slate-700">
                        1KM AI
                      </span>
                    </div>

                    {/* Headline and Description */}
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                      {language === 'mr' ? alert.headline.mr : alert.headline.en}
                    </p>

                    {/* Parameter Trigger Comparison Box */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5">
                        <span className="flex items-center gap-1">
                          <Sliders className="size-3.5 text-indigo-600" />
                          {language === 'mr' ? alert.metricTrigger.parameter.mr : alert.metricTrigger.parameter.en}
                        </span>
                        <span className="text-rose-700 font-bold">{alert.metricTrigger.variance}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 items-center pt-1 border-t border-slate-200">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">
                            {language === 'mr' ? 'सध्याचे मोजमाप' : 'Observed Value'}
                          </span>
                          <strong className="text-base font-black text-slate-900">
                            {alert.metricTrigger.currentValue}
                          </strong>
                        </div>
                        <div className="border-l border-slate-200 pl-3">
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">
                            {language === 'mr' ? 'धोकादायक मर्यादा' : 'Hazard Threshold'}
                          </span>
                          <strong className="text-base font-black text-rose-700">
                            {alert.metricTrigger.thresholdValue}
                          </strong>
                        </div>
                      </div>

                      <div className="mt-2.5 text-[11px] text-slate-500 flex items-center gap-1 border-t border-slate-200/80 pt-2">
                        <Clock className="size-3 text-slate-400" />
                        <span>
                          {language === 'mr' ? 'धोक्याचा कालावधी:' : 'High Risk Window:'}{' '}
                          <b className="text-slate-800 font-semibold">
                            {language === 'mr' ? alert.forecastWindow.mr : alert.forecastWindow.en}
                          </b>
                        </span>
                      </div>
                    </div>

                    {/* Affected Crops Pill Badges */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                        {language === 'mr' ? 'बाधित होणारी पिके व धोका:' : 'Vulnerable Crops & Risk:'}
                      </span>
                      <div className="space-y-2">
                        {alert.affectedCrops.map((c) => (
                          <div
                            key={c.crop}
                            className="rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-700"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                                <Sprout className="size-3.5 text-emerald-600" />
                                {language === 'mr' ? c.cropMr : c.crop}
                              </span>
                              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                                {language === 'mr' ? c.stage.mr : c.stage.en}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-normal">
                              {language === 'mr' ? c.impact.mr : c.impact.en}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actionable Do's & Don'ts Checklist */}
                    <div className="grid gap-3 sm:grid-cols-2 pt-1">
                      {/* Do's (करावे) */}
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-3">
                        <span className="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1 mb-2">
                          <CheckCircle2 className="size-3.5 text-emerald-600" />
                          {language === 'mr' ? 'शेतकऱ्यांनी काय करावे (Do’s)' : 'Recommended Actions (Do’s)'}
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {alert.actions.dos.map((d, i) => (
                            <li key={i} className="flex items-start gap-1.5 leading-snug">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{language === 'mr' ? d.mr : d.en}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Don'ts (टाळावे) */}
                      <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-3">
                        <span className="text-xs font-black text-rose-800 uppercase tracking-wider flex items-center gap-1 mb-2">
                          <XCircle className="size-3.5 text-rose-600" />
                          {language === 'mr' ? 'काय टाळावे (Don’ts)' : 'Critical Precautions (Don’ts)'}
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {alert.actions.donts.map((d, i) => (
                            <li key={i} className="flex items-start gap-1.5 leading-snug">
                              <span className="text-rose-600 font-bold">✕</span>
                              <span>{language === 'mr' ? d.mr : d.en}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Buttons: Audio Voice TTS, WhatsApp Share, SMS Dispatch, View on GIS */}
                    <div className="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Audio Voice Alert Button */}
                        <Button
                          variant={isSpeaking ? 'destructive' : 'outline'}
                          size="sm"
                          onClick={() => handleToggleVoice(alert)}
                          className={`text-xs font-bold ${
                            isSpeaking
                              ? 'bg-rose-600 text-white animate-pulse'
                              : 'border-slate-300 text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300'
                          }`}
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="size-3.5 mr-1.5" />
                              {language === 'mr' ? 'आवाज थांबवा' : 'Stop Audio'}
                            </>
                          ) : (
                            <>
                              <Volume2 className="size-3.5 mr-1.5 text-emerald-600" />
                              {language === 'mr' ? 'आवाज ऐका (मराठी)' : 'Listen Voice Alert'}
                            </>
                          )}
                        </Button>

                        {/* WhatsApp Share Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleWhatsAppShare(alert)}
                          className="border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 hover:text-emerald-950 text-xs font-bold"
                          title="Share formatted advisory to WhatsApp groups"
                        >
                          <Share2 className="size-3.5 mr-1.5 text-emerald-600" />
                          <span>WhatsApp</span>
                        </Button>

                        {/* Simulate SMS Dispatch Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleSimulateSms(
                              alert.id,
                              language === 'mr' ? alert.panchayatName.mr : alert.panchayatName.en
                            )
                          }
                          className="text-xs text-slate-600 hover:text-slate-900"
                          title="Simulate SMS Dispatch to registered farmers"
                        >
                          <Send className="size-3 mr-1" />
                          <span>{language === 'mr' ? 'एसएमएस पाठवा' : 'Send SMS'}</span>
                        </Button>
                      </div>

                      {/* Link to Weather Map */}
                      <Link
                        to="/weather-map"
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
                      >
                        <span>{language === 'mr' ? '१ किमी नकाशा पहा' : 'View on GIS Map'}</span>
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>

      {/* 7. INTERACTIVE GEOGRAPHIC HAZARD ZONE OVERVIEW WIDGET */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <Radio className="size-3.5" />
                {language === 'mr' ? 'भौगोलिक जोखीम नकाशा' : 'Spatial Agro-Hazard Radar'}
              </span>
              <h3 className="mt-1 text-xl font-black text-slate-900">
                {language === 'mr'
                  ? 'महाराष्ट्र ग्रामपंचायत हवामान जोखीम पट्टा'
                  : 'Maharashtra Panchayat Hazard Zones'}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {language === 'mr'
                  ? 'लाल आणि केशरी इशाऱ्यांखाली असलेल्या गावांची अचूक भौगोलिक स्थिती व हवामान रडार'
                  : 'Geospatial distribution of active convective storm cells and heatwave zones'}
              </p>
            </div>

            <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 px-4 shrink-0 shadow-md">
              <Link to="/weather-map">
                <Layers className="size-3.5 mr-1.5" />
                {language === 'mr' ? 'संपूर्ण जीआयएस नकाशा उघडा' : 'Launch Full 1km Studio'}
              </Link>
            </Button>
          </div>

          {/* Interactive SVG Hazard Grid Matrix */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AGRO_ALERTS_DATA.map((item) => {
              const cfg = IMD_SEVERITY_CONFIG[item.severity]
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border p-4 transition-all hover:scale-[1.01] ${cfg.border} ${cfg.cardBg}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-black uppercase ${cfg.badgeBg} ${cfg.badgeText}`}>
                      {language === 'mr' ? cfg.labelMr : cfg.labelEn}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {item.coordinates[0].toFixed(2)}°N, {item.coordinates[1].toFixed(2)}°E
                    </span>
                  </div>

                  <h4 className="mt-2.5 font-black text-slate-900 text-sm">
                    {language === 'mr' ? item.panchayatName.mr : item.panchayatName.en} Panchayat
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {language === 'mr' ? item.blockName.mr : item.blockName.en} Block ·{' '}
                    {language === 'mr' ? item.districtName.mr : item.districtName.en} Dist.
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs border-t border-slate-200/60 pt-2 font-semibold">
                    <span className="text-slate-600">
                      {language === 'mr' ? item.metricTrigger.parameter.mr : item.metricTrigger.parameter.en}
                    </span>
                    <span className="font-bold text-slate-900">{item.metricTrigger.currentValue}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 8. INTERACTIVE WEATHER THRESHOLD SIMULATOR (Farmer Learning Tool) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 sm:p-8 text-white shadow-xl">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              <Sparkles className="size-3.5 text-emerald-400" />
              {language === 'mr' ? 'हवामान जोखीम सिम्युलेटर' : 'Interactive Threshold Simulator'}
            </span>
            <h3 className="mt-3 text-xl sm:text-2xl font-black">
              {language === 'mr'
                ? 'तुमच्या गावात पाऊस किंवा उष्णता वाढल्यास काय इशारा निघेल?'
                : 'Simulate Weather Impact on Your Village'}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              {language === 'mr'
                ? 'पाऊस आणि तापमानाचा स्लाइडर बदलून पहा आणि आयएमडीच्या इशाऱ्यांची तीव्रता त्वरित तपासा.'
                : 'Adjust precipitation and temperature sliders to observe how automated IMD thresholds trigger Red, Orange, or Yellow warnings.'}
            </p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 items-center">
            {/* Sliders */}
            <div className="space-y-5 rounded-2xl bg-white/5 p-5 backdrop-blur-md border border-white/10">
              {/* Rain Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="flex items-center gap-1 text-slate-300">
                    <CloudRain className="size-4 text-sky-400" />
                    {language === 'mr' ? 'अपेक्षित पाऊस (मिमी/३ तास):' : 'Precipitation Intensity (mm/3h):'}
                  </span>
                  <span className="text-sky-300 font-mono text-sm">{simulatedRain} mm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="5"
                  value={simulatedRain}
                  onChange={(e) => setSimulatedRain(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-700 accent-sky-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0 mm (Normal)</span>
                  <span>25 mm (Alert)</span>
                  <span>45 mm+ (Emergency)</span>
                </div>
              </div>

              {/* Temp Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="flex items-center gap-1 text-slate-300">
                    <ThermometerSun className="size-4 text-amber-400" />
                    {language === 'mr' ? 'दुपारचे कमाल तापमान (° से.):' : 'Max Afternoon Temperature (°C):'}
                  </span>
                  <span className="text-amber-300 font-mono text-sm">{simulatedTemp} °C</span>
                </div>
                <input
                  type="range"
                  min="22"
                  max="46"
                  step="1"
                  value={simulatedTemp}
                  onChange={(e) => setSimulatedTemp(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-700 accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>22°C (Mild)</span>
                  <span>35°C (Caution)</span>
                  <span>40°C+ (Severe Heatwave)</span>
                </div>
              </div>
            </div>

            {/* Simulated Result Card */}
            <div className={`rounded-2xl border p-5 backdrop-blur-md transition-all ${
              simulatedRisk.severity === 'red'
                ? 'border-rose-500/80 bg-rose-950/40 text-rose-100'
                : simulatedRisk.severity === 'orange'
                  ? 'border-amber-500/80 bg-amber-950/40 text-amber-100'
                  : simulatedRisk.severity === 'yellow'
                    ? 'border-yellow-500/80 bg-yellow-950/40 text-yellow-100'
                    : 'border-emerald-500/80 bg-emerald-950/40 text-emerald-100'
            }`}>
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-current animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider">
                  {simulatedRisk.title}
                </span>
              </div>
              <h4 className="mt-3 text-lg font-black">{simulatedRisk.title}</h4>
              <p className="mt-1 text-xs opacity-90 leading-relaxed">{simulatedRisk.desc}</p>
              
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="opacity-75">
                  {language === 'mr' ? 'ऑटोमॅटिक ट्रिगर:' : 'Automated IMD Rule:'}
                </span>
                <span className="font-bold underline decoration-white/40">
                  {language === 'mr' ? 'शेतकऱ्यांना तात्काळ अलर्ट जाईल' : 'Instant SMS & Audio Dispatch'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 9. EMERGENCY HELPLINE DIRECTORY */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <PhoneCall className="size-4 text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              {language === 'mr' ? 'आपत्कालीन संपर्क क्रमांक' : 'Emergency Assistance & Helplines'}
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900">
            {language === 'mr' ? 'संकटाच्या वेळी मदतीसाठी संपर्क' : 'Disaster Helplines for Farmers'}
          </h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EMERGENCY_HELPLINES.map((h) => (
              <div
                key={h.number}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-all hover:bg-emerald-50/40 hover:border-emerald-200"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                    <Phone className="size-4" />
                  </span>
                  <a
                    href={`tel:${h.number.replace(/-/g, '')}`}
                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-3 py-1 text-xs font-bold text-white shadow-xs transition-colors"
                  >
                    Call
                  </a>
                </div>

                <h4 className="mt-3 font-bold text-slate-900 text-xs">
                  {language === 'mr' ? h.nameMr : h.nameEn}
                </h4>
                <a
                  href={`tel:${h.number.replace(/-/g, '')}`}
                  className="mt-1 block font-black text-emerald-700 text-base tracking-wide hover:underline"
                >
                  {h.number}
                </a>

                <p className="mt-2 text-[10px] text-slate-500">
                  {language === 'mr' ? h.timingMr : h.timingEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
