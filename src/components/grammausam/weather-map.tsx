'use client'

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  Rectangle,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import L from 'leaflet'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  Search,
  Crosshair,
  Heart,
  Share2,
  Menu as MenuIcon,
  X,
  Play,
  Pause,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Download,
  Sparkles,
  User,
  Radio,
  Satellite,
  Wind,
  CloudRain,
  Thermometer,
  Zap,
  Cloud,
  Waves,
  Layers,
  Check,
  Clock,
  Compass,
  ArrowUpRight,
  ExternalLink,
  ShieldAlert,
  Flame,
  BrainCircuit,
  Mountain,
  Sprout,
  SlidersHorizontal,
  Layers3,
  BarChart3,
  RefreshCw,
  Info,
  Maximize2,
  Minimize2,
  Building2,
  MapPin,
  Activity,
  Wifi,
  Globe,
  Eye,
} from 'lucide-react'
import type {
  BlockWeatherProfile,
  DownscalingInferenceResult,
  DownscalingMode,
  MapAdminLevel,
  WindyCity,
  WindyHourlyPoint,
  WindyLayer,
} from '@/types/weather'
import {
  WINDY_CITIES,
  WINDY_HOURLY_DATA,
  WINDY_DAYS,
  WINDY_LAYERS,
  type WindyLayerConfig,
  getDownscaledInference,
} from '@/data/windy-data'
import {
  districts,
  blocks,
  panchayats,
  panchayatWeatherProfiles,
  blockWeatherProfiles,
} from '@/data/mock-weather'
import {
  fetchLiveWeather,
  MAP_TILE_PROVIDERS,
  type LiveWeatherData,
  type MapTileProvider,
  searchNominatimIndia,
  type GeocodedLocation,
} from '@/services/live-weather-api'
import 'leaflet/dist/leaflet.css'
import { useLanguage } from '@/lib/i18n'
import { LanguageSwitcher } from '@/components/grammausam/language-switcher'

// Helper to calculate DMS format from decimal coordinates
function toDMS(coordinate: number, isLatitude: boolean): string {
  const absolute = Math.abs(coordinate)
  const degrees = Math.floor(absolute)
  const minutesNotTruncated = (absolute - degrees) * 60
  const minutes = Math.floor(minutesNotTruncated)
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60)
  const direction = isLatitude
    ? coordinate >= 0
      ? 'N'
      : 'S'
    : coordinate >= 0
      ? 'E'
      : 'W'
  return `${direction}${degrees}°${minutes}'${seconds}"`
}

// Map Controller to fly camera smoothly
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 })
  }, [center, zoom, map])
  return null
}

