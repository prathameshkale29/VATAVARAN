export type CropId =
  | 'soybean'
  | 'cotton'
  | 'wheat'
  | 'rice'
  | 'tur'
  | 'vegetables'
  | 'other'

export type CropStageId =
  | 'sowing'
  | 'vegetative'
  | 'flowering'
  | 'pod_formation'
  | 'maturity'
  | 'harvesting'

export type AdvisoryCategory =
  | 'irrigation'
  | 'spraying'
  | 'crop_care'
  | 'sowing'
  | 'harvesting'
  | 'pest_disease'
  | 'weather_alert'

export type WeatherRiskLevel = 'low' | 'moderate' | 'high'
export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface CropInfo {
  id: CropId
  nameEn: string
  nameMr: string
  nameHi: string
  icon: string
  scientificName: string
  season: 'Kharif' | 'Rabi' | 'All Season'
  description: string
}

export interface CropStageInfo {
  id: CropStageId
  nameEn: string
  nameMr: string
  nameHi: string
  icon: string
  daysFromSowing: string
  description: string
}

export interface AdvisoryItem {
  category: AdvisoryCategory
  title: string
  icon: string
  action: string
  urgency: 'critical' | 'warning' | 'normal' | 'info'
}

export interface GeneratedCropAdvisory {
  cropId: CropId
  cropStageId: CropStageId
  panchayatId: string
  panchayatName: string
  blockName: string
  districtName: string
  generatedAt: string
  weatherSummary: {
    temperature: number
    rainProbability: number
    expectedRainfall: number
    humidity: number
    windSpeed: number
    condition: string
    riskLevel: WeatherRiskLevel
  }
  headline: string
  advisories: AdvisoryItem[]
  confidence: ConfidenceLevel
  explanationSteps: {
    step: number
    title: string
    detail: string
  }[]
  dataSources: string[]
}

export interface SavedFarmerPreference {
  panchayatId: string
  panchayatName: string
  blockName: string
  districtName: string
  cropId: CropId
  cropStageId: CropStageId
  savedAt: string
}
