export type WeatherVariable = 'rainfall' | 'maxTemp' | 'minTemp' | 'humidity' | 'wind'
export type MapWeatherLayer = 'rainfall' | 'temperature' | 'humidity'
export type RiskLevel = 'low' | 'moderate' | 'high'

export interface District {
  id: string
  name: string
  center: [number, number]
  polygon: [number, number][]
}

export interface Block {
  id: string
  districtId: string
  name: string
  center: [number, number]
  polygon: [number, number][]
}

export interface Panchayat {
  id: string
  name: string
  blockId: string
  districtId: string
  center: [number, number]
  polygon: [number, number][]
}

export type MapAdminLevel = 'panchayat' | 'block' | 'both'

export interface BlockWeatherProfile {
  id: string
  name: string
  districtName: string
  areaKm2: number
  panchayatCount: number
  avgTemp: number
  avgRainfall: number
  avgHumidity: number
  avgWind: number
  synopticModel: string
  terrainSummary: string
  advisory: string
}

export interface Forecast {
  date: string
  rainfall: number
  maxTemp: number
  minTemp: number
  humidity: number
  wind: number
}

export interface AlertItem {
  id: string
  type: string
  panchayat: string
  expected: string
  period: string
  severity: 'Advisory' | 'Watch'
  status: string
}

export type DownscalingMode = 'downscaled-1km' | 'coarse-25km' | 'compare'

export type WindyLayer =
  | 'aiDownscaledRain'
  | 'aiDownscaledTemp'
  | 'soilMoisture'
  | 'wind'
  | 'rain'
  | 'temperature'
  | 'radar'
  | 'satellite'
  | 'thunderstorms'
  | 'clouds'
  | 'waves'
  | 'rainAccum'
  | 'airQuality'
  | 'hurricanes'

export type AtmosphericLayer = WindyLayer

export interface DownscalingInferenceResult {
  locationName: string
  coordinates: [number, number]
  elevation: number
  modelElevation: number
  elevationDelta: number
  panchayatId?: string | undefined
  blockName?: string | undefined
  districtName?: string | undefined
  confidenceScore: number
  resolutionRatio: string
  coarseModel: {
    source: string
    temp: number
    rain: number
    humidity: number
    windSpeed: number
    windGust: number
  }
  downscaledModel: {
    source: string
    temp: number
    rain: number
    humidity: number
    windSpeed: number
    windGust: number
    orographicEffect: string
    thermalInversion: boolean
  }
  featureContributions: {
    name: string
    percentage: number
    effect: string
  }[]
  agroAdvisory: {
    urgency: 'routine' | 'alert' | 'urgent'
    title: string
    action: string
    cropsAffected: string[]
  }
}

export interface WindyCity {
  id: string
  name: string
  country?: string
  lat: number
  lng: number
  temp: number
  feelsLike: number
  condition: string
  conditionIcon: string
  windSpeed: number // kt
  windGust: number // kt
  windDir: string
  windDeg: number
  waveHeight: number // meters
  wavePeriod: number // seconds
  waveDir: string
  elevation: number // meters
  modelElevation: number // meters
  dmsLat: string
  dmsLng: string
  sunrise: string
  sunset: string
  dusk: string
  timezone: string
}

export interface WindyHourlyPoint {
  id: string
  time?: string
  day: string
  dayFull: string
  hour: number
  displayHour: string
  temp: number
  feelsLike: number
  condition: string
  icon: string
  rain: number
  wind: number
  gust: number
  windDeg: number
  windDir: string
}