// Map Click Listener to inspect arbitrary coordinates
function MapClickInspector({
  onSelectPoint,
}: {
  onSelectPoint: (lat: number, lng: number) => void
}) {
  useMapEvents({
    click(e) {
      onSelectPoint(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

// Animated Weather Canvas Component (Particles, Ocean Swells, Radar Echoes, Downscaled Micro-cells)
function WeatherCanvasLayer({
  activeLayer,
  downscalingMode,
}: {
  activeLayer: WindyLayer
  downscalingMode: DownscalingMode
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle system
    interface Particle {
      x: number
      y: number
      speed: number
      size: number
      age: number
      maxAge: number
      color: string
      angle: number
    }

    // High density in downscaled 1km mode, coarse in 25km mode
    const isDownscaled = downscalingMode === 'downscaled-1km'
    const particleCount =
      activeLayer === 'waves'
        ? 350
        : activeLayer === 'wind'
          ? isDownscaled
            ? 650
            : 220
          : activeLayer === 'aiDownscaledRain' || activeLayer === 'rain'
            ? 280
            : 180

    const particles: Particle[] = []

    const resetParticle = (p: Particle) => {
      p.x = Math.random() * width
      p.y = Math.random() * height
      p.age = 0
      p.maxAge = 40 + Math.random() * 60
      p.size = isDownscaled ? 1 + Math.random() * 1.8 : 2 + Math.random() * 2

      if (activeLayer === 'waves') {
        p.speed = 1.2 + Math.random() * 1.8
        p.angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.4
        p.color = Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(217, 70, 239, '
      } else if (activeLayer === 'wind') {
        p.speed = 1.4 + Math.random() * 2.2
        const normalizedY = p.y / height
        // Micro-topography flow curvature when downscaled:
        const curvature = isDownscaled
          ? Math.sin(p.x * 0.008) * 0.6 + Math.cos(p.y * 0.006) * 0.4
          : Math.sin(p.x * 0.003) * 0.3
        p.angle = -Math.PI / 4 + curvature + normalizedY * 0.2
        p.color = Math.random() > 0.5 ? 'rgba(255, 255, 255, ' : 'rgba(56, 189, 248, '
      } else if (activeLayer === 'aiDownscaledRain' || activeLayer === 'rain') {
        p.speed = 2.2 + Math.random() * 3.0
        p.angle = Math.PI / 2 + (Math.random() - 0.5) * 0.2
        p.color = 'rgba(56, 189, 248, '
      } else if (activeLayer === 'soilMoisture') {
        p.speed = 0.5 + Math.random() * 0.8
        p.angle = Math.random() * Math.PI * 2
        p.color = 'rgba(52, 211, 153, '
      } else {
        p.speed = 0.8 + Math.random() * 1.2
        p.angle = Math.random() * Math.PI * 2
        p.color = 'rgba(167, 139, 250, '
      }
    }

    for (let i = 0; i < particleCount; i++) {
      const p: Particle = {
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 1,
        size: 1,
        age: Math.random() * 60,
        maxAge: 60,
        color: 'rgba(255,255,255,',
        angle: 0,
      }
      resetParticle(p)
      particles.push(p)
    }

    let frame = 0

    const render = () => {
      frame++

      // Background trail fade
      if (activeLayer === 'wind' || activeLayer === 'waves') {
        ctx.fillStyle = 'rgba(17, 24, 39, 0.07)'
        ctx.fillRect(0, 0, width, height)
      } else {
        ctx.clearRect(0, 0, width, height)
      }

      // 1. LAYER SPECIFIC VISUALS
      if (activeLayer === 'waves') {
        // Bay of Bengal Wave Swell
        const bobCenterX = width * 0.76
        const bobCenterY = height * 0.72
        const bobRadius = Math.min(width, height) * 0.42

        const bobGrad = ctx.createRadialGradient(
          bobCenterX,
          bobCenterY,
          bobRadius * 0.1,
          bobCenterX,
          bobCenterY,
          bobRadius
        )
        bobGrad.addColorStop(0, 'rgba(217, 70, 239, 0.55)')
        bobGrad.addColorStop(0.35, 'rgba(192, 38, 211, 0.45)')
        bobGrad.addColorStop(0.7, 'rgba(244, 63, 94, 0.35)')
        bobGrad.addColorStop(1, 'rgba(147, 51, 234, 0)')

        ctx.fillStyle = bobGrad
        ctx.beginPath()
        ctx.arc(bobCenterX, bobCenterY, bobRadius, 0, Math.PI * 2)
        ctx.fill()

        // Wave swell ripples
        ctx.lineWidth = 1.5
        for (let i = 1; i <= 5; i++) {
          const rippleRadius = bobRadius * 0.25 * i + ((frame * 0.8) % (bobRadius * 0.3))
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.18 - i * 0.03})`
          ctx.beginPath()
          ctx.arc(bobCenterX, bobCenterY, rippleRadius, -Math.PI * 0.8, -Math.PI * 0.1)
          ctx.stroke()
        }

        // Arabian Sea wave gradient
        const asCenterX = width * 0.24
        const asCenterY = height * 0.65
        const asRadius = Math.min(width, height) * 0.35
        const asGrad = ctx.createRadialGradient(
          asCenterX,
          asCenterY,
          asRadius * 0.1,
          asCenterX,
          asCenterY,
          asRadius
        )
        asGrad.addColorStop(0, 'rgba(14, 165, 233, 0.45)')
        asGrad.addColorStop(0.6, 'rgba(6, 182, 212, 0.28)')
        asGrad.addColorStop(1, 'rgba(2, 132, 199, 0)')

        ctx.fillStyle = asGrad
        ctx.beginPath()
        ctx.arc(asCenterX, asCenterY, asRadius, 0, Math.PI * 2)
        ctx.fill()
      } else if (
        activeLayer === 'aiDownscaledRain' ||
        activeLayer === 'radar' ||
        activeLayer === 'rain'
      ) {
        // Radar Doppler & Downscaled 1km Precipitation Cells
        const cells = isDownscaled
          ? [
              // High-resolution localized cells (convective hotspots)
              { x: width * 0.52, y: height * 0.50, r: 45, color: 'rgba(34, 197, 94, 0.45)' },
              { x: width * 0.54, y: height * 0.48, r: 28, color: 'rgba(234, 179, 8, 0.55)' },
              { x: width * 0.55, y: height * 0.47, r: 14, color: 'rgba(239, 68, 68, 0.7)' },
              { x: width * 0.48, y: height * 0.54, r: 35, color: 'rgba(56, 189, 248, 0.4)' },
              { x: width * 0.72, y: height * 0.64, r: 65, color: 'rgba(16, 185, 129, 0.4)' },
              { x: width * 0.74, y: height * 0.62, r: 30, color: 'rgba(249, 115, 22, 0.5)' },
            ]
          : [
              // Coarse 25km blocky cells (uniform broad averages)
              { x: width * 0.53, y: height * 0.49, r: 90, color: 'rgba(34, 197, 94, 0.3)' },
              { x: width * 0.72, y: height * 0.63, r: 110, color: 'rgba(56, 189, 248, 0.3)' },
            ]

        cells.forEach((c) => {
          const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r)
          grad.addColorStop(0, c.color)
          grad.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2)
          ctx.fill()
        })
      } else if (activeLayer === 'aiDownscaledTemp' || activeLayer === 'temperature') {
        // Thermal heat map overlay with terrain lapse rate adjustment
        const heatZoneX = width * 0.38
        const heatZoneY = height * 0.42
        const heatGrad = ctx.createRadialGradient(
          heatZoneX,
          heatZoneY,
          20,
          heatZoneX,
          heatZoneY,
          width * 0.35
        )
        heatGrad.addColorStop(0, 'rgba(220, 38, 38, 0.35)')
        heatGrad.addColorStop(0.4, 'rgba(249, 115, 22, 0.25)')
        heatGrad.addColorStop(0.7, 'rgba(234, 179, 8, 0.18)')
        heatGrad.addColorStop(1, 'rgba(16, 185, 129, 0)')
        ctx.fillStyle = heatGrad
        ctx.fillRect(0, 0, width, height)

        if (isDownscaled) {
          // Draw cooler mountain valley pockets in green/cyan
          const valleyGrad = ctx.createRadialGradient(
            width * 0.48,
            height * 0.52,
            5,
            width * 0.48,
            height * 0.52,
            45
          )
          valleyGrad.addColorStop(0, 'rgba(6, 182, 212, 0.35)')
          valleyGrad.addColorStop(1, 'rgba(6, 182, 212, 0)')
          ctx.fillStyle = valleyGrad
          ctx.beginPath()
          ctx.arc(width * 0.48, height * 0.52, 45, 0, Math.PI * 2)
          ctx.fill()
        }
      } else if (activeLayer === 'soilMoisture') {
        // Agricultural root-zone soil moisture contours
        const soilGrad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.52,
          10,
          width * 0.5,
          height * 0.52,
          140
        )
        soilGrad.addColorStop(0, 'rgba(16, 185, 129, 0.35)')
        soilGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.25)')
        soilGrad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = soilGrad
        ctx.beginPath()
        ctx.arc(width * 0.5, height * 0.52, 140, 0, Math.PI * 2)
        ctx.fill()
      } else if (activeLayer === 'clouds' || activeLayer === 'satellite') {
        // Soft cloud density drifts
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
        for (let i = 0; i < 6; i++) {
          const cx = (width * (0.2 + i * 0.15) + ((frame * 0.2) % width)) % width
          const cy = height * (0.3 + (i % 3) * 0.2)
          const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 110)
          grad.addColorStop(0, 'rgba(241, 245, 249, 0.25)')
          grad.addColorStop(1, 'rgba(241, 245, 249, 0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(cx, cy, 110, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // 2. DRAW PARTICLES (STREAMLINES)
      particles.forEach((p) => {
        p.age++
        if (p.age >= p.maxAge) {
          resetParticle(p)
          return
        }

        const prevX = p.x
        const prevY = p.y

        p.x += Math.cos(p.angle) * p.speed
        p.y += Math.sin(p.angle) * p.speed

        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          resetParticle(p)
          return
        }

        const alpha = Math.sin((p.age / p.maxAge) * Math.PI) * 0.75
        ctx.strokeStyle = `${p.color}${alpha})`
        ctx.lineWidth = p.size
        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      })

      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [activeLayer, downscalingMode])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[400] h-full w-full"
    />
  )
}

export function WeatherMapCanvas() {
  const navigate = useNavigate()
  const { t, getPlaceName, language } = useLanguage()

  // State
  const defaultCity = WINDY_CITIES[0] as WindyCity
  const [activeLayer, setActiveLayer] = useState<WindyLayer>('aiDownscaledRain')
  const [downscalingMode, setDownscalingMode] = useState<DownscalingMode>('downscaled-1km')
  const [adminLevel, setAdminLevel] = useState<MapAdminLevel>('both')
  const [activeBasemap, setActiveBasemap] = useState<string>('osm-standard')
  const [showPanchayatBoundaries, setShowPanchayatBoundaries] = useState(true)
  const [showBlockBoundaries, setShowBlockBoundaries] = useState(true)
  const [showCoarseGrid, setShowCoarseGrid] = useState(false)
  const [mapZoom, setMapZoom] = useState<number>(9)

  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('wardha')
  const [selectedBlockId, setSelectedBlockId] = useState<string>('wardha_block')
  const [selectedPanchayatId, setSelectedPanchayatId] = useState<string>('sevagram')
  const [panchayatScope, setPanchayatScope] = useState<'district' | 'all' | 'block'>('district')
  const [activeSelectionType, setActiveSelectionType] = useState<
    'panchayat' | 'block' | 'city' | 'custom'
  >('panchayat')

  const [selectedCity, setSelectedCity] = useState<WindyCity>(
    () => WINDY_CITIES.find((c) => c.id === 'nagpur') ?? defaultCity
  )
  const [customPoint, setCustomPoint] = useState<{
    lat: number
    lng: number
    dmsLat: string
    dmsLng: string
    name: string
  } | null>({
    lat: 19.82,
    lng: 74.03,
    dmsLat: 'N19°49\'12"',
    dmsLng: 'E74°1\'48"',
    name: 'Dubera Panchayat',
  })

  // Live Weather API Telemetry State
  const [liveWeatherData, setLiveWeatherData] = useState<LiveWeatherData | null>(null)
  const [isLiveApiLoading, setIsLiveApiLoading] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [nominatimResults, setNominatimResults] = useState<GeocodedLocation[]>([])
  const [isSearchingNominatim, setIsSearchingNominatim] = useState(false)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMeteogramExpanded, setIsMeteogramExpanded] = useState(true)
  const [isPopupOpen, setIsPopupOpen] = useState(true)

  // AI Downscaling Inspector State
  const [isDownscalingInspectorOpen, setIsDownscalingInspectorOpen] = useState(false)
  const [isDownscalingRunning, setIsDownscalingRunning] = useState(false)
  const [downscalingPipelineStep, setDownscalingPipelineStep] = useState(0)

  // Scrubber State
  const [activeHourIndex, setActiveHourIndex] = useState(2)
  const [isPlaying, setIsPlaying] = useState(false)
  const activeHourlyPoint =
    WINDY_HOURLY_DATA[activeHourIndex] ?? (WINDY_HOURLY_DATA[0] as WindyHourlyPoint)

  // Fetch Live Weather from Open-Meteo for any coordinates
  const loadLiveWeather = useCallback(async (lat: number, lng: number) => {
    setIsLiveApiLoading(true)
    try {
      const data = await fetchLiveWeather(lat, lng)
      setLiveWeatherData(data)
    } catch (err) {
      console.warn('Failed to load live weather:', err)
    } finally {
      setIsLiveApiLoading(false)
    }
  }, [])

  // Initial live telemetry load for default panchayat (Dubera: 19.82, 74.03)
  useEffect(() => {
    loadLiveWeather(19.82, 74.03)
  }, [loadLiveWeather])

  // Play animation loop through forecast hours
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setActiveHourIndex((prev) => (prev + 1) % WINDY_HOURLY_DATA.length)
    }, 1200)
    return () => clearInterval(interval)
  }, [isPlaying])

  // Active layer config
  const layerConfig = useMemo<WindyLayerConfig>(
    () => WINDY_LAYERS.find((l) => l.id === activeLayer) ?? (WINDY_LAYERS[0] as WindyLayerConfig),
    [activeLayer]
  )

  // Active basemap provider config
  const currentBasemap = useMemo<MapTileProvider>(
    () =>
      MAP_TILE_PROVIDERS.find((p) => p.id === activeBasemap) ??
      (MAP_TILE_PROVIDERS[0] as MapTileProvider),
    [activeBasemap]
  )

  // Currently selected Block & Panchayat objects
  const selectedBlock = useMemo(
    () => blocks.find((b) => b.id === selectedBlockId) ?? blocks[0],
    [selectedBlockId]
  )
  const selectedBlockProfile = useMemo(
    () => (selectedBlockId ? blockWeatherProfiles[selectedBlockId] : null),
    [selectedBlockId]
  )
  const selectedPanchayat = useMemo(
    () => panchayats.find((p) => p.id === selectedPanchayatId) ?? panchayats[0],
    [selectedPanchayatId]
  )

  // Computed visible blocks based on scope
  const visibleBlocks = useMemo(() => {
    if (panchayatScope === 'all' || !selectedDistrictId) return blocks
    return blocks.filter((b) => b.districtId === selectedDistrictId)
  }, [selectedDistrictId, panchayatScope])

  // Computed visible panchayats (allows viewing all panchayats simultaneously)
  const visiblePanchayats = useMemo(() => {
    if (panchayatScope === 'all') return panchayats
    if (panchayatScope === 'block') {
      return panchayats.filter((p) => p.blockId === selectedBlockId)
    }
    // Default 'district': all panchayats in the current district are visible
    return panchayats.filter((p) => !selectedDistrictId || p.districtId === selectedDistrictId)
  }, [panchayatScope, selectedDistrictId, selectedBlockId])

  // Current Coordinates & Details
  const currentCoords = useMemo(() => {
    if (activeSelectionType === 'block' && selectedBlock) {
      const dmsLat = toDMS(selectedBlock.center[0], true)
      const dmsLng = toDMS(selectedBlock.center[1], false)
      return {
        lat: selectedBlock.center[0],
        lng: selectedBlock.center[1],
        dmsLat,
        dmsLng,
        name: `${selectedBlock.name} Block`,
      }
    }
    if (customPoint) {
      return {
        lat: customPoint.lat,
        lng: customPoint.lng,
        dmsLat: customPoint.dmsLat,
        dmsLng: customPoint.dmsLng,
        name: customPoint.name,
      }
    }
    return {
      lat: selectedCity.lat,
      lng: selectedCity.lng,
      dmsLat: selectedCity.dmsLat,
      dmsLng: selectedCity.dmsLng,
      name: selectedCity.name,
    }
  }, [activeSelectionType, selectedBlock, customPoint, selectedCity])

  // Current Downscaling Result fusing real live weather & terrain
  const currentDownscalingResult = useMemo<DownscalingInferenceResult>(() => {
    const baseT = liveWeatherData?.temperature ?? selectedCity.temp
    const baseR = liveWeatherData?.precipitation ?? activeHourlyPoint.rain
    const baseW = liveWeatherData?.windSpeed
      ? Number((liveWeatherData.windSpeed * 0.54).toFixed(1)) // km/h to kt
      : selectedCity.windSpeed

    return getDownscaledInference(
      currentCoords.lat,
      currentCoords.lng,
      currentCoords.name,
      baseT,
      baseR,
      baseW
    )
  }, [currentCoords, liveWeatherData, selectedCity, activeHourlyPoint])

  // Execute interactive downscaling simulation
  const handleRunDownscaler = useCallback(() => {
    setIsDownscalingInspectorOpen(true)
    setIsDownscalingRunning(true)
    setDownscalingPipelineStep(1)

    setTimeout(() => setDownscalingPipelineStep(2), 400)
    setTimeout(() => setDownscalingPipelineStep(3), 850)
    setTimeout(() => setDownscalingPipelineStep(4), 1300)
    setTimeout(() => {
      setIsDownscalingRunning(false)
    }, 1600)
  }, [])

  // Search Results filtering cities, blocks, and gram panchayats
  const searchResults = useMemo<{
    cities: WindyCity[]
    blocks: typeof blocks
    panchayats: typeof panchayats
  }>(() => {
    if (!searchQuery.trim()) {
      return { cities: [], blocks: [], panchayats: [] }
    }
    const q = searchQuery.toLowerCase()
    const matchedCities = WINDY_CITIES.filter((c) =>
      c.name.toLowerCase().includes(q)
    )
    const matchedBlocks = blocks.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.districtId.toLowerCase().includes(q)
    )
    const matchedPanchayats = panchayats.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.blockId.toLowerCase().includes(q) ||
        p.districtId.toLowerCase().includes(q)
    )
    return { cities: matchedCities, blocks: matchedBlocks, panchayats: matchedPanchayats }
  }, [searchQuery])

  // Real-time Nominatim search across India when query is typed
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 3) {
      setNominatimResults([])
      return
    }
    const timer = setTimeout(async () => {
      setIsSearchingNominatim(true)
      try {
        const results = await searchNominatimIndia(searchQuery)
        setNominatimResults(results)
      } catch (e) {
        console.warn(e)
      } finally {
        setIsSearchingNominatim(false)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // City icons for Leaflet
  const getCityIcon = useCallback(
    (city: WindyCity, isSelected: boolean) => {
      return L.divIcon({
        className: 'grammausam-city-marker-wrap',
        html: `
        <div class="flex items-center gap-1.5 cursor-pointer group select-none ${
          isSelected ? 'scale-110' : ''
        }">
          <span class="size-2 rounded-full ${
            isSelected
              ? 'bg-amber-400 ring-4 ring-amber-400/40 shadow-[0_0_12px_#fbbf24]'
              : 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:bg-emerald-400'
          }"></span>
          <div class="flex items-center gap-1 text-[11px] font-semibold text-slate-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            <span>${city.name}</span>
            <span class="text-xs ${
              isSelected ? 'text-amber-600 font-bold' : 'text-slate-600'
            }">${city.temp}°</span>
          </div>
        </div>
      `,
        iconSize: [110, 24],
        iconAnchor: [4, 12],
      })
    },
    []
  )

  // Block Level Centroid Icon for Leaflet
  const getBlockIcon = useCallback((b: (typeof blocks)[0], isSelected: boolean) => {
    const profile = blockWeatherProfiles[b.id]
    const temp = profile ? `${profile.avgTemp}°` : ''
    return L.divIcon({
      className: 'grammausam-block-marker-wrap',
      html: `
        <div class="flex items-center gap-1.5 cursor-pointer group select-none transition-transform hover:scale-105 ${
          isSelected ? 'scale-110 ring-2 ring-indigo-400 rounded-lg p-0.5' : ''
        }">
          <span class="size-4 rounded-md flex items-center justify-center text-[9px] font-black shadow-md ${
            isSelected
              ? 'bg-indigo-500 text-white ring-4 ring-indigo-400/50 shadow-[0_0_14px_#6366f1]'
              : 'bg-indigo-600/95 text-indigo-100 border border-indigo-400/60 shadow-[0_0_8px_rgba(99,102,241,0.6)]'
          }">B</span>
          <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/95 border ${
            isSelected ? 'border-indigo-400 text-indigo-700' : 'border-slate-300/80 text-slate-700'
          } text-[10px] font-bold backdrop-blur-md shadow-xl">
            <span class="tracking-tight">${b.name} Block</span>
            ${temp ? `<span class="text-amber-400 text-[10px] font-mono font-black">${temp}</span>` : ''}
          </div>
        </div>
      `,
      iconSize: [120, 26],
      iconAnchor: [8, 13],
    })
  }, [])

  // Panchayat Level Centroid Icon for Leaflet
  const getPanchayatIcon = useCallback((p: (typeof panchayats)[0], isSelected: boolean) => {
    return L.divIcon({
      className: 'grammausam-panchayat-marker-wrap',
      html: `
        <div class="flex items-center gap-1 cursor-pointer select-none transition-transform hover:scale-105 ${
          isSelected ? 'scale-110' : ''
        }">
          <span class="size-2.5 rounded-full ${
            isSelected
              ? 'bg-emerald-400 ring-4 ring-emerald-400/60 shadow-[0_0_12px_#10b981]'
              : 'bg-emerald-500 ring-2 ring-emerald-400/40 shadow-[0_0_6px_#10b981]'
          }"></span>
          <span class="px-1.5 py-0.5 rounded-md bg-white/95 border ${
            isSelected ? 'border-emerald-400 text-emerald-700 ring-1 ring-emerald-400/40 font-bold' : 'border-emerald-400/50 text-emerald-800 font-semibold'
          } text-[9px] backdrop-blur-md shadow-lg">
            ${p.name}
          </span>
        </div>
      `,
      iconSize: [100, 22],
      iconAnchor: [5, 11],
    })
  }, [])

  // Pin marker icon
  const pinIcon = useMemo(() => {
    return L.divIcon({
      className: 'grammausam-pin-wrap',
      html: `
        <div class="relative flex items-center justify-center">
          <span class="absolute size-6 rounded-full bg-emerald-400/40 animate-ping"></span>
          <span class="size-3.5 rounded-full bg-emerald-400 border-2 border-white shadow-xl"></span>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    })
  }, [])

  // Handle click on map to set custom pin & run live weather + downscaling
  const handleMapClick = (lat: number, lng: number) => {
    const dmsLat = toDMS(lat, true)
    const dmsLng = toDMS(lng, false)
    setCustomPoint({
      lat,
      lng,
      dmsLat,
      dmsLng,
      name: `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`,
    })
    setActiveSelectionType('custom')
    loadLiveWeather(lat, lng)
    setIsPopupOpen(true)
  }

  // Handle City Select
  const handleSelectCity = (city: WindyCity) => {
    setSelectedCity(city)
    setCustomPoint(null)
    setActiveSelectionType('city')
    setMapZoom(9)
    loadLiveWeather(city.lat, city.lng)
    setSearchQuery('')
    setIsSearchOpen(false)
    setIsPopupOpen(true)
  }

  // Handle Block Select (Block Level)
  const handleSelectBlock = useCallback(
    (b: (typeof blocks)[0]) => {
      setSelectedBlockId(b.id)
      setSelectedDistrictId(b.districtId)
      setActiveSelectionType('block')
      setCustomPoint(null)
      setMapZoom(10)
      loadLiveWeather(b.center[0], b.center[1])
      setSearchQuery('')
      setIsSearchOpen(false)
      setIsPopupOpen(true)
    },
    [loadLiveWeather]
  )

  // Handle Panchayat Select (Panchayat Level)
  const handleSelectPanchayat = useCallback(
    (p: (typeof panchayats)[0]) => {
      setSelectedPanchayatId(p.id)
      setSelectedBlockId(p.blockId)
      setSelectedDistrictId(p.districtId)
      setActiveSelectionType('panchayat')
      setMapZoom(11)
      const dmsLat = toDMS(p.center[0], true)
      const dmsLng = toDMS(p.center[1], false)
      setCustomPoint({
        lat: p.center[0],
        lng: p.center[1],
        dmsLat,
        dmsLng,
        name: `${p.name} Panchayat`,
      })
      loadLiveWeather(p.center[0], p.center[1])
      setSearchQuery('')
      setIsSearchOpen(false)
      setIsPopupOpen(true)
    },
    [loadLiveWeather]
  )

  // Handle Nominatim Geocoded Place Select
  const handleSelectNominatim = (loc: GeocodedLocation) => {
    const dmsLat = toDMS(loc.lat, true)
    const dmsLng = toDMS(loc.lng, false)
    setCustomPoint({
      lat: loc.lat,
      lng: loc.lng,
      dmsLat,
      dmsLng,
      name: loc.name,
    })
    setActiveSelectionType('custom')
    setMapZoom(11)
    loadLiveWeather(loc.lat, loc.lng)
    setSearchQuery('')
    setIsSearchOpen(false)
    setIsPopupOpen(true)
  }

  // Generate Coarse 25km Grid Bounds for visualization
  const coarseGridRectangles = useMemo(() => {
    const rects: [number, number][][] = []
    const startLat = 18.0
    const endLat = 21.0
    const startLng = 73.0
    const endLng = 75.0
    const step = 0.25 // ~25km

    for (let lat = startLat; lat < endLat; lat += step) {
      for (let lng = startLng; lng < endLng; lng += step) {
        rects.push([
          [lat, lng],
          [lat + step, lng + step],
        ])
      }
    }
    return rects
  }, [])

  // Active Hourly Timeline Data (Fusing Live Open-Meteo Hourly when available)
  const activeTimelineData = useMemo(() => {
    if (liveWeatherData?.hourly && liveWeatherData.hourly.length >= 8) {
      return liveWeatherData.hourly.slice(0, 16).map((lh, i) => ({
        id: `live-${i}`,
        displayHour: lh.displayHour,
        temp: lh.temp,
        rain: lh.rain,
        wind: Math.round(lh.wind * 0.54), // convert km/h to kt
        gust: Math.round(lh.wind * 0.54 * 1.5),
        windDir: 'WSW',
        windDeg: lh.windDir,
        icon: lh.condition.includes('Rain')
          ? '🌧️'
          : lh.condition.includes('Clear')
            ? '☀️'
            : '⛅',
        condition: lh.condition,
      }))
    }
    return WINDY_HOURLY_DATA
  }, [liveWeatherData])

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#e8eef5] font-sans text-slate-900 select-none">
      {/* 1. TOP HEADER BAR (GramMausam AI Downscaling Studio) */}
      <header className="absolute top-0 inset-x-0 z-[1000] flex h-14 items-center justify-between px-3 md:px-5 bg-white/95 border-b border-slate-200/90 shadow-sm backdrop-blur-md pointer-events-auto">
        {/* Left: Smart Location Search Bar */}
        <div className="relative flex items-center gap-2">
          <div className="flex h-9.5 items-center rounded-full bg-slate-50 border border-slate-300 px-3 shadow-sm text-slate-800 transition-all focus-within:ring-2 focus-within:ring-emerald-600 focus-within:bg-white w-48 sm:w-64 md:w-72">
            <Search className="size-4 text-emerald-600 shrink-0" />
            <input
              type="text"
              placeholder={t('map.searchPlaceholder', 'Search Panchayat or City...')}
              value={searchQuery || (isSearchOpen ? '' : currentCoords.name)}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 w-full bg-transparent text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
              >
                <X className="size-3.5" />
              </button>
            )}
            <button
              type="button"
              title="Locate my farm position"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((pos) => {
                    handleMapClick(pos.coords.latitude, pos.coords.longitude)
                  })
                }
              }}
              className="ml-1 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer p-0.5"
            >
              <Crosshair className="size-4" />
            </button>
            <button
              type="button"
              title="Share downscaling map link"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href)
                  alert('VataVaran Downscaling link copied to clipboard!')
                }
              }}
              className="ml-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-0.5"
            >
              <Share2 className="size-4" />
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && (searchQuery.trim() || searchResults.cities.length > 0) && (
            <div className="absolute top-12 left-0 w-84 max-h-96 overflow-y-auto rounded-xl border border-slate-200 bg-white/98 p-1.5 shadow-2xl backdrop-blur-xl z-[1200]">
              {/* 1. Blocks / Talukas */}
              {searchResults.blocks.length > 0 && (
                <div className="mb-2">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1">
                    <Building2 className="size-3" />
                    <span>Blocks / Talukas (Synoptic Level)</span>
                  </div>
                  {searchResults.blocks.map((b) => (
                    <button
                      type="button"
                      key={b.id}
                      onClick={() => handleSelectBlock(b)}
                      className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-indigo-500" />
                        <span className="font-bold text-indigo-950">{b.name} Block</span>
                      </div>
                      <span className="text-[10px] text-slate-500 capitalize">
                        {b.districtId} District
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* 2. Gram Panchayats */}
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 border-t border-slate-100 pt-2 flex items-center gap-1">
                <Sprout className="size-3" />
                <span>Gram Panchayats (1km AI Downscaling)</span>
              </div>
              {searchResults.panchayats.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => handleSelectPanchayat(p)}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-emerald-950">
                      {p.name} Panchayat
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 capitalize">
                    {p.blockId} · {p.districtId}
                  </span>
                </button>
              ))}

              {/* 3. Major Weather Stations */}
              <div className="mt-2 border-t border-slate-100 px-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Radio className="size-3" />
                <span>Major Weather Stations</span>
              </div>
              {searchResults.cities.map((city) => (
                <button
                  type="button"
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-slate-800">{city.name}</span>
                  <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                    <span>{city.temp}°C</span>
                    <span className="text-[10px] text-slate-400">{city.country}</span>
                  </div>
                </button>
              ))}

              {/* 4. Real-time Nominatim India Geocoding Results */}
              {nominatimResults.length > 0 && (
                <div className="mt-2 border-t border-slate-100 px-2 pt-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
                    <Globe className="size-3" />
                    <span>OpenStreetMap Locations (India)</span>
                  </div>
                  {nominatimResults.map((loc) => (
                    <button
                      type="button"
                      key={loc.id}
                      onClick={() => handleSelectNominatim(loc)}
                      className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs hover:bg-slate-100 transition-colors cursor-pointer mt-0.5"
                    >
                      <span className="font-semibold text-slate-900 truncate max-w-[170px]">
                        {loc.name}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate max-w-[90px]">
                        {loc.district || loc.state}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {isSearchingNominatim && (
                <div className="px-3 py-2 text-center text-[10px] text-slate-500 italic">
                  Searching OpenStreetMap India geocoder...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Center: VataVaran Branding & Resolution Pill */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition-transform group-hover:scale-105">
              VV
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
                  Vata<span className="text-emerald-600">Varan</span>
                </span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-800 border border-emerald-300">
                  Spatial Downscaling Studio
                </span>
              </div>
            </div>
          </Link>

          {/* Active Resolution Pill */}
          <div className="flex items-center gap-1.5 rounded-full border border-slate-300 bg-slate-100/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
            <span
              className={`size-2 rounded-full ${
                downscalingMode === 'downscaled-1km'
                  ? 'bg-emerald-600 animate-pulse'
                  : downscalingMode === 'compare'
                    ? 'bg-amber-500'
                    : 'bg-sky-600'
              }`}
            />
            <span>
              {downscalingMode === 'downscaled-1km'
                ? '1km AI Super-Resolution'
                : downscalingMode === 'compare'
                  ? 'Coarse vs 1km Delta'
                  : '25km Coarse Global NWP'}
            </span>
          </div>
        </div>

        {/* Right: Actions, Downscaling Mode Switcher & Menu */}
        <div className="flex items-center gap-2">
          {/* Resolution Mode Switcher Buttons */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs shadow-sm">
            <button
              type="button"
              onClick={() => setDownscalingMode('downscaled-1km')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-bold transition-all cursor-pointer ${
                downscalingMode === 'downscaled-1km'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="1km High-Resolution AI Downscaling for every Panchayat"
            >
              <BrainCircuit className="size-3.5" />
              <span className="hidden sm:inline">
                {language === 'mr' ? '१ किमी एआय' : '1km AI'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setDownscalingMode('coarse-25km')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-bold transition-all cursor-pointer ${
                downscalingMode === 'coarse-25km'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Raw 25km coarse global GFS/ECMWF grid"
            >
              <Layers3 className="size-3.5" />
              <span className="hidden sm:inline">
                {language === 'mr' ? '२५ किमी' : '25km Coarse'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setDownscalingMode('compare')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-bold transition-all cursor-pointer ${
                downscalingMode === 'compare'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Compare Coarse NWP vs 1km Localized Micro-Climate"
            >
              <BarChart3 className="size-3.5" />
              <span className="hidden md:inline">
                {language === 'mr' ? 'तुलना' : 'Compare'}
              </span>
            </button>
          </div>

          {/* Run Downscaler Action Button */}
          <button
            type="button"
            onClick={handleRunDownscaler}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            title="Execute AI Spatial Downscaling on selected area"
          >
            <BrainCircuit className="size-4" />
            <span className="font-extrabold">
              {language === 'mr' ? 'डाउनस्केलर चालवा' : 'Run Downscaler'}
            </span>
          </button>

          {/* Convenient Language Switcher in Weather Map */}
          <LanguageSwitcher variant="compact" />

          {/* Menu Drawer Hamburger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="grid size-9 place-items-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-sm transition-colors cursor-pointer border border-slate-300"
            aria-label="Open menu"
          >
            <MenuIcon className="size-4.5" />
          </button>
        </div>
      </header>

      {/* 2. TOP FLOATING ADMINISTRATIVE HIERARCHY & MAP API BAR */}
      <div className="absolute top-15.5 left-3 sm:left-5 z-[950] flex flex-wrap items-center gap-2 pointer-events-auto bg-white/95 border border-slate-200/90 rounded-2xl p-2 shadow-xl backdrop-blur-xl text-slate-800">
        {/* Administrative Level Switcher: Block Level vs Panchayat Level vs Both */}
        <div className="flex items-center rounded-xl bg-slate-100 border border-slate-200 p-0.5 text-xs shadow-inner">
          <button
            type="button"
            onClick={() => {
              setAdminLevel('block')
              setActiveSelectionType('block')
              if (selectedBlock) {
                handleSelectBlock(selectedBlock)
              }
            }}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-extrabold transition-all cursor-pointer ${
              adminLevel === 'block'
                ? 'bg-indigo-600 text-white shadow-md ring-1 ring-indigo-400'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Focus on Block Level (Taluka boundaries and synoptic regional climate)"
          >
            <Building2 className="size-3.5 text-indigo-500" />
            <span>{language === 'mr' ? 'तालुका पातळी' : 'Block Level'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAdminLevel('panchayat')
              setActiveSelectionType('panchayat')
              if (selectedPanchayat) {
                handleSelectPanchayat(selectedPanchayat)
              }
            }}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-extrabold transition-all cursor-pointer ${
              adminLevel === 'panchayat'
                ? 'bg-emerald-600 text-white shadow-md ring-1 ring-emerald-400'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Focus on Gram Panchayat Level (1km micro-climate cells and farm advisories)"
          >
            <Sprout className="size-3.5 text-emerald-500" />
            <span>{language === 'mr' ? 'ग्रामपंचायत पातळी (१ किमी)' : 'Panchayat Level (1km)'}</span>
          </button>
          <button
            type="button"
            onClick={() => setAdminLevel('both')}
            className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-bold transition-all cursor-pointer ${
              adminLevel === 'both'
                ? 'bg-slate-800 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Show both Block and Panchayat boundaries simultaneously in nested hierarchy"
          >
            <Layers className="size-3.5" />
            <span className="hidden sm:inline">
              {language === 'mr' ? 'दोन्ही स्तर' : 'Both Levels'}
            </span>
          </button>
        </div>

        {/* Quick Hierarchical Drill-down Selectors */}
        <div className="flex flex-wrap items-center gap-1.5 border-l border-slate-200 pl-2">
          {/* District selector */}
          <select
            value={selectedDistrictId}
            onChange={(e) => {
              const distId = e.target.value
              setSelectedDistrictId(distId)
              const dist = districts.find((d) => d.id === distId)
              const firstB = blocks.find((b) => b.districtId === distId)
              if (firstB) {
                handleSelectBlock(firstB)
                const firstP = panchayats.find((p) => p.blockId === firstB.id)
                if (firstP) {
                  setSelectedPanchayatId(firstP.id)
                }
              }
              if (dist) {
                setMapZoom(10)
                loadLiveWeather(dist.center[0], dist.center[1])
              }
            }}
            className="bg-white border border-slate-300 text-slate-800 text-xs font-bold rounded-lg px-2 py-1 shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            title="Filter District"
          >
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {getPlaceName(d.name)} {language === 'mr' ? 'जिल्हा' : 'Dist.'}
              </option>
            ))}
          </select>

          {/* Block selector */}
          <select
            value={selectedBlockId}
            onChange={(e) => {
              const b = blocks.find((x) => x.id === e.target.value)
              if (b) {
                handleSelectBlock(b)
                const firstP = panchayats.find((p) => p.blockId === b.id)
                if (firstP) {
                  setSelectedPanchayatId(firstP.id)
                }
              }
            }}
            className="bg-white border border-indigo-300 text-indigo-900 text-xs font-bold rounded-lg px-2 py-1 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            title="Select Block / Taluka"
          >
            {blocks
              .filter((b) => !selectedDistrictId || b.districtId === selectedDistrictId)
              .map((b) => (
                <option key={b.id} value={b.id}>
                  {getPlaceName(b.name)} {language === 'mr' ? 'तालुका' : 'Block'}
                </option>
              ))}
          </select>

          {/* Panchayat selector */}
          <select
            value={selectedPanchayatId}
            onChange={(e) => {
              const p = panchayats.find((x) => x.id === e.target.value)
              if (p) handleSelectPanchayat(p)
            }}
            className="bg-white border border-emerald-400 text-emerald-950 text-xs font-bold rounded-lg px-2 py-1 shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer max-w-[140px] sm:max-w-[170px]"
            title="Select Gram Panchayat"
          >
            {panchayats
              .filter((p) => !selectedBlockId || p.blockId === selectedBlockId)
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {getPlaceName(p.name)} {language === 'mr' ? '(पंचायत)' : '(Panchayat)'}
                </option>
              ))}
          </select>

          {/* Visibility Scope Pill: All in District vs All State vs Block */}
          <div className="hidden lg:flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[11px] gap-0.5">
            <button
              type="button"
              onClick={() => setPanchayatScope('district')}
              className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                panchayatScope === 'district'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Make all Panchayats in selected district visible"
            >
              All in District ({panchayats.filter((p) => p.districtId === selectedDistrictId).length})
            </button>
            <button
              type="button"
              onClick={() => setPanchayatScope('all')}
              className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                panchayatScope === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Make all 82 Panchayats across Maharashtra visible"
            >
              All Panchayats ({panchayats.length})
            </button>
            <button
              type="button"
              onClick={() => setPanchayatScope('block')}
              className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                panchayatScope === 'block'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Show only selected block Panchayats"
            >
              Block Only
            </button>
          </div>
        </div>

        {/* Live Weather API Status Pill */}
        <div className="hidden xl:flex items-center gap-1.5 border-l border-slate-200 pl-2 text-[10px]">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-emerald-700">Open-Meteo Live API</span>
          <span className="text-slate-500 font-mono">
            {liveWeatherData?.fetchedAt ? `(${liveWeatherData.fetchedAt})` : '(Syncing...)'}
          </span>
          <button
            type="button"
            onClick={() => loadLiveWeather(currentCoords.lat, currentCoords.lng)}
            className="text-slate-500 hover:text-slate-800 p-0.5 transition-colors cursor-pointer"
            title="Refresh live telemetry for current coordinates"
          >
            <RefreshCw className={`size-3 ${isLiveApiLoading ? 'animate-spin text-emerald-600' : ''}`} />
          </button>
        </div>

        {/* Map Tile API Selector */}
        <div className="hidden md:flex items-center gap-1 border-l border-slate-200 pl-2">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Map:</span>
          {MAP_TILE_PROVIDERS.map((prov) => (
            <button
              type="button"
              key={prov.id}
              onClick={() => setActiveBasemap(prov.id)}
              className={`rounded px-1.5 py-0.5 text-[9px] font-bold transition-all cursor-pointer ${
                activeBasemap === prov.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200'
              }`}
              title={prov.name}
            >
              {prov.id === 'osm-standard'
                ? '🏛️ Govt OSM'
                : prov.id === 'esri-street'
                  ? '🗺️ Survey GIS'
                  : prov.id === 'opentopo'
                    ? '⛰️ Topo'
                    : prov.id === 'esri-satellite'
                      ? '🛰️ Satellite'
                      : '🌙 Dark GIS'}
            </button>
          ))}
        </div>
      </div>

      {/* 3. RIGHT-SIDE FLOATING VERTICAL TOOLBAR (Atmospheric & Downscaling Layers) */}
      <aside className="absolute right-3.5 top-16 z-[1000] flex flex-col items-end gap-1.5 pointer-events-auto">
        {WINDY_LAYERS.map((layer) => {
          const isActive = activeLayer === layer.id
          const isAiLayer =
            layer.id === 'aiDownscaledRain' ||
            layer.id === 'aiDownscaledTemp' ||
            layer.id === 'soilMoisture'

          return (
            <button
              type="button"
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`group flex items-center justify-end gap-2.5 rounded-full pl-3 pr-1 py-1 transition-all cursor-pointer ${
                isActive
                  ? isAiLayer
                    ? 'bg-slate-900 text-white shadow-2xl ring-2 ring-emerald-500'
                    : 'bg-slate-900 text-white shadow-2xl ring-2 ring-amber-500'
                  : 'bg-white/95 text-slate-800 hover:bg-white hover:text-slate-950 backdrop-blur-md border border-slate-200/90 shadow-md'
              }`}
            >
              {/* Layer label */}
              <div className="flex items-center gap-1.5">
                {isAiLayer && (
                  <span className="rounded bg-emerald-100 px-1 py-0.2 text-[8px] font-bold text-emerald-800 border border-emerald-300">
                    AI 1KM
                  </span>
                )}
                <span
                  className={`text-[11px] font-semibold tracking-tight transition-opacity ${
                    isActive
                      ? isAiLayer
                        ? 'text-emerald-300 font-bold'
                        : 'text-amber-300 font-bold'
                      : 'opacity-90 group-hover:opacity-100 text-slate-700'
                  }`}
                >
                  {layer.label}
                </span>
              </div>

              {/* Circular Badge Icon */}
              <div
                className={`grid size-7.5 place-items-center rounded-full transition-transform group-hover:scale-110 shadow-sm ${
                  isActive
                    ? isAiLayer
                      ? 'bg-emerald-400 text-slate-950 font-bold ring-2 ring-white/60'
                      : 'bg-amber-400 text-slate-950 font-bold ring-2 ring-white/60'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {layer.id === 'aiDownscaledRain' && <BrainCircuit className="size-4 text-slate-950" />}
                {layer.id === 'aiDownscaledTemp' && <Mountain className="size-4 text-slate-950" />}
                {layer.id === 'soilMoisture' && <Sprout className="size-4" />}
                {layer.id === 'radar' && <Radio className="size-4" />}
                {layer.id === 'satellite' && <Satellite className="size-4" />}
                {layer.id === 'wind' && <Wind className="size-4" />}
                {layer.id === 'rain' && <CloudRain className="size-4" />}
                {layer.id === 'temperature' && <Thermometer className="size-4" />}
                {layer.id === 'hurricanes' && <Zap className="size-4" />}
                {layer.id === 'clouds' && <Cloud className="size-4" />}
                {layer.id === 'waves' && <Waves className="size-4" />}
                {layer.id === 'rainAccum' && <Layers className="size-4" />}
                {layer.id === 'thunderstorms' && <Flame className="size-4" />}
                {layer.id === 'airQuality' && <ShieldAlert className="size-4" />}
              </div>
            </button>
          )
        })}
      </aside>

      {/* 4. MAIN GIS LEAFLET MAP VIEWPORT */}
      <div className="relative h-full w-full">
        {/* Animated Meteorological Particles & Downscaled Convective Cells */}
        <WeatherCanvasLayer activeLayer={activeLayer} downscalingMode={downscalingMode} />

        <MapContainer
          center={[currentCoords.lat, currentCoords.lng]}
          zoom={mapZoom}
          minZoom={4}
          maxZoom={18}
          zoomControl={false}
          className="h-full w-full bg-[#e8eef5]"
        >
          {/* Dynamic Map Tiles from Map API Provider (Satellite, Topo, Dark, Street) */}
          <TileLayer
            key={currentBasemap.id}
            attribution={currentBasemap.attribution}
            url={currentBasemap.url}
            maxZoom={currentBasemap.maxZoom}
          />

          <MapController center={[currentCoords.lat, currentCoords.lng]} zoom={mapZoom} />
          <MapClickInspector onSelectPoint={handleMapClick} />

          {/* 25km Coarse NWP Grid Lines Overlay (When enabled or in coarse/compare mode) */}
          {(showCoarseGrid || downscalingMode === 'coarse-25km' || downscalingMode === 'compare') &&
            coarseGridRectangles.map((bounds, idx) => (
              <Rectangle
                key={`grid-${idx}`}
                bounds={bounds as [[number, number], [number, number]]}
                pathOptions={{
                  color: '#64748b',
                  weight: 0.8,
                  fillColor: idx % 2 === 0 ? '#38bdf8' : '#0284c7',
                  fillOpacity: 0.04,
                  dashArray: '3, 6',
                }}
              />
            ))}

          {/* BLOCK LEVEL BOUNDARY POLYGONS & LABELS */}
          {showBlockBoundaries &&
            (adminLevel === 'block' || adminLevel === 'both') &&
            visibleBlocks.map((b) => {
              const isSelected = b.id === selectedBlockId && activeSelectionType === 'block'
              return (
                <React.Fragment key={`block-${b.id}`}>
                  <Polygon
                    positions={b.polygon}
                    pathOptions={{
                      color: isSelected ? '#a855f7' : '#6366f1',
                      weight: isSelected ? 3.5 : 2,
                      fillColor: isSelected ? '#a855f7' : '#4f46e5',
                      fillOpacity: isSelected ? 0.28 : 0.08,
                      dashArray: '6, 6',
                    }}
                    eventHandlers={{
                      click: () => handleSelectBlock(b),
                    }}
                  />
                  <Marker
                    position={b.center}
                    icon={getBlockIcon(b, isSelected)}
                    eventHandlers={{
                      click: () => handleSelectBlock(b),
                    }}
                  />
                </React.Fragment>
              )
            })}

          {/* GRAM PANCHAYAT INTERACTIVE BOUNDARY POLYGONS & 1KM CELLS - ALL PANCHAYATS VISIBLE */}
          {showPanchayatBoundaries &&
            (adminLevel === 'panchayat' || adminLevel === 'both') &&
            visiblePanchayats.map((p) => {
              const isSelected =
                p.id === selectedPanchayatId && activeSelectionType === 'panchayat'
              return (
                <React.Fragment key={`panchayat-${p.id}`}>
                  <Polygon
                    positions={p.polygon}
                    pathOptions={{
                      color: isSelected ? '#10b981' : '#06b6d4',
                      weight: isSelected ? 3.5 : 1.8,
                      fillColor: isSelected ? '#10b981' : '#06b6d4',
                      fillOpacity: isSelected ? 0.38 : 0.14,
                      dashArray: isSelected ? undefined : '3, 4',
                    }}
                    eventHandlers={{
                      click: () => handleSelectPanchayat(p),
                    }}
                  />
                  <Marker
                    position={p.center}
                    icon={getPanchayatIcon(p, isSelected)}
                    eventHandlers={{
                      click: () => handleSelectPanchayat(p),
                    }}
                  />
                </React.Fragment>
              )
            })}

          {/* Regional Weather Station Markers */}
          {WINDY_CITIES.map((city) => {
            const isSelected = city.id === selectedCity.id && !customPoint
            return (
              <Marker
                key={city.id}
                position={[city.lat, city.lng]}
                icon={getCityIcon(city, isSelected)}
                eventHandlers={{
                  click: () => handleSelectCity(city),
                }}
              />
            )
          })}

          {/* Custom Point Marker if User Clicked arbitrary point */}
          {customPoint && activeSelectionType === 'custom' && (
            <Marker position={[customPoint.lat, customPoint.lng]} icon={pinIcon} />
          )}
        </MapContainer>

        {/* 5. HIERARCHICAL LEVEL INSPECTION POPUP / CALLOUT CARD */}
        {isPopupOpen && (
          <div className="absolute top-[36%] left-[52%] -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-auto">
            <div className="flex flex-col items-center">
              {/* Tooltip Card */}
              <div className="min-w-[250px] max-w-[320px] rounded-2xl border border-slate-200 bg-white/98 p-3.5 shadow-2xl backdrop-blur-xl text-slate-900 animate-in zoom-in-95 duration-150">
                {/* 1. BLOCK LEVEL VIEW */}
                {activeSelectionType === 'block' && selectedBlock ? (
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-indigo-500 animate-ping" />
                          <span className="rounded bg-indigo-100 px-1.5 py-0.2 text-[9px] font-bold uppercase text-indigo-800 border border-indigo-300">
                            Block Level Synoptic
                          </span>
                        </div>
                        <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                          {selectedBlock.name} Block
                        </h3>
                        <p className="text-[10px] text-slate-500">
                          {selectedBlock.districtId.toUpperCase()} District ·{' '}
                          {selectedBlockProfile?.areaKm2 || 1200} km²
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsPopupOpen(false)}
                        className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-0.5"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>

                    {/* Block Synoptic Weather Metrics */}
                    <div className="mt-2.5 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-2 border border-slate-200 text-xs">
                      <div>
                        <span className="text-[9px] text-slate-500 block">Synoptic Temp</span>
                        <span className="text-sm font-black text-amber-600">
                          {liveWeatherData?.temperature ?? selectedBlockProfile?.avgTemp ?? 31.6}°C
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block">Avg Rainfall</span>
                        <span className="text-sm font-black text-sky-600">
                          {liveWeatherData?.precipitation ?? selectedBlockProfile?.avgRainfall ?? 15.6} mm
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block">Humidity</span>
                        <span className="text-xs font-bold text-slate-800">
                          {liveWeatherData?.humidity ?? selectedBlockProfile?.avgHumidity ?? 72}%
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block">Wind Speed</span>
                        <span className="text-xs font-bold text-slate-800">
                          {liveWeatherData?.windSpeed ?? selectedBlockProfile?.avgWind ?? 11.8} km/h
                        </span>
                      </div>
                    </div>

                    {/* Constituent Gram Panchayats Grid */}
                    <div className="mt-2.5">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 mb-1">
                        <span>Constituent Panchayats ({panchayats.filter((p) => p.blockId === selectedBlock.id).length}):</span>
                        <span className="text-[9px] text-emerald-700">Click to Drill-Down</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {panchayats
                          .filter((p) => p.blockId === selectedBlock.id)
                          .map((p) => (
                            <button
                              type="button"
                              key={p.id}
                              onClick={() => {
                                setAdminLevel('panchayat')
                                handleSelectPanchayat(p)
                              }}
                              className="rounded-md bg-slate-100 hover:bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:text-white transition-colors cursor-pointer border border-slate-200"
                            >
                              🌾 {p.name}
                            </button>
                          ))}
                      </div>
                    </div>

                    {/* Block Action Buttons */}
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAdminLevel('panchayat')
                          const firstP = panchayats.find((p) => p.blockId === selectedBlock.id)
                          if (firstP) handleSelectPanchayat(firstP)
                        }}
                        className="flex-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 py-1.5 text-center text-[10px] font-extrabold text-white transition-colors cursor-pointer shadow-md"
                      >
                        Drill Down to Panchayats (1km)
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 2. PANCHAYAT LEVEL VIEW */
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                          <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[9px] font-bold uppercase text-emerald-800 border border-emerald-300">
                            Panchayat 1km AI
                          </span>
                        </div>
                        <h3 className="text-xs font-bold text-slate-900 leading-tight mt-1">
                          {currentCoords.name}
                        </h3>
                        <p className="text-[10px] text-slate-500">
                          {selectedPanchayat?.blockId?.toUpperCase() || 'SINNAR'} Block ·{' '}
                          {selectedPanchayat?.districtId?.toUpperCase() || 'NASHIK'} Dist.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsPopupOpen(false)}
                        className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-0.5"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>

                    {/* Metric Display & Downscaled Comparison */}
                    <div className="mt-2.5 border-t border-slate-200 pt-2 space-y-1.5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] text-slate-600">AI Downscaled Temp:</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs font-bold text-emerald-700">
                            {currentDownscalingResult.downscaledModel.temp}°C
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 line-through">
                            {currentDownscalingResult.coarseModel.temp}°
                          </span>
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] text-slate-600">AI Downscaled Rain:</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs font-bold text-sky-700">
                            {currentDownscalingResult.downscaledModel.rain} mm/h
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 line-through">
                            {currentDownscalingResult.coarseModel.rain} mm
                          </span>
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] text-slate-600">Terrain Elevation:</span>
                        <span className="text-[10px] font-mono text-slate-800 font-semibold">
                          {currentDownscalingResult.elevation}m (SRTM 30m)
                        </span>
                      </div>

                      {/* Agro Advisory mini badge */}
                      <div className="mt-1.5 rounded-lg bg-emerald-50 border border-emerald-200 p-1.5 text-[9px] text-slate-700">
                        <div className="font-bold text-emerald-800 flex items-center gap-1">
                          <Sprout className="size-3 text-emerald-600" />
                          <span>{currentDownscalingResult.agroAdvisory.title}</span>
                        </div>
                        <p className="text-[9px] text-slate-600 mt-0.5 line-clamp-2">
                          {currentDownscalingResult.agroAdvisory.action}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between gap-1.5">
                        <button
                          type="button"
                          onClick={handleRunDownscaler}
                          className="flex-1 rounded bg-emerald-600 hover:bg-emerald-700 py-1 text-center text-[10px] font-bold text-white transition-colors cursor-pointer shadow-sm"
                        >
                          Inspect Downscaling
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedBlock) {
                              handleSelectBlock(selectedBlock)
                            }
                          }}
                          title="Switch to Block Level view"
                          className="rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-900 px-2 py-1 text-[10px] font-bold transition-colors cursor-pointer border border-indigo-200"
                        >
                          🏢 Block View
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate({ to: '/forecast' })}
                          title="View localized 15-day forecast"
                          className="grid size-6 place-items-center rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-transform hover:scale-105 cursor-pointer shadow-sm border border-slate-200"
                        >
                          <ArrowUpRight className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Connecting Stalk */}
              <div
                className={`h-5 w-0.5 shadow-sm ${
                  activeSelectionType === 'block' ? 'bg-indigo-400/80' : 'bg-emerald-400/80'
                }`}
              />
              <div
                className={`size-2 rounded-full ring-4 ${
                  activeSelectionType === 'block'
                    ? 'bg-indigo-400 ring-indigo-400/30'
                    : 'bg-emerald-400 ring-emerald-400/30'
                }`}
              />
            </div>
          </div>
        )}

        {/* 6. FLOATING BOTTOM-LEFT CONTROLS */}
        <div className="absolute bottom-56 sm:bottom-48 left-4 z-[900] flex flex-wrap items-center gap-2 pointer-events-auto">
          {/* Close/Reset Custom Pin */}
          {customPoint && (
            <button
              type="button"
              onClick={() => {
                setCustomPoint(null)
                setIsPopupOpen(false)
              }}
              className="grid size-8 place-items-center rounded-full bg-slate-800 hover:bg-slate-700 text-white shadow-lg transition-transform hover:scale-105 cursor-pointer border border-slate-700"
              title="Reset location pin"
            >
              <X className="size-4" />
            </button>
          )}

          {/* Toggle Block Boundaries */}
          <button
            type="button"
            onClick={() => setShowBlockBoundaries(!showBlockBoundaries)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold shadow-md backdrop-blur-md transition-all cursor-pointer border ${
              showBlockBoundaries
                ? 'border-indigo-500 bg-indigo-600 text-white shadow-indigo-500/20'
                : 'border-slate-300 bg-white/95 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Building2 className="size-3.5" />
            <span>Block Boundaries</span>
          </button>

          {/* Toggle Panchayat Boundaries */}
          <button
            type="button"
            onClick={() => setShowPanchayatBoundaries(!showPanchayatBoundaries)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold shadow-md backdrop-blur-md transition-all cursor-pointer border ${
              showPanchayatBoundaries
                ? 'border-emerald-500 bg-emerald-600 text-white shadow-emerald-500/20'
                : 'border-slate-300 bg-white/95 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Sprout className="size-3.5" />
            <span>Panchayat Boundaries</span>
          </button>

          {/* Toggle Coarse 25km Grid Mesh */}
          <button
            type="button"
            onClick={() => setShowCoarseGrid(!showCoarseGrid)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold shadow-md backdrop-blur-md transition-all cursor-pointer border ${
              showCoarseGrid
                ? 'border-sky-500 bg-sky-600 text-white shadow-sky-500/20'
                : 'border-slate-300 bg-white/95 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Layers3 className="size-3.5" />
            <span>25km Coarse Grid</span>
          </button>

          {/* Current Scrubber Time Pill */}
          <div className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-black text-white shadow-md">
            {activeHourlyPoint.displayHour}
          </div>
        </div>

        {/* 6. ACTIVE LAYER COLOR LEGEND BAR */}
        <div className="absolute bottom-52 sm:bottom-44 right-4 z-[900] rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-2xl backdrop-blur-md text-[10px] hidden md:block">
          <div className="flex items-center justify-between gap-4 text-slate-500 mb-1.5">
            <span className="font-bold text-slate-800">{layerConfig.legendTitle}</span>
            <span className="font-mono text-emerald-700 font-bold">{layerConfig.unit}</span>
          </div>
          <div className="flex items-center gap-2">
            {layerConfig.legendSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <span
                  className="size-2.5 rounded-full border border-slate-300"
                  style={{ backgroundColor: step.color }}
                />
                <span className="text-[9px] text-slate-700 font-mono font-medium">
                  {step.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. BOTTOM FORECAST TIMELINE & METEOGRAM BAR */}
      <footer className="absolute bottom-0 inset-x-0 z-[1000] border-t border-slate-200 bg-white/95 backdrop-blur-xl pointer-events-auto transition-transform text-slate-800 shadow-xl">
        {/* Scrubber Day Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200/90 px-3 py-1 bg-slate-50 text-xs">
          {/* Play/Pause & Step Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="grid size-6 place-items-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-transform hover:scale-105 cursor-pointer shadow-sm"
              title={isPlaying ? 'Pause forecast animation' : 'Play 5-day forecast'}
            >
              {isPlaying ? <Pause className="size-3" /> : <Play className="size-3 ml-0.5" />}
            </button>
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
              <Clock className="size-3 text-emerald-600" />
              <span>Hours</span>
            </span>
          </div>

          {/* Days Grid Across Timeline */}
          <div className="flex flex-1 items-center justify-around px-4">
            {WINDY_DAYS.map((day) => (
              <div key={day.id} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                <span className={`size-1.5 rounded-full ${day.dotColor}`} />
                <span>{day.label}</span>
              </div>
            ))}
          </div>

          {/* Collapse/Expand Toggle */}
          <button
            type="button"
            onClick={() => setIsMeteogramExpanded(!isMeteogramExpanded)}
            className="flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-semibold text-slate-600 hover:text-slate-900 cursor-pointer hover:bg-slate-200"
          >
            <span>{isMeteogramExpanded ? 'Hide' : 'Show'}</span>
            {isMeteogramExpanded ? (
              <ChevronDown className="size-3.5" />
            ) : (
              <ChevronUp className="size-3.5" />
            )}
          </button>
        </div>

        {/* Expanded Meteogram Table */}
        {isMeteogramExpanded && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] items-stretch">
            {/* Scrollable Hourly Weather Table */}
            <div className="overflow-x-auto overflow-y-hidden px-2 py-1 scrollbar-thin scrollbar-thumb-slate-300">
              <div className="min-w-[950px] text-[10px]">
                {/* 1. Hours Row */}
                <div className="flex items-center">
                  <div className="w-24 shrink-0 text-slate-600 font-bold uppercase tracking-wider text-[9px]">
                    Hours
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    {activeTimelineData.map((h, i) => {
                      const isActive = i === activeHourIndex
                      return (
                        <button
                          type="button"
                          key={h.id}
                          onClick={() => setActiveHourIndex(i)}
                          className={`flex-1 text-center py-0.5 rounded cursor-pointer transition-colors ${
                            isActive
                              ? 'bg-emerald-600 text-white font-black'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                          }`}
                        >
                          {h.displayHour}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 2. Weather Condition Icons */}
                <div className="flex items-center py-0.5">
                  <div className="w-24 shrink-0 text-slate-500 text-[9px]">Sky</div>
                  <div className="flex flex-1 items-center justify-between text-center">
                    {activeTimelineData.map((h, i) => (
                      <div
                        key={h.id}
                        className={`flex-1 text-xs cursor-pointer ${
                          i === activeHourIndex ? 'scale-125' : ''
                        }`}
                        onClick={() => setActiveHourIndex(i)}
                      >
                        {h.icon}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. AI Downscaled 1km Temperature (°C) */}
                <div className="flex items-center py-0.5">
                  <div className="w-24 shrink-0 text-emerald-700 font-bold flex items-center gap-1">
                    <span>1km AI Temp</span>
                  </div>
                  <div className="flex flex-1 items-center justify-between text-center font-bold">
                    {activeTimelineData.map((h, i) => {
                      // Apply localized lapse rate adjustment for downscaled row
                      const downscaledT = Math.round(
                        h.temp + (currentDownscalingResult.elevationDelta > 100 ? -2.5 : -0.8)
                      )
                      return (
                        <div
                          key={h.id}
                          onClick={() => setActiveHourIndex(i)}
                          className={`flex-1 cursor-pointer ${
                            i === activeHourIndex
                              ? 'text-emerald-700 font-black text-[11px]'
                              : 'text-slate-800'
                          }`}
                        >
                          {downscaledT}°
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* 4. Coarse 25km NWP Temperature (Baseline) */}
                <div className="flex items-center py-0.5 text-slate-500">
                  <div className="w-24 shrink-0 text-[9px] text-slate-400">Coarse NWP</div>
                  <div className="flex flex-1 items-center justify-between text-center">
                    {activeTimelineData.map((h) => (
                      <div key={h.id} className="flex-1 font-mono text-[9px] text-slate-500">
                        {h.temp}°
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Downscaled Rain (mm) */}
                <div className="flex items-center py-0.5">
                  <div className="w-24 shrink-0 text-sky-700 font-semibold">
                    Rain mm
                  </div>
                  <div className="flex flex-1 items-center justify-between text-center font-bold text-sky-700">
                    {activeTimelineData.map((h) => (
                      <div key={h.id} className="flex-1">
                        {h.rain > 0 ? h.rain : ''}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Wind Speed (kt) */}
                <div className="flex items-center py-0.5">
                  <div className="w-24 shrink-0 text-slate-600 font-semibold">
                    Wind kt
                  </div>
                  <div className="flex flex-1 items-center justify-between text-center">
                    {activeTimelineData.map((h, i) => {
                      const bg =
                        h.wind >= 12
                          ? 'bg-emerald-600 text-white'
                          : h.wind >= 8
                            ? 'bg-teal-600/80 text-white'
                            : 'bg-cyan-100 text-cyan-900 font-medium'
                      return (
                        <div
                          key={h.id}
                          onClick={() => setActiveHourIndex(i)}
                          className={`flex-1 py-0.5 rounded-xs font-bold cursor-pointer ${bg}`}
                        >
                          {h.wind}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* 7. Wind Gusts (kt) */}
                <div className="flex items-center py-0.5">
                  <div className="w-24 shrink-0 text-amber-700 font-semibold">
                    Gusts kt
                  </div>
                  <div className="flex flex-1 items-center justify-between text-center">
                    {activeTimelineData.map((h, i) => (
                      <div
                        key={h.id}
                        onClick={() => setActiveHourIndex(i)}
                        className="flex-1 flex justify-center cursor-pointer"
                      >
                        <span className="rounded bg-orange-100 px-1 py-0.2 text-[9px] font-bold text-orange-800 border border-orange-200">
                          {h.gust}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 8. Wind Direction Arrows */}
                <div className="flex items-center py-0.5 text-slate-600">
                  <div className="w-24 shrink-0 text-[9px]">Wind dir.</div>
                  <div className="flex flex-1 items-center justify-between text-center">
                    {activeTimelineData.map((h) => (
                      <div
                        key={h.id}
                        className="flex-1 flex justify-center text-[10px]"
                        title={`${h.windDir} (${h.windDeg}°)`}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            transform: `rotate(${h.windDeg}deg)`,
                          }}
                        >
                          ↓
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 7. ABOUT LOCATION & DOWNSCALING TELEMETRY PANEL */}
            <div className="border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50/90 p-3 flex flex-col justify-between text-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold text-slate-800">Spatial Telemetry</h4>
                  <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[9px] font-bold text-emerald-800 border border-emerald-300">
                    1km AI Active
                  </span>
                </div>
                <div className="font-mono text-[11px] font-bold text-slate-900">
                  {currentCoords.dmsLat}, {currentCoords.dmsLng}
                </div>
                <div className="text-[10px] text-slate-600">
                  True SRTM Elevation: <b className="text-slate-900">{currentDownscalingResult.elevation}m</b>
                </div>
                <div className="text-[10px] text-slate-600">
                  Coarse Model Elevation: <b className="text-slate-700">{currentDownscalingResult.modelElevation}m</b> (Δ {currentDownscalingResult.elevationDelta > 0 ? `+${currentDownscalingResult.elevationDelta}` : currentDownscalingResult.elevationDelta}m)
                </div>
                <div className="text-[10px] text-slate-600">
                  Sunrise: <b className="text-slate-800">{selectedCity.sunrise}</b> · Sunset: <b className="text-slate-800">{selectedCity.sunset}</b>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-2.5 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={handleRunDownscaler}
                  className="flex items-center justify-center gap-1.5 rounded bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer shadow-sm"
                >
                  <BrainCircuit className="size-3.5" />
                  <span>AI Downscaling Panel</span>
                </button>
                <Link
                  to="/forecast"
                  className="flex items-center justify-between rounded bg-white hover:bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                >
                  <span>15 days full meteogram</span>
                  <ChevronRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </footer>

      {/* 8. INTERACTIVE AI DOWNSCALING INSPECTOR MODAL */}
      {isDownscalingInspectorOpen && (
        <div className="fixed inset-0 z-[2500] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-2xl border border-emerald-500/40 bg-slate-900/98 p-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                    VataVaran AI Downscaler
                  </span>
                  <span className="text-xs text-slate-400">
                    Resolution: 25 km → 1 km (25x Super-Resolution)
                  </span>
                </div>
                <h3 className="mt-1 text-lg font-black text-white">
                  Spatial Downscaling: {currentDownscalingResult.locationName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDownscalingInspectorOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Neural Pipeline Progress Simulator */}
            {isDownscalingRunning ? (
              <div className="my-8 flex flex-col items-center justify-center space-y-4">
                <div className="size-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                <div className="text-center">
                  <p className="text-sm font-bold text-emerald-400">
                    {downscalingPipelineStep === 1 && 'Ingesting Coarse GFS 25km Synoptic NWP Grid...'}
                    {downscalingPipelineStep === 2 && 'Extracting SRTM 30m Digital Elevation Model (DEM)...'}
                    {downscalingPipelineStep === 3 && 'Fusing Sentinel-2 NDVI & Topsoil Roughness Gradients...'}
                    {downscalingPipelineStep >= 4 && 'Executing Multi-Scale ConvNet Downscaler...'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Calibrating localized micro-climate parameters for {currentDownscalingResult.locationName}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-5 space-y-5">
                {/* 1. Comparison Table (Coarse vs Downscaled) */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-200">
                      Coarse NWP vs. VataVaran Downscaled (Delta Analysis)
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400">
                      Confidence: {currentDownscalingResult.confidenceScore}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    {/* Temperature Card */}
                    <div className="rounded-lg bg-slate-900 p-2.5 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Temperature</span>
                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="text-base font-black text-emerald-400">
                          {currentDownscalingResult.downscaledModel.temp}°C
                        </span>
                        <span className="text-xs font-mono text-slate-500 line-through">
                          {currentDownscalingResult.coarseModel.temp}°
                        </span>
                      </div>
                      <span className="text-[9px] text-emerald-400/90 mt-0.5 block">
                        {(currentDownscalingResult.downscaledModel.temp - currentDownscalingResult.coarseModel.temp).toFixed(1)}°C lapse correction
                      </span>
                    </div>

                    {/* Rain Card */}
                    <div className="rounded-lg bg-slate-900 p-2.5 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Precipitation Rate</span>
                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="text-base font-black text-sky-400">
                          {currentDownscalingResult.downscaledModel.rain} mm/h
                        </span>
                        <span className="text-xs font-mono text-slate-500 line-through">
                          {currentDownscalingResult.coarseModel.rain} mm
                        </span>
                      </div>
                      <span className="text-[9px] text-sky-400/90 mt-0.5 block">
                        Orographic uplift
                      </span>
                    </div>

                    {/* Wind & Gust Card */}
                    <div className="rounded-lg bg-slate-900 p-2.5 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Wind & Gusts</span>
                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="text-base font-black text-amber-400">
                          {currentDownscalingResult.downscaledModel.windSpeed} kt
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          (Gust {currentDownscalingResult.downscaledModel.windGust} kt)
                        </span>
                      </div>
                      <span className="text-[9px] text-amber-400/90 mt-0.5 block">
                        Valley channelized
                      </span>
                    </div>

                    {/* Elevation Card */}
                    <div className="rounded-lg bg-slate-900 p-2.5 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">SRTM Topography</span>
                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="text-base font-black text-white">
                          {currentDownscalingResult.elevation}m
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          (vs {currentDownscalingResult.modelElevation}m)
                        </span>
                      </div>
                      <span className="text-[9px] text-slate-400 mt-0.5 block">
                        Δ {currentDownscalingResult.elevationDelta > 0 ? `+${currentDownscalingResult.elevationDelta}` : currentDownscalingResult.elevationDelta}m terrain height
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Feature Contributions / Explainability */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                  <h4 className="text-xs font-bold text-slate-200 mb-2.5">
                    Feature Attribution & Physical Downscaling Drivers
                  </h4>
                  <div className="space-y-2">
                    {currentDownscalingResult.featureContributions.map((fc) => (
                      <div key={fc.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">{fc.name}</span>
                          <span className="font-mono font-bold text-emerald-400">
                            {fc.percentage}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                            style={{ width: `${fc.percentage}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-400">{fc.effect}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Localized Farm Advisory derived from Downscaling */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        currentDownscalingResult.agroAdvisory.urgency === 'urgent'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : currentDownscalingResult.agroAdvisory.urgency === 'alert'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {currentDownscalingResult.agroAdvisory.urgency.toUpperCase()} ADVISORY
                    </span>
                    <h5 className="text-xs font-bold text-white">
                      {currentDownscalingResult.agroAdvisory.title}
                    </h5>
                  </div>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {currentDownscalingResult.agroAdvisory.action}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400">
                    <span>Priority crops:</span>
                    {currentDownscalingResult.agroAdvisory.cropsAffected.map((crop) => (
                      <span
                        key={crop}
                        className="rounded bg-slate-800 px-1.5 py-0.2 text-slate-200"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      alert('Downscaled NetCDF / GeoJSON package exported successfully!')
                    }}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 cursor-pointer transition-colors"
                  >
                    <Download className="size-3.5" />
                    <span>Export GeoJSON</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDownscalingInspectorOpen(false)
                      navigate({ to: '/forecast' })
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-md cursor-pointer transition-colors"
                  >
                    <span>Open 15-Day Localized Meteogram</span>
                    <ArrowUpRight className="size-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. SLIDE-OUT MENU DRAWER */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[2000] flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="h-full w-full max-w-sm border-l border-slate-800 bg-slate-900 p-5 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="grid size-7 place-items-center rounded-lg bg-emerald-600 font-bold text-white text-xs">
                  VV
                </div>
                <span className="font-extrabold text-white">VataVaran Studio</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Language Switcher in Drawer */}
            <div className="mt-3 border-b border-slate-800 pb-3">
              <LanguageSwitcher variant="drawer" />
            </div>

            {/* Navigation to GramMausam AI Pages */}
            <div className="mt-4 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                {language === 'mr' ? 'नेव्हिगेशन (Navigation)' : 'Navigation'}
              </p>
              <Link
                to="/"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white"
              >
                <span>🏠 {language === 'mr' ? 'मुख्यपृष्ठ (Home)' : 'Home Overview'}</span>
                <ChevronRight className="size-4 text-slate-500" />
              </Link>
              <Link
                to="/crop-advisory"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white"
              >
                <span>🌾 {language === 'mr' ? 'पीक सल्लागार (Crop Advisory)' : 'Crop Advisory Wizard'}</span>
                <ChevronRight className="size-4 text-slate-500" />
              </Link>
              <Link
                to="/forecast"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white"
              >
                <span>📈 {language === 'mr' ? 'स्थानिक हवामान अंदाज' : '15-Day Localized Forecast'}</span>
                <ChevronRight className="size-4 text-slate-500" />
              </Link>
              <Link
                to="/ai-downscaling"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white"
              >
                <span>🧠 {language === 'mr' ? 'एआय डाउनस्केलिंग इंजिन' : 'AI Downscaling Engine'}</span>
                <ChevronRight className="size-4 text-slate-500" />
              </Link>
              <Link
                to="/historical"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white"
              >
                <span>🏛️ {language === 'mr' ? 'ऐतिहासिक हवामान विश्लेषण' : 'Historical Climate Analysis'}</span>
                <ChevronRight className="size-4 text-slate-500" />
              </Link>
              <Link
                to="/methodology"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white"
              >
                <span>🔬 {language === 'mr' ? 'शास्त्रीय कार्यपद्धती' : 'Scientific Methodology'}</span>
                <ChevronRight className="size-4 text-slate-500" />
              </Link>
              <Link
                to="/alerts"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white"
              >
                <span>⚠️ {language === 'mr' ? 'शेतीविषयक हवामान इशारे' : 'Agro-Climate Alerts'}</span>
                <ChevronRight className="size-4 text-slate-500" />
              </Link>
            </div>

            {/* Model Switcher */}
            <div className="mt-5 border-t border-slate-800 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Atmospheric Forecast Model
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setDownscalingMode('downscaled-1km')}
                  className={`rounded-lg border p-2 text-left font-bold transition-all ${
                    downscalingMode === 'downscaled-1km'
                      ? 'border-emerald-500/80 bg-emerald-500/10 text-emerald-300'
                      : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div>VataVaran 1km</div>
                  <div className="text-[10px] text-emerald-400">High-Res AI Downscaling</div>
                </button>
                <button
                  type="button"
                  onClick={() => setDownscalingMode('coarse-25km')}
                  className={`rounded-lg border p-2 text-left font-bold transition-all ${
                    downscalingMode === 'coarse-25km'
                      ? 'border-sky-500/80 bg-sky-500/10 text-sky-300'
                      : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div>GFS 25km</div>
                  <div className="text-[10px] text-slate-400">Coarse NWP Prior</div>
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-slate-700 bg-slate-800/60 p-2 text-left text-slate-300 hover:bg-slate-800"
                >
                  <div>ECMWF 9km</div>
                  <div className="text-[10px] text-slate-400">European HRES</div>
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-slate-700 bg-slate-800/60 p-2 text-left text-slate-300 hover:bg-slate-800"
                >
                  <div>IMD 12km</div>
                  <div className="text-[10px] text-slate-400">Regional NWP</div>
                </button>
              </div>
            </div>

            {/* Units Configuration */}
            <div className="mt-5 border-t border-slate-800 pt-4 text-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Meteorological Units
              </p>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Temperature:</span>
                  <span className="font-bold text-white">°C (Celsius)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Wind Speed:</span>
                  <span className="font-bold text-white">kt / km/h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Precipitation:</span>
                  <span className="font-bold text-white">mm (Millimeters)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Elevation Source:</span>
                  <span className="font-bold text-white">SRTM 30m DEM</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  handleRunDownscaler()
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 py-2.5 text-xs font-bold text-slate-950 shadow-lg"
              >
                <BrainCircuit className="size-4" />
                <span>Run Downscaler on Current View</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
