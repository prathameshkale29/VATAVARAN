import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  Sprout,
  Droplets,
  CloudRain,
  Wind,
  Thermometer,
  ShieldAlert,
  Volume2,
  Square,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Bookmark,
  BookmarkCheck,
  MapPin,
  Sparkles,
  Info,
  Calendar,
  Layers,
  BrainCircuit,
  Eye,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useLanguage } from '@/lib/i18n'
import type {
  CropId,
  CropStageId,
  GeneratedCropAdvisory,
  SavedFarmerPreference,
} from '@/types/crop-advisory'
import {
  CROPS_CATALOG,
  CROP_STAGES_CATALOG,
  generateCropAdvisory,
  calculateWeatherRisk,
} from '@/services/crop-advisory-engine'
import {
  districts,
  blocks,
  panchayats,
  getPanchayatFullForecast,
} from '@/data/mock-weather'
import { Button } from '@/components/ui/button'

interface CropAdvisoryWizardProps {
  initialPanchayatId?: string | undefined
  onClose?: (() => void) | undefined
  embeddedInMap?: boolean | undefined
}

const PREF_STORAGE_KEY = 'vatavaran_farmer_preference'

export function CropAdvisoryWizard({
  initialPanchayatId,
  onClose,
  embeddedInMap = false,
}: CropAdvisoryWizardProps) {
  const { language, t, getPlaceName } = useLanguage()

  // Saved preferences state
  const [savedPref, setSavedPref] = useState<SavedFarmerPreference | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  // Wizard state: 1: Location & Crop, 2: Crop Stage, 3: Advisory View
  const [step, setStep] = useState<1 | 2 | 3>(1)

  // Selection states
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('wardha')
  const [selectedBlockId, setSelectedBlockId] = useState<string>('seloo')
  const [selectedPanchayatId, setSelectedPanchayatId] = useState<string>(
    initialPanchayatId || 'seloo_kate'
  )
  const [selectedCropId, setSelectedCropId] = useState<CropId>('soybean')
  const [selectedStageId, setSelectedStageId] = useState<CropStageId>('flowering')

  // UI expand states
  const [isChangingLocation, setIsChangingLocation] = useState(false)
  const [isWhyOpen, setIsWhyOpen] = useState(false)
  const [isDataSourcesOpen, setIsDataSourcesOpen] = useState(false)

  // Speech Synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Load saved preference on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(PREF_STORAGE_KEY)
      if (stored) {
        const parsed: SavedFarmerPreference = JSON.parse(stored)
        setSavedPref(parsed)

        // If no explicit initial Panchayat passed, initialize from saved
        if (!initialPanchayatId) {
          setSelectedPanchayatId(parsed.panchayatId)
          setSelectedCropId(parsed.cropId)
          setSelectedStageId(parsed.cropStageId)
          const p = panchayats.find((item) => item.id === parsed.panchayatId)
          if (p) {
            setSelectedDistrictId(p.districtId)
            setSelectedBlockId(p.blockId)
          }
        }
      }
    } catch {
      // Ignore localStorage issues
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [initialPanchayatId])

  // Sync when initialPanchayatId prop changes
  useEffect(() => {
    if (initialPanchayatId) {
      setSelectedPanchayatId(initialPanchayatId)
      const p = panchayats.find((item) => item.id === initialPanchayatId)
      if (p) {
        setSelectedDistrictId(p.districtId)
        setSelectedBlockId(p.blockId)
      }
    }
  }, [initialPanchayatId])

  // Check if current configuration matches saved
  useEffect(() => {
    if (
      savedPref &&
      savedPref.panchayatId === selectedPanchayatId &&
      savedPref.cropId === selectedCropId &&
      savedPref.cropStageId === selectedStageId
    ) {
      setIsSaved(true)
    } else {
      setIsSaved(false)
    }
  }, [savedPref, selectedPanchayatId, selectedCropId, selectedStageId])

  // Derived current location objects
  const currentPanchayat = useMemo(
    () => panchayats.find((p) => p.id === selectedPanchayatId) ?? panchayats[0]!,
    [selectedPanchayatId]
  )
  const currentBlock = useMemo(
    () => blocks.find((b) => b.id === (currentPanchayat?.blockId ?? 'seloo')) ?? blocks[0]!,
    [currentPanchayat]
  )
  const currentDistrict = useMemo(
    () => districts.find((d) => d.id === (currentPanchayat?.districtId ?? 'wardha')) ?? districts[0]!,
    [currentPanchayat]
  )

  // Filtered dropdowns
  const availableBlocks = useMemo(
    () => blocks.filter((b) => b.districtId === selectedDistrictId),
    [selectedDistrictId]
  )
  const availablePanchayats = useMemo(
    () => panchayats.filter((p) => p.blockId === selectedBlockId),
    [selectedBlockId]
  )

  // Current weather forecast
  const forecast = useMemo(
    () => getPanchayatFullForecast(selectedPanchayatId),
    [selectedPanchayatId]
  )
  const weatherRisk = useMemo(() => calculateWeatherRisk(forecast), [forecast])

  // Generate action-oriented crop advisory
  const advisory: GeneratedCropAdvisory = useMemo(() => {
    return generateCropAdvisory(selectedPanchayatId, selectedCropId, selectedStageId, language)
  }, [selectedPanchayatId, selectedCropId, selectedStageId, language])

  // Save / Bookmark Farm Preferences
  const handleToggleSavePreference = () => {
    if (isSaved) {
      localStorage.removeItem(PREF_STORAGE_KEY)
      setSavedPref(null)
      setIsSaved(false)
    } else {
      const pref: SavedFarmerPreference = {
        panchayatId: selectedPanchayatId,
        panchayatName: currentPanchayat?.name ?? 'Seloo',
        blockName: currentBlock?.name ?? 'Seloo',
        districtName: currentDistrict?.name ?? 'Wardha',
        cropId: selectedCropId,
        cropStageId: selectedStageId,
        savedAt: new Date().toISOString(),
      }
      localStorage.setItem(PREF_STORAGE_KEY, JSON.stringify(pref))
      setSavedPref(pref)
      setIsSaved(true)
    }
  }

  // Quick Load Saved Preference
  const handleApplySavedPreference = () => {
    if (savedPref) {
      setSelectedPanchayatId(savedPref.panchayatId)
      setSelectedCropId(savedPref.cropId)
      setSelectedStageId(savedPref.cropStageId)
      const p = panchayats.find((item) => item.id === savedPref.panchayatId)
      if (p) {
        setSelectedDistrictId(p.districtId)
        setSelectedBlockId(p.blockId)
      }
      setStep(3) // Jump directly to advisory!
    }
  }

  // Voice / Listen TTS Handler
  const handleToggleSpeech = () => {
    if (!synthRef.current) {
      alert(
        language === 'mr'
          ? 'तुमच्या ब्राउझरमध्ये आवाज सुविधा उपलब्ध नाही.'
          : 'Speech synthesis is not supported on this browser.'
      )
      return
    }

    if (isSpeaking) {
      synthRef.current.cancel()
      setIsSpeaking(false)
      return
    }

    // Build spoken text in selected language
    const speechText = [
      advisory.headline,
      language === 'mr'
        ? `हवामान: तापमान ${advisory.weatherSummary.temperature} अंश सेल्सिअस, पाऊस ${advisory.weatherSummary.expectedRainfall} मिलीमीटर.`
        : language === 'hi'
          ? `मौसम: तापमान ${advisory.weatherSummary.temperature} डिग्री, बारिश ${advisory.weatherSummary.expectedRainfall} मिलीमीटर.`
          : `Weather: Temperature ${advisory.weatherSummary.temperature} degrees Celsius, rainfall ${advisory.weatherSummary.expectedRainfall} millimeters.`,
      ...advisory.advisories.map((a) => `${a.title}. ${a.action}`),
    ].join('. ')

    const utterance = new SpeechSynthesisUtterance(speechText)

    // Language code selection
    if (language === 'mr') {
      utterance.lang = 'mr-IN'
    } else if (language === 'hi') {
      utterance.lang = 'hi-IN'
    } else {
      utterance.lang = 'en-IN'
    }

    utterance.rate = 0.92 // Clear, slightly slower pace for easy listening

    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    setIsSpeaking(true)
    synthRef.current.speak(utterance)
  }

  const selectedCropObj = CROPS_CATALOG.find((c) => c.id === selectedCropId)
  const selectedStageObj = CROP_STAGES_CATALOG.find((s) => s.id === selectedStageId)

  const cropName =
    language === 'mr'
      ? selectedCropObj?.nameMr
      : language === 'hi'
        ? selectedCropObj?.nameHi
        : selectedCropObj?.nameEn

  const stageName =
    language === 'mr'
      ? selectedStageObj?.nameMr
      : language === 'hi'
        ? selectedStageObj?.nameHi
        : selectedStageObj?.nameEn

  return (
    <div
      className={`mx-auto max-w-4xl font-sans ${
        embeddedInMap
          ? 'p-3 sm:p-5 text-slate-100'
          : 'p-4 sm:p-6 text-foreground'
      }`}
    >
      {/* 1. WELCOME BACK BANNER (If user previously saved their farm) */}
      {savedPref && step !== 3 && (
        <aside
          className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/5 p-4 shadow-sm"
          aria-label="Saved farm preferences"
        >
          <div className="flex items-center gap-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-600 text-white font-bold text-lg shadow-md shadow-emerald-600/30">
              🌱
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>{t('crop.welcomeBack', 'Welcome back 👋')}</span>
              </div>
              <p className="font-extrabold text-sm sm:text-base leading-tight">
                📍 {getPlaceName(savedPref.panchayatName)} {language === 'mr' ? 'ग्रामपंचायत' : 'Panchayat'} ·{' '}
                {CROPS_CATALOG.find((c) => c.id === savedPref.cropId)?.[
                  language === 'mr' ? 'nameMr' : language === 'hi' ? 'nameHi' : 'nameEn'
                ] || savedPref.cropId}
              </p>
            </div>
          </div>
          <Button
            type="button"
            onClick={handleApplySavedPreference}
            className="h-10 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 rounded-xl shadow-md cursor-pointer"
          >
            {t('crop.todayAdvisory', "Today's Advisory")}
            <ArrowRight className="size-4 ml-1" />
          </Button>
        </aside>
      )}

      {/* 2. PERSISTENT LOCATION BAR */}
      <section
        className={`mb-5 rounded-2xl border p-4 shadow-xs backdrop-blur-md transition-all ${
          embeddedInMap
            ? 'bg-slate-900/90 border-slate-700/80 text-white'
            : 'bg-card border-border/80 text-foreground'
        }`}
        aria-label="Location selector"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <MapPin className="size-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {t('crop.locationTitle', '📍 Selected Location (Panchayat)')}
              </span>
              <div className="flex flex-wrap items-center gap-1.5 font-extrabold text-sm sm:text-base">
                <span>{getPlaceName(currentPanchayat?.name ?? '')}</span>
                <span className="text-muted-foreground/60">·</span>
                <span className="text-muted-foreground text-xs sm:text-sm font-semibold">
                  {getPlaceName(currentBlock?.name ?? '')} {language === 'mr' ? 'तालुका' : 'Block'}
                </span>
                <span className="text-muted-foreground/60">·</span>
                <span className="text-muted-foreground text-xs sm:text-sm font-semibold">
                  {getPlaceName(currentDistrict?.name ?? '')} {language === 'mr' ? 'जिल्हा' : 'Dist.'}
                </span>
                <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  {language === 'mr' ? 'महाराष्ट्र' : 'Maharashtra'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsChangingLocation(!isChangingLocation)}
              className="inline-flex items-center gap-1 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-bold text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
              <span>{t('crop.changeLocation', 'Change Location')}</span>
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="grid size-8 place-items-center rounded-xl bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                title="Close"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Expandable Location Changer Dropdowns */}
        {isChangingLocation && (
          <div className="mt-4 border-t border-border/70 pt-4 animate-in fade-in duration-200">
            <p className="mb-2 text-xs font-bold text-muted-foreground">
              {language === 'mr'
                ? 'जिल्हा, तालुका व ग्रामपंचायत निवडा:'
                : 'Select District, Block and Gram Panchayat:'}
            </p>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {/* District */}
              <div>
                <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">
                  {t('weather.district', 'District')}
                </label>
                <select
                  value={selectedDistrictId}
                  onChange={(e) => {
                    const distId = e.target.value
                    setSelectedDistrictId(distId)
                    const firstB = blocks.find((b) => b.districtId === distId)
                    if (firstB) {
                      setSelectedBlockId(firstB.id)
                      const firstP = panchayats.find((p) => p.blockId === firstB.id)
                      if (firstP) setSelectedPanchayatId(firstP.id)
                    }
                  }}
                  className="w-full h-10 rounded-xl border bg-background px-3 text-xs font-bold text-foreground focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {getPlaceName(d.name)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Block */}
              <div>
                <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">
                  {t('weather.block', 'Block')}
                </label>
                <select
                  value={selectedBlockId}
                  onChange={(e) => {
                    const bId = e.target.value
                    setSelectedBlockId(bId)
                    const firstP = panchayats.find((p) => p.blockId === bId)
                    if (firstP) setSelectedPanchayatId(firstP.id)
                  }}
                  className="w-full h-10 rounded-xl border bg-background px-3 text-xs font-bold text-foreground focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {availableBlocks.map((b) => (
                    <option key={b.id} value={b.id}>
                      {getPlaceName(b.name)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Panchayat */}
              <div>
                <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">
                  {t('weather.panchayat', 'Panchayat')}
                </label>
                <select
                  value={selectedPanchayatId}
                  onChange={(e) => {
                    setSelectedPanchayatId(e.target.value)
                    setIsChangingLocation(false)
                  }}
                  className="w-full h-10 rounded-xl border border-emerald-500/50 bg-background px-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {availablePanchayats.map((p) => (
                    <option key={p.id} value={p.id}>
                      {getPlaceName(p.name)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. STEP PROGRESS INDICATOR */}
      <nav aria-label="Advisory steps" className="mb-6 flex items-center justify-center gap-2 sm:gap-4">
        {[
          { num: 1, label: language === 'mr' ? '१. पीक निवडा' : language === 'hi' ? '१. फसल चुनें' : '1. Crop' },
          { num: 2, label: language === 'mr' ? '२. पिकाची अवस्था' : language === 'hi' ? '२. फसल अवस्था' : '2. Growth Stage' },
          { num: 3, label: language === 'mr' ? '३. शेती सल्ला' : language === 'hi' ? '३. कृषि सलाह' : '3. Farm Advisory' },
        ].map((s) => (
          <button
            type="button"
            key={s.num}
            onClick={() => setStep(s.num as 1 | 2 | 3)}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-all cursor-pointer ${
              step === s.num
                ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500/30'
                : step > s.num
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  : 'bg-muted text-muted-foreground'
            }`}
          >
            <span>{s.label}</span>
          </button>
        ))}
      </nav>

      {/* ========================================================= */}
      {/* STEP 1: CROP SELECTION                                    */}
      {/* ========================================================= */}
      {step === 1 && (
        <section aria-labelledby="crop-selection-heading" className="animate-in fade-in duration-200">
          <div className="text-center mb-6">
            <h2 id="crop-selection-heading" className="text-2xl sm:text-3xl font-black text-foreground">
              {t('crop.selectCropTitle', '🌾 Select Your Crop')}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              {t('crop.selectCropSubtitle', 'Choose your primary crop to generate tailored weather guidance')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CROPS_CATALOG.map((crop) => {
              const isSelected = selectedCropId === crop.id
              const localizedName =
                language === 'mr'
                  ? crop.nameMr
                  : language === 'hi'
                    ? crop.nameHi
                    : crop.nameEn

              return (
                <button
                  type="button"
                  key={crop.id}
                  onClick={() => setSelectedCropId(crop.id)}
                  className={`group relative flex flex-col items-center justify-between rounded-2xl border p-4 text-center transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/15 ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/15'
                      : embeddedInMap
                        ? 'border-slate-700/80 bg-slate-900/80 hover:border-slate-500 hover:bg-slate-850'
                        : 'border-border bg-card hover:border-primary/40 hover:bg-accent/40 shadow-xs'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 grid size-5 place-items-center rounded-full bg-emerald-600 text-white">
                      <CheckCircle2 className="size-3.5" />
                    </div>
                  )}
                  <span className="text-4xl sm:text-5xl my-2 transition-transform group-hover:scale-110">
                    {crop.icon}
                  </span>
                  <div>
                    <h3 className="font-black text-base sm:text-lg leading-tight text-foreground">
                      {localizedName}
                    </h3>
                    <span className="text-[11px] text-muted-foreground block mt-0.5">
                      {crop.nameEn !== localizedName ? crop.nameEn : crop.season}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              type="button"
              size="lg"
              onClick={() => setStep(2)}
              className="h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base px-8 rounded-2xl shadow-lg shadow-emerald-600/25 cursor-pointer hover:scale-105 transition-all"
            >
              <span>{language === 'mr' ? 'पिकाची अवस्था निवडा →' : 'Next: Crop Stage →'}</span>
            </Button>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* STEP 2: CROP STAGE SELECTION                              */}
      {/* ========================================================= */}
      {step === 2 && (
        <section aria-labelledby="stage-selection-heading" className="animate-in fade-in duration-200">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              <span>{selectedCropObj?.icon}</span>
              <span>{cropName}</span>
            </div>
            <h2 id="stage-selection-heading" className="text-2xl sm:text-3xl font-black text-foreground">
              {t('crop.stageTitle', '🌱 What is the crop stage?')}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              {t('crop.stageSubtitle', 'Select growth phase to get actionable farm management rules')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CROP_STAGES_CATALOG.map((stage) => {
              const isSelected = selectedStageId === stage.id
              const localizedStageName =
                language === 'mr'
                  ? stage.nameMr
                  : language === 'hi'
                    ? stage.nameHi
                    : stage.nameEn

              return (
                <button
                  type="button"
                  key={stage.id}
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`group relative flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/15 ring-2 ring-emerald-500 shadow-md shadow-emerald-500/15'
                      : embeddedInMap
                        ? 'border-slate-700/80 bg-slate-900/80 hover:border-slate-500 hover:bg-slate-850'
                        : 'border-border bg-card hover:border-primary/40 hover:bg-accent/40 shadow-xs'
                  }`}
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-background border text-2xl shadow-xs">
                    {stage.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-sm sm:text-base text-foreground">
                        {localizedStageName}
                      </h3>
                      {isSelected && <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />}
                    </div>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 block mt-0.5">
                      {stage.daysFromSowing}
                    </span>
                    <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                      {stage.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setStep(1)}
              className="h-12 rounded-2xl font-bold cursor-pointer"
            >
              <ArrowLeft className="size-4 mr-1.5" />
              <span>{language === 'mr' ? 'मागे (पीक बदला)' : 'Back (Change Crop)'}</span>
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={() => setStep(3)}
              className="h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base px-8 rounded-2xl shadow-lg shadow-emerald-600/25 cursor-pointer hover:scale-105 transition-all"
            >
              <span>{language === 'mr' ? 'कृषी सल्ला पाहा →' : 'Get Advisory →'}</span>
            </Button>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* STEP 3: ACTION-ORIENTED ADVISORY CARD                     */}
      {/* ========================================================= */}
      {step === 3 && (
        <section aria-labelledby="advisory-heading" className="animate-in fade-in duration-200 space-y-5">
          {/* Header Card: Location + Crop + Stage + Weather Snapshot */}
          <div
            className={`rounded-3xl border p-5 shadow-lg backdrop-blur-md relative overflow-hidden ${
              weatherRisk === 'high'
                ? 'bg-gradient-to-br from-rose-950/40 via-card to-card border-rose-500/50'
                : weatherRisk === 'moderate'
                  ? 'bg-gradient-to-br from-amber-950/30 via-card to-card border-amber-500/50'
                  : 'bg-gradient-to-br from-emerald-950/30 via-card to-card border-emerald-500/40'
            }`}
          >
            {/* Top Status & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedCropObj?.icon}</span>
                <div>
                  <h2 id="advisory-heading" className="text-base sm:text-lg font-black text-foreground leading-tight">
                    {advisory.headline}
                  </h2>
                  <span className="text-[11px] text-muted-foreground">
                    {language === 'mr' ? 'मार्गदर्शन तारीख:' : 'Advisory Date:'} {advisory.generatedAt}
                  </span>
                </div>
              </div>

              {/* Actions: Listen TTS & Save Farm */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleSpeech}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-black transition-all cursor-pointer shadow-md ${
                    isSpeaking
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                  title="Text-to-speech audio reader"
                >
                  {isSpeaking ? (
                    <>
                      <Square className="size-3.5 fill-current" />
                      <span>{t('crop.stopListening', 'Stop')}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="size-4" />
                      <span>{t('crop.listen', '🔊 ऐका / Listen')}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleToggleSavePreference}
                  className={`flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    isSaved
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : 'border-border bg-background text-muted-foreground hover:text-foreground'
                  }`}
                  title="Bookmark this Panchayat and Crop for future visits"
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="size-3.5" />
                      <span className="hidden sm:inline">{t('crop.farmSaved', 'Farm Saved!')}</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="size-3.5" />
                      <span className="hidden sm:inline">{t('crop.saveAsMyFarm', 'Save My Farm')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Weather Snapshot Grid */}
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <div className="rounded-xl border bg-background/70 p-3 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400">
                  <CloudRain className="size-4" />
                  <span>{t('metric.rainfall', 'Rainfall')}</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-xl font-black text-foreground">
                    {advisory.weatherSummary.expectedRainfall}
                  </span>
                  <span className="text-xs text-muted-foreground">mm</span>
                </div>
                <span className="text-[10px] text-muted-foreground block mt-0.5">
                  {advisory.weatherSummary.rainProbability}% {language === 'mr' ? 'शक्यता' : 'chance'}
                </span>
              </div>

              <div className="rounded-xl border bg-background/70 p-3 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Thermometer className="size-4" />
                  <span>{t('metric.temperature', 'Temperature')}</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-xl font-black text-foreground">
                    {advisory.weatherSummary.temperature}
                  </span>
                  <span className="text-xs text-muted-foreground">°C</span>
                </div>
                <span className="text-[10px] text-muted-foreground block mt-0.5">
                  {forecast.temperature.condition}
                </span>
              </div>

              <div className="rounded-xl border bg-background/70 p-3 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400">
                  <Droplets className="size-4" />
                  <span>{t('metric.humidity', 'Humidity')}</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-xl font-black text-foreground">
                    {advisory.weatherSummary.humidity}
                  </span>
                  <span className="text-xs text-muted-foreground">%</span>
                </div>
                <span className="text-[10px] text-muted-foreground block mt-0.5">
                  {language === 'mr' ? 'सापेक्ष आर्द्रता' : 'Relative Moisture'}
                </span>
              </div>

              <div className="rounded-xl border bg-background/70 p-3 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <Wind className="size-4" />
                  <span>{t('metric.windSpeed', 'Wind Speed')}</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-xl font-black text-foreground">
                    {advisory.weatherSummary.windSpeed}
                  </span>
                  <span className="text-xs text-muted-foreground">km/h</span>
                </div>
                <span className="text-[10px] text-muted-foreground block mt-0.5">
                  {forecast.wind.direction}
                </span>
              </div>
            </div>
          </div>

          {/* Action-Oriented Advisory Cards List */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">👨‍🌾</span>
              <h3 className="text-lg sm:text-xl font-black text-foreground">
                {t('crop.actionOrientedHeadline', "TODAY'S FARM ADVISORY")}
              </h3>
            </div>

            <div className="space-y-3">
              {advisory.advisories.map((item, idx) => {
                const isCritical = item.urgency === 'critical'
                const isWarning = item.urgency === 'warning'

                return (
                  <article
                    key={idx}
                    className={`rounded-2xl border p-4 sm:p-5 shadow-sm transition-all duration-200 ${
                      isCritical
                        ? 'border-rose-500/50 bg-rose-500/10 text-rose-950 dark:text-rose-100'
                        : isWarning
                          ? 'border-amber-500/50 bg-amber-500/10 text-amber-950 dark:text-amber-100'
                          : embeddedInMap
                            ? 'border-slate-700/80 bg-slate-900/90 text-slate-100'
                            : 'border-border/80 bg-card text-foreground'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-background/80 border text-xl shadow-xs">
                        {item.icon}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <h4 className="font-extrabold text-base sm:text-lg leading-snug">
                            {item.title}
                          </h4>
                          {isCritical && (
                            <span className="rounded-md bg-rose-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                              {language === 'mr' ? 'तातडीचा इशारा' : 'Critical Action'}
                            </span>
                          )}
                          {isWarning && (
                            <span className="rounded-md bg-amber-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                              {language === 'mr' ? 'दक्षता' : 'Advisory'}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-xs sm:text-sm font-medium leading-relaxed opacity-90">
                          {item.action}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          {/* 4. "WHY THIS ADVISORY?" EXPLAINABLE DECISION PIPELINE (Requirement 8) */}
          <section className="rounded-2xl border bg-muted/30 p-4" aria-label="Why this advisory explainability">
            <button
              type="button"
              onClick={() => setIsWhyOpen(!isWhyOpen)}
              className="flex w-full items-center justify-between text-left font-bold text-sm text-foreground cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <BrainCircuit className="size-4 text-emerald-600" />
                <span>{t('crop.whyThisAdvisory', '🤖 Why this advisory? (Decision Pipeline)')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-muted-foreground hidden sm:inline">
                  {t('crop.forecastConfidence', 'Confidence:')}{' '}
                  {advisory.confidence === 'high'
                    ? t('crop.confidenceHigh', '🟢 High')
                    : advisory.confidence === 'medium'
                      ? t('crop.confidenceMedium', '🟡 Medium')
                      : t('crop.confidenceLow', '🔴 Low')}
                </span>
                {isWhyOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </div>
            </button>

            {isWhyOpen && (
              <div className="mt-4 border-t border-border/70 pt-4 animate-in fade-in duration-200">
                <p className="text-xs text-muted-foreground mb-3">
                  {language === 'mr'
                    ? 'हा कृषी सल्ला खालील ६ पायऱ्यांच्या पारदर्शक प्रक्रियेतून तयार केला गेला आहे:'
                    : 'This recommendation is calculated transparently through the following 6 decision stages:'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {advisory.explanationSteps.map((stepItem) => (
                    <div
                      key={stepItem.step}
                      className="rounded-xl border bg-background/80 p-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <span className="grid size-5 place-items-center rounded-full bg-emerald-500/20 text-[10px]">
                          {stepItem.step}
                        </span>
                        <span className="truncate">{stepItem.title}</span>
                      </div>
                      <p className="mt-1.5 text-[11px] font-medium text-muted-foreground line-clamp-3">
                        {stepItem.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground border-t pt-2.5">
                  <span>{t('crop.forecastConfidence', 'Forecast Confidence:')}</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {advisory.confidence === 'high'
                      ? t('crop.confidenceHigh', '🟢 High Confidence')
                      : t('crop.confidenceMedium', '🟡 Medium Confidence')}
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* 5. DATA SOURCES SECTION (Requirement 9 - Hidden by default) */}
          <section className="rounded-2xl border bg-muted/20 p-4" aria-label="Data sources">
            <button
              type="button"
              onClick={() => setIsDataSourcesOpen(!isDataSourcesOpen)}
              className="flex w-full items-center justify-between text-left font-semibold text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Layers className="size-3.5" />
                <span>{t('crop.forecastDetails', '📊 Forecast Details & Data Sources')}</span>
              </div>
              {isDataSourcesOpen ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
            </button>

            {isDataSourcesOpen && (
              <div className="mt-3 border-t border-border/70 pt-3 text-[11px] text-muted-foreground space-y-1.5 animate-in fade-in duration-200">
                <p className="font-semibold text-foreground">
                  {language === 'mr'
                    ? 'वातावरण प्रणालीमध्ये एकत्रित केलेले हवामान व उपग्रह डेटा स्त्रोत:'
                    : 'Integrated data pipelines powering VataVaran Panchayat downscaling:'}
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  {advisory.dataSources.map((source, idx) => (
                    <li key={idx}>{source}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Bottom Switch / Reset Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="rounded-xl font-bold cursor-pointer"
            >
              <RotateCcw className="size-3.5 mr-1.5" />
              <span>{t('crop.changeCropStage', 'Change Crop / Stage')}</span>
            </Button>

            <Button
              asChild
              className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-md cursor-pointer"
            >
              <Link to="/weather-map">
                <span>{language === 'mr' ? 'नकाशावर इतर पंचायती पाहा' : 'Explore Other Panchayats on Map'}</span>
                <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}
