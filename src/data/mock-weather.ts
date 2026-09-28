import type {
  AlertItem,
  Block,
  BlockWeatherProfile,
  District,
  Forecast,
  MapWeatherLayer,
  Panchayat,
  RiskLevel,
  WeatherVariable,
} from '@/types/weather'

export const districts: District[] = [
  {
    id: 'nashik',
    name: 'Nashik',
    center: [19.99, 73.79],
    polygon: [
      [20.55, 73.40],
      [20.60, 74.55],
      [19.60, 74.65],
      [19.50, 73.50],
    ],
  },
  {
    id: 'pune',
    name: 'Pune',
    center: [18.52, 73.85],
    polygon: [
      [19.15, 73.25],
      [19.20, 74.30],
      [18.05, 74.35],
      [18.00, 73.35],
    ],
  },
  {
    id: 'wardha',
    name: 'Wardha',
    center: [20.7453, 78.5974],
    polygon: [
      [21.25, 78.20],
      [21.25, 79.15],
      [20.30, 79.15],
      [20.30, 78.20],
    ],
  },
  {
    id: 'nagpur',
    name: 'Nagpur',
    center: [21.1458, 79.0882],
    polygon: [
      [21.75, 78.50],
      [21.75, 79.60],
      [20.60, 79.60],
      [20.60, 78.50],
    ],
  },
]

export const blocks: Block[] = [
  // ==================== NASHIK DISTRICT BLOCKS ====================
  {
    id: 'sinnar',
    districtId: 'nashik',
    name: 'Sinnar',
    center: [19.85, 74.00],
    polygon: [
      [19.98, 73.85],
      [19.98, 74.22],
      [19.68, 74.22],
      [19.68, 73.85],
    ],
  },
  {
    id: 'niphad',
    districtId: 'nashik',
    name: 'Niphad',
    center: [20.13, 74.00],
    polygon: [
      [20.28, 73.82],
      [20.28, 74.18],
      [20.00, 74.18],
      [20.00, 73.82],
    ],
  },
  {
    id: 'dindori',
    districtId: 'nashik',
    name: 'Dindori',
    center: [20.20, 73.83],
    polygon: [
      [20.40, 73.68],
      [20.40, 74.02],
      [20.12, 74.02],
      [20.12, 73.68],
    ],
  },

  // ==================== PUNE DISTRICT BLOCKS ====================
  {
    id: 'mulshi',
    districtId: 'pune',
    name: 'Mulshi',
    center: [18.52, 73.65],
    polygon: [
      [18.66, 73.50],
      [18.66, 73.80],
      [18.40, 73.80],
      [18.40, 73.50],
    ],
  },
  {
    id: 'haveli',
    districtId: 'pune',
    name: 'Haveli',
    center: [18.52, 74.02],
    polygon: [
      [18.66, 73.88],
      [18.66, 74.18],
      [18.38, 74.18],
      [18.38, 73.88],
    ],
  },
  {
    id: 'baramati',
    districtId: 'pune',
    name: 'Baramati',
    center: [18.15, 74.58],
    polygon: [
      [18.32, 74.38],
      [18.32, 74.75],
      [18.02, 74.75],
      [18.02, 74.38],
    ],
  },

  // ==================== WARDHA DISTRICT BLOCKS ====================
  {
    id: 'wardha_block',
    districtId: 'wardha',
    name: 'Wardha',
    center: [20.74, 78.60],
    polygon: [
      [20.84, 78.52],
      [20.84, 78.68],
      [20.66, 78.68],
      [20.66, 78.52],
    ],
  },
  {
    id: 'deoli',
    districtId: 'wardha',
    name: 'Deoli',
    center: [20.65, 78.48],
    polygon: [
      [20.74, 78.38],
      [20.74, 78.58],
      [20.56, 78.58],
      [20.56, 78.38],
    ],
  },
  {
    id: 'arvi',
    districtId: 'wardha',
    name: 'Arvi',
    center: [20.98, 78.23],
    polygon: [
      [21.08, 78.12],
      [21.08, 78.34],
      [20.88, 78.34],
      [20.88, 78.12],
    ],
  },
  {
    id: 'hinganghat',
    districtId: 'wardha',
    name: 'Hinganghat',
    center: [20.55, 78.84],
    polygon: [
      [20.66, 78.74],
      [20.66, 78.96],
      [20.44, 78.96],
      [20.44, 78.74],
    ],
  },
  {
    id: 'seloo',
    districtId: 'wardha',
    name: 'Seloo',
    center: [20.83, 78.70],
    polygon: [
      [20.92, 78.60],
      [20.92, 78.80],
      [20.74, 78.80],
      [20.74, 78.60],
    ],
  },
  {
    id: 'samudrapur',
    districtId: 'wardha',
    name: 'Samudrapur',
    center: [20.62, 79.01],
    polygon: [
      [20.72, 78.90],
      [20.72, 79.16],
      [20.50, 79.16],
      [20.50, 78.90],
    ],
  },
  {
    id: 'karanja_ghadge',
    districtId: 'wardha',
    name: 'Karanja (Ghadge)',
    center: [21.16, 78.36],
    polygon: [
      [21.26, 78.26],
      [21.26, 78.46],
      [21.06, 78.46],
      [21.06, 78.26],
    ],
  },
  {
    id: 'ashti',
    districtId: 'wardha',
    name: 'Ashti',
    center: [21.20, 78.18],
    polygon: [
      [21.30, 78.08],
      [21.30, 78.28],
      [21.10, 78.28],
      [21.10, 78.08],
    ],
  },

  // ==================== NAGPUR DISTRICT BLOCKS ====================
  {
    id: 'nagpur_rural',
    districtId: 'nagpur',
    name: 'Nagpur Rural',
    center: [21.10, 79.05],
    polygon: [
      [21.22, 78.94],
      [21.22, 79.18],
      [21.00, 79.18],
      [21.00, 78.94],
    ],
  },
  {
    id: 'hingna',
    districtId: 'nagpur',
    name: 'Hingna',
    center: [21.06, 78.96],
    polygon: [
      [21.18, 78.84],
      [21.18, 79.06],
      [20.92, 79.06],
      [20.92, 78.84],
    ],
  },
  {
    id: 'kamptee',
    districtId: 'nagpur',
    name: 'Kamptee',
    center: [21.22, 79.20],
    polygon: [
      [21.32, 79.10],
      [21.32, 79.32],
      [21.12, 79.32],
      [21.12, 79.10],
    ],
  },
  {
    id: 'katol',
    districtId: 'nagpur',
    name: 'Katol',
    center: [21.27, 78.59],
    polygon: [
      [21.40, 78.48],
      [21.40, 78.70],
      [21.14, 78.70],
      [21.14, 78.48],
    ],
  },
  {
    id: 'kalmeshwar',
    districtId: 'nagpur',
    name: 'Kalmeshwar',
    center: [21.23, 78.92],
    polygon: [
      [21.34, 78.80],
      [21.34, 79.02],
      [21.12, 79.02],
      [21.12, 78.80],
    ],
  },
  {
    id: 'saoner',
    districtId: 'nagpur',
    name: 'Saoner',
    center: [21.39, 78.92],
    polygon: [
      [21.52, 78.80],
      [21.52, 79.08],
      [21.28, 79.08],
      [21.28, 78.80],
    ],
  },
  {
    id: 'umred',
    districtId: 'nagpur',
    name: 'Umred',
    center: [20.85, 79.33],
    polygon: [
      [21.00, 79.20],
      [21.00, 79.48],
      [20.70, 79.48],
      [20.70, 79.20],
    ],
  },
  {
    id: 'ramtek',
    districtId: 'nagpur',
    name: 'Ramtek',
    center: [21.40, 79.33],
    polygon: [
      [21.60, 79.20],
      [21.60, 79.50],
      [21.26, 79.50],
      [21.26, 79.20],
    ],
  },
  {
    id: 'narkhed',
    districtId: 'nagpur',
    name: 'Narkhed',
    center: [21.37, 78.53],
    polygon: [
      [21.50, 78.40],
      [21.50, 78.66],
      [21.24, 78.66],
      [21.24, 78.40],
    ],
  },
]

export const blockWeatherProfiles: Record<string, BlockWeatherProfile> = {
  // Nashik Blocks
  sinnar: {
    id: 'sinnar',
    name: 'Sinnar Block',
    districtName: 'Nashik',
    areaKm2: 1342,
    panchayatCount: 104,
    avgTemp: 31.6,
    avgRainfall: 15.6,
    avgHumidity: 72,
    avgWind: 11.8,
    synopticModel: 'IMD GFS-Regional 12km',
    terrainSummary: 'Semi-arid Deccan Plateau with Western Ghats rain-shadow orographic gradients',
    advisory: 'Pockets of heavy showers across Ghats boundary; maintain open farm furrows.',
  },
  niphad: {
    id: 'niphad',
    name: 'Niphad Block',
    districtName: 'Nashik',
    areaKm2: 1053,
    panchayatCount: 132,
    avgTemp: 32.2,
    avgRainfall: 11.2,
    avgHumidity: 68,
    avgWind: 9.4,
    synopticModel: 'ECMWF HRES 9km Synoptic',
    terrainSummary: 'Godavari alluvial river basin; prime grape, onion, and sugarcane horticulture belt',
    advisory: 'High morning humidity favor fungal downy mildew in vineyards; prophylactic copper sprays advised.',
  },
  dindori: {
    id: 'dindori',
    name: 'Dindori Block',
    districtName: 'Nashik',
    areaKm2: 1280,
    panchayatCount: 118,
    avgTemp: 29.4,
    avgRainfall: 24.8,
    avgHumidity: 79,
    avgWind: 13.2,
    synopticModel: 'IMD Regional HRDPS',
    terrainSummary: 'Hilly Ghats transition zone, heavy orographic rain, tomato and agro-forestry crops',
    advisory: 'Runoff velocity elevated on slopes; mulch open beds to prevent soil erosion.',
  },

  // Pune Blocks
  mulshi: {
    id: 'mulshi',
    name: 'Mulshi Block',
    districtName: 'Pune',
    areaKm2: 1029,
    panchayatCount: 96,
    avgTemp: 28.1,
    avgRainfall: 38.5,
    avgHumidity: 84,
    avgWind: 15.6,
    synopticModel: 'IMD Western Ghats High-Resolution',
    terrainSummary: 'Sahyadri crest, dense catchment area for dams, high rain intensity paddy landscape',
    advisory: 'Very heavy cloudburst probability along ridge lines; regulate paddy sluices.',
  },
  haveli: {
    id: 'haveli',
    name: 'Haveli Block',
    districtName: 'Pune',
    areaKm2: 1180,
    panchayatCount: 112,
    avgTemp: 32.8,
    avgRainfall: 9.4,
    avgHumidity: 65,
    avgWind: 10.2,
    synopticModel: 'GFS Global Synoptic',
    terrainSummary: 'Mutha-Mula river basin transition, mixed vegetable cultivation and peri-urban farms',
    advisory: 'Moderate wind speeds; safe for pesticide foliar spray before 11:00 AM.',
  },
  baramati: {
    id: 'baramati',
    name: 'Baramati Block',
    districtName: 'Pune',
    areaKm2: 1382,
    panchayatCount: 116,
    avgTemp: 34.1,
    avgRainfall: 5.2,
    avgHumidity: 58,
    avgWind: 12.0,
    synopticModel: 'ECMWF Synoptic 9km',
    terrainSummary: 'Nira canal irrigated plains, black cotton soil, intensive sugarcane and dairy',
    advisory: 'High evapotranspiration; schedule drip fertigation during morning hours.',
  },

  // Wardha Blocks
  wardha_block: {
    id: 'wardha_block',
    name: 'Wardha Block',
    districtName: 'Wardha',
    areaKm2: 1210,
    panchayatCount: 118,
    avgTemp: 33.4,
    avgRainfall: 18.2,
    avgHumidity: 69,
    avgWind: 9.8,
    synopticModel: 'NCMRWF Unified Model 4km',
    terrainSummary: 'Central Vidarbha black cotton plain; historic cotton, soybean and pigeonpea belt',
    advisory: 'Optimal soil moisture for pod development in soybean; scout for spodoptera larvae.',
  },
  deoli: {
    id: 'deoli',
    name: 'Deoli Block',
    districtName: 'Wardha',
    areaKm2: 954,
    panchayatCount: 92,
    avgTemp: 33.8,
    avgRainfall: 16.5,
    avgHumidity: 67,
    avgWind: 10.4,
    synopticModel: 'IMD GFS-Regional 12km',
    terrainSummary: 'Wardha-Yavatmal boundary undulating plains; rainfed cotton and sorghum farming',
    advisory: 'Clear afternoon skies favorable for foliar micronutrient spray in cotton.',
  },
  arvi: {
    id: 'arvi',
    name: 'Arvi Block',
    districtName: 'Wardha',
    areaKm2: 1152,
    panchayatCount: 108,
    avgTemp: 32.6,
    avgRainfall: 21.4,
    avgHumidity: 73,
    avgWind: 11.2,
    synopticModel: 'ECMWF HRES 9km Synoptic',
    terrainSummary: 'Northern Wardha forested ridges and orange orchards along Amravati border',
    advisory: 'Moderate precipitation expected; ensure orange orchard tree basin drainage.',
  },
  hinganghat: {
    id: 'hinganghat',
    name: 'Hinganghat Block',
    districtName: 'Wardha',
    areaKm2: 1290,
    panchayatCount: 124,
    avgTemp: 34.2,
    avgRainfall: 14.8,
    avgHumidity: 64,
    avgWind: 10.8,
    synopticModel: 'IMD Multi-Model Ensemble',
    terrainSummary: 'Vena river basin fertile deep regur soil; commercial cotton ginning and grain crops',
    advisory: 'Light showers anticipated; plan harvesting of early maturing soybean varieties.',
  },
  seloo: {
    id: 'seloo',
    name: 'Seloo Block',
    districtName: 'Wardha',
    areaKm2: 890,
    panchayatCount: 86,
    avgTemp: 32.9,
    avgRainfall: 19.8,
    avgHumidity: 71,
    avgWind: 10.1,
    synopticModel: 'NCMRWF Unified Model 4km',
    terrainSummary: 'Bor River reservoir catchment, mixed agro-forestry and pulse cultivation',
    advisory: 'Reservoir catchment runoff active; verify village percolation tank embankments.',
  },
  samudrapur: {
    id: 'samudrapur',
    name: 'Samudrapur Block',
    districtName: 'Wardha',
    areaKm2: 1045,
    panchayatCount: 98,
    avgTemp: 34.0,
    avgRainfall: 17.0,
    avgHumidity: 66,
    avgWind: 10.5,
    synopticModel: 'IMD GFS-Regional 12km',
    terrainSummary: 'Southern Wardha red-black transition soil, chili, turmeric, and oilseed fields',
    advisory: 'Elevated solar radiation; provide shade netting for young nursery beds.',
  },
  karanja_ghadge: {
    id: 'karanja_ghadge',
    name: 'Karanja Block',
    districtName: 'Wardha',
    areaKm2: 880,
    panchayatCount: 84,
    avgTemp: 32.1,
    avgRainfall: 22.0,
    avgHumidity: 74,
    avgWind: 12.0,
    synopticModel: 'ECMWF HRES 9km Synoptic',
    terrainSummary: 'Elevated plateau terrain, citrus groves and watershed development valleys',
    advisory: 'Adequate soil profile moisture; delay supplemental borewell irrigation.',
  },
  ashti: {
    id: 'ashti',
    name: 'Ashti Block',
    districtName: 'Wardha',
    areaKm2: 760,
    panchayatCount: 76,
    avgTemp: 32.4,
    avgRainfall: 20.6,
    avgHumidity: 72,
    avgWind: 11.5,
    synopticModel: 'NCMRWF Unified Model 4km',
    terrainSummary: 'North-western boundary rolling hills with mixed pulses and cotton cultivation',
    advisory: 'Maintain vegetative cover on slopes to curb monsoon soil erosion.',
  },

  // Nagpur Blocks
  nagpur_rural: {
    id: 'nagpur_rural',
    name: 'Nagpur Rural Block',
    districtName: 'Nagpur',
    areaKm2: 1085,
    panchayatCount: 114,
    avgTemp: 33.1,
    avgRainfall: 17.5,
    avgHumidity: 68,
    avgWind: 9.6,
    synopticModel: 'NCMRWF Unified Model 4km',
    terrainSummary: 'Peri-urban agro-ecosystem, vegetable clusters, Nag river drainage basin',
    advisory: 'Good weather for vegetable harvesting and transport to city agricultural APMC markets.',
  },
  hingna: {
    id: 'hingna',
    name: 'Hingna Block',
    districtName: 'Nagpur',
    areaKm2: 980,
    panchayatCount: 96,
    avgTemp: 33.5,
    avgRainfall: 18.0,
    avgHumidity: 67,
    avgWind: 10.2,
    synopticModel: 'IMD GFS-Regional 12km',
    terrainSummary: 'Vena reservoir catchment, basaltic ridges, mixed soybean and horticulture',
    advisory: 'Check bunds near Vena backwaters for localized waterlogging.',
  },
  kamptee: {
    id: 'kamptee',
    name: 'Kamptee Block',
    districtName: 'Nagpur',
    areaKm2: 670,
    panchayatCount: 78,
    avgTemp: 33.6,
    avgRainfall: 16.8,
    avgHumidity: 69,
    avgWind: 9.2,
    synopticModel: 'ECMWF HRES 9km Synoptic',
    terrainSummary: 'Kanhan river alluvial floodplains; high-value horticulture, wheat, and floriculture',
    advisory: 'Favorable alluvial soil moisture; plan post-monsoon vegetable planting.',
  },
  katol: {
    id: 'katol',
    name: 'Katol Block',
    districtName: 'Nagpur',
    areaKm2: 1120,
    panchayatCount: 122,
    avgTemp: 32.5,
    avgRainfall: 20.4,
    avgHumidity: 71,
    avgWind: 11.0,
    synopticModel: 'NCMRWF High-Res 4km',
    terrainSummary: 'Nagpur Mandarin orange heartland; micro-climatic orographic hills and valleys',
    advisory: 'Critical fruit development stage for Nagpur Orange; monitor for citrus psylla & phytophthora.',
  },
  kalmeshwar: {
    id: 'kalmeshwar',
    name: 'Kalmeshwar Block',
    districtName: 'Nagpur',
    areaKm2: 890,
    panchayatCount: 94,
    avgTemp: 33.0,
    avgRainfall: 18.6,
    avgHumidity: 68,
    avgWind: 10.0,
    synopticModel: 'IMD GFS-Regional 12km',
    terrainSummary: 'Mid-elevation citrus, soybean and cotton tract; good groundwater aquifer recharge',
    advisory: 'Mild breezes; suitable for bio-fungicide foliar applications.',
  },
  saoner: {
    id: 'saoner',
    name: 'Saoner Block',
    districtName: 'Nagpur',
    areaKm2: 1020,
    panchayatCount: 106,
    avgTemp: 32.8,
    avgRainfall: 22.8,
    avgHumidity: 73,
    avgWind: 10.8,
    synopticModel: 'ECMWF HRES 9km Synoptic',
    terrainSummary: 'Kolar river basin with Chhindwara border hills, high citrus and vegetable density',
    advisory: 'Moderate showers expected in upstream Kolar basin; secure low-lying riverbank pumps.',
  },
  umred: {
    id: 'umred',
    name: 'Umred Block',
    districtName: 'Nagpur',
    areaKm2: 1350,
    panchayatCount: 130,
    avgTemp: 34.0,
    avgRainfall: 19.2,
    avgHumidity: 66,
    avgWind: 10.4,
    synopticModel: 'IMD Regional HRDPS',
    terrainSummary: 'Karhandla wildlife sanctuary buffer; famous Umred red chilli and pulse belt',
    advisory: 'Favorable warm temperatures for Umred Chilli fruit setting; avoid flood irrigation.',
  },
  ramtek: {
    id: 'ramtek',
    name: 'Ramtek Block',
    districtName: 'Nagpur',
    areaKm2: 1240,
    panchayatCount: 118,
    avgTemp: 31.8,
    avgRainfall: 26.5,
    avgHumidity: 76,
    avgWind: 11.6,
    synopticModel: 'NCMRWF Unified Model 4km',
    terrainSummary: 'Pench river and historic Ramtek hills; dense forestry, paddy and mango plantations',
    advisory: 'Higher orographic rainfall around Pench foothills; drain standing water from paddy fields.',
  },
  narkhed: {
    id: 'narkhed',
    name: 'Narkhed Block',
    districtName: 'Nagpur',
    areaKm2: 980,
    panchayatCount: 98,
    avgTemp: 32.7,
    avgRainfall: 19.5,
    avgHumidity: 70,
    avgWind: 11.2,
    synopticModel: 'ECMWF HRES 9km Synoptic',
    terrainSummary: 'Far-western citrus belt bordering Madhya Pradesh; well-drained basaltic red soil',
    advisory: 'Maintain clean orchard basins to avoid collar rot in mandarin trees.',
  },
}

export const panchayats: Panchayat[] = [
  // ==================== NASHIK DISTRICT ====================
  // Sinnar Block
  {
    id: 'dubera',
    name: 'Dubera',
    blockId: 'sinnar',
    districtId: 'nashik',
    center: [19.82, 74.03],
    polygon: [
      [19.78, 73.96],
      [19.87, 73.97],
      [19.87, 74.08],
      [19.78, 74.08],
    ],
  },
  {
    id: 'panchale',
    name: 'Panchale',
    blockId: 'sinnar',
    districtId: 'nashik',
    center: [19.75, 74.14],
    polygon: [
      [19.70, 74.08],
      [19.80, 74.08],
      [19.80, 74.20],
      [19.70, 74.20],
    ],
  },
  {
    id: 'konambe',
    name: 'Konambe',
    blockId: 'sinnar',
    districtId: 'nashik',
    center: [19.90, 73.93],
    polygon: [
      [19.85, 73.87],
      [19.96, 73.87],
      [19.96, 73.98],
      [19.85, 73.98],
    ],
  },
  {
    id: 'musalgaon',
    name: 'Musalgaon',
    blockId: 'sinnar',
    districtId: 'nashik',
    center: [19.87, 74.06],
    polygon: [
      [19.83, 74.03],
      [19.91, 74.03],
      [19.91, 74.12],
      [19.83, 74.12],
    ],
  },
  {
    id: 'wavi',
    name: 'Wavi',
    blockId: 'sinnar',
    districtId: 'nashik',
    center: [19.79, 74.24],
    polygon: [
      [19.74, 74.18],
      [19.84, 74.18],
      [19.84, 74.30],
      [19.74, 74.30],
    ],
  },

  // Niphad Block
  {
    id: 'ozar',
    name: 'Ozar',
    blockId: 'niphad',
    districtId: 'nashik',
    center: [20.09, 73.93],
    polygon: [
      [20.03, 73.86],
      [20.14, 73.86],
      [20.14, 73.98],
      [20.03, 73.98],
    ],
  },
  {
    id: 'pimpalgaon',
    name: 'Pimpalgaon',
    blockId: 'niphad',
    districtId: 'nashik',
    center: [20.17, 74.04],
    polygon: [
      [20.11, 73.98],
      [20.24, 73.98],
      [20.24, 74.12],
      [20.11, 74.12],
    ],
  },
  {
    id: 'sukene',
    name: 'Sukene',
    blockId: 'niphad',
    districtId: 'nashik',
    center: [20.10, 74.06],
    polygon: [
      [20.05, 74.01],
      [20.15, 74.01],
      [20.15, 74.12],
      [20.05, 74.12],
    ],
  },

  // Dindori Block
  {
    id: 'vani',
    name: 'Vani',
    blockId: 'dindori',
    districtId: 'nashik',
    center: [20.32, 73.90],
    polygon: [
      [20.26, 73.84],
      [20.38, 73.84],
      [20.38, 73.96],
      [20.26, 73.96],
    ],
  },
  {
    id: 'dindori_rural',
    name: 'Dindori Rural',
    blockId: 'dindori',
    districtId: 'nashik',
    center: [20.20, 73.83],
    polygon: [
      [20.15, 73.77],
      [20.25, 73.77],
      [20.25, 73.89],
      [20.15, 73.89],
    ],
  },

  // ==================== PUNE DISTRICT ====================
  // Mulshi Block
  {
    id: 'pirangut',
    name: 'Pirangut',
    blockId: 'mulshi',
    districtId: 'pune',
    center: [18.51, 73.68],
    polygon: [
      [18.45, 73.62],
      [18.56, 73.62],
      [18.56, 73.74],
      [18.45, 73.74],
    ],
  },
  {
    id: 'paud',
    name: 'Paud',
    blockId: 'mulshi',
    districtId: 'pune',
    center: [18.53, 73.57],
    polygon: [
      [18.47, 73.51],
      [18.58, 73.51],
      [18.58, 73.62],
      [18.47, 73.62],
    ],
  },
  {
    id: 'lavasa',
    name: 'Lavasa',
    blockId: 'mulshi',
    districtId: 'pune',
    center: [18.41, 73.51],
    polygon: [
      [18.35, 73.45],
      [18.46, 73.45],
      [18.46, 73.57],
      [18.35, 73.57],
    ],
  },

  // Haveli Block
  {
    id: 'wagholi',
    name: 'Wagholi',
    blockId: 'haveli',
    districtId: 'pune',
    center: [18.58, 73.98],
    polygon: [
      [18.53, 73.92],
      [18.64, 73.92],
      [18.64, 74.04],
      [18.53, 74.04],
    ],
  },
  {
    id: 'loni_kalbhor',
    name: 'Loni Kalbhor',
    blockId: 'haveli',
    districtId: 'pune',
    center: [18.49, 74.02],
    polygon: [
      [18.44, 73.96],
      [18.54, 73.96],
      [18.54, 74.08],
      [18.44, 74.08],
    ],
  },

  // Baramati Block
  {
    id: 'malegaon_bk',
    name: 'Malegaon Bk',
    blockId: 'baramati',
    districtId: 'pune',
    center: [18.15, 74.52],
    polygon: [
      [18.10, 74.46],
      [18.20, 74.46],
      [18.20, 74.58],
      [18.10, 74.58],
    ],
  },
  {
    id: 'supa',
    name: 'Supa',
    blockId: 'baramati',
    districtId: 'pune',
    center: [18.30, 74.45],
    polygon: [
      [18.24, 74.39],
      [18.35, 74.39],
      [18.35, 74.51],
      [18.24, 74.51],
    ],
  },

  // ==================== WARDHA DISTRICT ====================
  // Wardha Block
  {
    id: 'sevagram',
    name: 'Sevagram',
    blockId: 'wardha_block',
    districtId: 'wardha',
    center: [20.71, 78.65],
    polygon: [
      [20.67, 78.61],
      [20.75, 78.61],
      [20.75, 78.69],
      [20.67, 78.69],
    ],
  },
  {
    id: 'pawanar',
    name: 'Pawanar',
    blockId: 'wardha_block',
    districtId: 'wardha',
    center: [20.78, 78.63],
    polygon: [
      [20.74, 78.59],
      [20.82, 78.59],
      [20.82, 78.67],
      [20.74, 78.67],
    ],
  },
  {
    id: 'nalwadi',
    name: 'Nalwadi',
    blockId: 'wardha_block',
    districtId: 'wardha',
    center: [20.75, 78.56],
    polygon: [
      [20.71, 78.52],
      [20.79, 78.52],
      [20.79, 78.60],
      [20.71, 78.60],
    ],
  },
  {
    id: 'sindi_meghe',
    name: 'Sindi Meghe',
    blockId: 'wardha_block',
    districtId: 'wardha',
    center: [20.76, 78.61],
    polygon: [
      [20.72, 78.57],
      [20.80, 78.57],
      [20.80, 78.65],
      [20.72, 78.65],
    ],
  },
  {
    id: 'seloo_kate',
    name: 'Seloo Kate',
    blockId: 'wardha_block',
    districtId: 'wardha',
    center: [20.70, 78.58],
    polygon: [
      [20.66, 78.54],
      [20.74, 78.54],
      [20.74, 78.62],
      [20.66, 78.62],
    ],
  },

  // Deoli Block
  {
    id: 'babgaon',
    name: 'Babgaon',
    blockId: 'deoli',
    districtId: 'wardha',
    center: [20.62, 78.43],
    polygon: [
      [20.58, 78.39],
      [20.66, 78.39],
      [20.66, 78.47],
      [20.58, 78.47],
    ],
  },
  {
    id: 'vijaygopal',
    name: 'Vijaygopal',
    blockId: 'deoli',
    districtId: 'wardha',
    center: [20.68, 78.45],
    polygon: [
      [20.64, 78.41],
      [20.72, 78.41],
      [20.72, 78.49],
      [20.64, 78.49],
    ],
  },
  {
    id: 'andori',
    name: 'Andori',
    blockId: 'deoli',
    districtId: 'wardha',
    center: [20.66, 78.52],
    polygon: [
      [20.62, 78.48],
      [20.70, 78.48],
      [20.70, 78.56],
      [20.62, 78.56],
    ],
  },
  {
    id: 'gaul',
    name: 'Gaul',
    blockId: 'deoli',
    districtId: 'wardha',
    center: [20.61, 78.50],
    polygon: [
      [20.57, 78.46],
      [20.65, 78.46],
      [20.65, 78.54],
      [20.57, 78.54],
    ],
  },

  // Arvi Block
  {
    id: 'rohana',
    name: 'Rohana',
    blockId: 'arvi',
    districtId: 'wardha',
    center: [20.91, 78.28],
    polygon: [
      [20.87, 78.24],
      [20.95, 78.24],
      [20.95, 78.32],
      [20.87, 78.32],
    ],
  },
  {
    id: 'kharangana_gode',
    name: 'Kharangana Gode',
    blockId: 'arvi',
    districtId: 'wardha',
    center: [20.95, 78.18],
    polygon: [
      [20.91, 78.14],
      [20.99, 78.14],
      [20.99, 78.22],
      [20.91, 78.22],
    ],
  },
  {
    id: 'pardi',
    name: 'Pardi',
    blockId: 'arvi',
    districtId: 'wardha',
    center: [21.03, 78.22],
    polygon: [
      [20.99, 78.18],
      [21.07, 78.18],
      [21.07, 78.26],
      [20.99, 78.26],
    ],
  },
  {
    id: 'rani_amravati',
    name: 'Rani Amravati',
    blockId: 'arvi',
    districtId: 'wardha',
    center: [21.02, 78.30],
    polygon: [
      [20.98, 78.26],
      [21.06, 78.26],
      [21.06, 78.34],
      [20.98, 78.34],
    ],
  },

  // Hinganghat Block
  {
    id: 'wadner',
    name: 'Wadner',
    blockId: 'hinganghat',
    districtId: 'wardha',
    center: [20.59, 78.78],
    polygon: [
      [20.55, 78.74],
      [20.63, 78.74],
      [20.63, 78.82],
      [20.55, 78.82],
    ],
  },
  {
    id: 'pohana',
    name: 'Pohana',
    blockId: 'hinganghat',
    districtId: 'wardha',
    center: [20.50, 78.86],
    polygon: [
      [20.46, 78.82],
      [20.54, 78.82],
      [20.54, 78.90],
      [20.46, 78.90],
    ],
  },
  {
    id: 'ajansara',
    name: 'Ajansara',
    blockId: 'hinganghat',
    districtId: 'wardha',
    center: [20.61, 78.90],
    polygon: [
      [20.57, 78.86],
      [20.65, 78.86],
      [20.65, 78.94],
      [20.57, 78.94],
    ],
  },
  {
    id: 'dhamangaon',
    name: 'Dhamangaon',
    blockId: 'hinganghat',
    districtId: 'wardha',
    center: [20.48, 78.79],
    polygon: [
      [20.44, 78.75],
      [20.52, 78.75],
      [20.52, 78.83],
      [20.44, 78.83],
    ],
  },

  // Seloo Block
  {
    id: 'borgaon_meghe',
    name: 'Borgaon Meghe',
    blockId: 'seloo',
    districtId: 'wardha',
    center: [20.87, 78.68],
    polygon: [
      [20.83, 78.64],
      [20.91, 78.64],
      [20.91, 78.72],
      [20.83, 78.72],
    ],
  },
  {
    id: 'rehaki',
    name: 'Rehaki',
    blockId: 'seloo',
    districtId: 'wardha',
    center: [20.80, 78.74],
    polygon: [
      [20.76, 78.70],
      [20.84, 78.70],
      [20.84, 78.78],
      [20.76, 78.78],
    ],
  },
  {
    id: 'sukli',
    name: 'Sukli',
    blockId: 'seloo',
    districtId: 'wardha',
    center: [20.86, 78.75],
    polygon: [
      [20.82, 78.71],
      [20.90, 78.71],
      [20.90, 78.79],
      [20.82, 78.79],
    ],
  },

  // Samudrapur Block
  {
    id: 'girad',
    name: 'Girad',
    blockId: 'samudrapur',
    districtId: 'wardha',
    center: [20.65, 79.12],
    polygon: [
      [20.61, 79.08],
      [20.69, 79.08],
      [20.69, 79.16],
      [20.61, 79.16],
    ],
  },
  {
    id: 'jam',
    name: 'Jam',
    blockId: 'samudrapur',
    districtId: 'wardha',
    center: [20.68, 78.95],
    polygon: [
      [20.64, 78.91],
      [20.72, 78.91],
      [20.72, 78.99],
      [20.64, 78.99],
    ],
  },
  {
    id: 'aloda',
    name: 'Aloda',
    blockId: 'samudrapur',
    districtId: 'wardha',
    center: [20.58, 79.03],
    polygon: [
      [20.54, 78.99],
      [20.62, 78.99],
      [20.62, 79.07],
      [20.54, 79.07],
    ],
  },

  // Karanja Ghadge Block
  {
    id: 'thanegaon',
    name: 'Thanegaon',
    blockId: 'karanja_ghadge',
    districtId: 'wardha',
    center: [21.18, 78.30],
    polygon: [
      [21.14, 78.26],
      [21.22, 78.26],
      [21.22, 78.34],
      [21.14, 78.34],
    ],
  },
  {
    id: 'narangwadi',
    name: 'Narangwadi',
    blockId: 'karanja_ghadge',
    districtId: 'wardha',
    center: [21.12, 78.41],
    polygon: [
      [21.08, 78.37],
      [21.16, 78.37],
      [21.16, 78.45],
      [21.08, 78.45],
    ],
  },
  {
    id: 'sarwadi',
    name: 'Sarwadi',
    blockId: 'karanja_ghadge',
    districtId: 'wardha',
    center: [21.20, 78.38],
    polygon: [
      [21.16, 78.34],
      [21.24, 78.34],
      [21.24, 78.42],
      [21.16, 78.42],
    ],
  },

  // Ashti Block
  {
    id: 'sahur',
    name: 'Sahur',
    blockId: 'ashti',
    districtId: 'wardha',
    center: [21.24, 78.22],
    polygon: [
      [21.20, 78.18],
      [21.28, 78.18],
      [21.28, 78.26],
      [21.20, 78.26],
    ],
  },
  {
    id: 'talegaon',
    name: 'Talegaon',
    blockId: 'ashti',
    districtId: 'wardha',
    center: [21.17, 78.14],
    polygon: [
      [21.13, 78.10],
      [21.21, 78.10],
      [21.21, 78.18],
      [21.13, 78.18],
    ],
  },
  {
    id: 'khadki',
    name: 'Khadki',
    blockId: 'ashti',
    districtId: 'wardha',
    center: [21.22, 78.12],
    polygon: [
      [21.18, 78.08],
      [21.26, 78.08],
      [21.26, 78.16],
      [21.18, 78.16],
    ],
  },

  // ==================== NAGPUR DISTRICT ====================
  // Nagpur Rural Block
  {
    id: 'wadi',
    name: 'Wadi',
    blockId: 'nagpur_rural',
    districtId: 'nagpur',
    center: [21.15, 79.00],
    polygon: [
      [21.11, 78.96],
      [21.19, 78.96],
      [21.19, 79.04],
      [21.11, 79.04],
    ],
  },
  {
    id: 'besa',
    name: 'Besa',
    blockId: 'nagpur_rural',
    districtId: 'nagpur',
    center: [21.08, 79.09],
    polygon: [
      [21.04, 79.05],
      [21.12, 79.05],
      [21.12, 79.13],
      [21.04, 79.13],
    ],
  },
  {
    id: 'pipla',
    name: 'Pipla',
    blockId: 'nagpur_rural',
    districtId: 'nagpur',
    center: [21.07, 79.11],
    polygon: [
      [21.03, 79.07],
      [21.11, 79.07],
      [21.11, 79.15],
      [21.03, 79.15],
    ],
  },
  {
    id: 'hudkeshwar',
    name: 'Hudkeshwar',
    blockId: 'nagpur_rural',
    districtId: 'nagpur',
    center: [21.09, 79.13],
    polygon: [
      [21.05, 79.09],
      [21.13, 79.09],
      [21.13, 79.17],
      [21.05, 79.17],
    ],
  },
  {
    id: 'wanadongri',
    name: 'Wanadongri',
    blockId: 'nagpur_rural',
    districtId: 'nagpur',
    center: [21.10, 78.98],
    polygon: [
      [21.06, 78.94],
      [21.14, 78.94],
      [21.14, 79.02],
      [21.06, 79.02],
    ],
  },
  {
    id: 'dighori',
    name: 'Dighori',
    blockId: 'nagpur_rural',
    districtId: 'nagpur',
    center: [21.11, 79.15],
    polygon: [
      [21.07, 79.11],
      [21.15, 79.11],
      [21.15, 79.19],
      [21.07, 79.19],
    ],
  },

  // Hingna Block
  {
    id: 'raipur',
    name: 'Raipur',
    blockId: 'hingna',
    districtId: 'nagpur',
    center: [21.04, 78.92],
    polygon: [
      [21.00, 78.88],
      [21.08, 78.88],
      [21.08, 78.96],
      [21.00, 78.96],
    ],
  },
  {
    id: 'sukali_hingna',
    name: 'Sukali',
    blockId: 'hingna',
    districtId: 'nagpur',
    center: [21.01, 78.98],
    polygon: [
      [20.97, 78.94],
      [21.05, 78.94],
      [21.05, 79.02],
      [20.97, 79.02],
    ],
  },
  {
    id: 'takalghat',
    name: 'Takalghat',
    blockId: 'hingna',
    districtId: 'nagpur',
    center: [20.98, 78.94],
    polygon: [
      [20.94, 78.90],
      [21.02, 78.90],
      [21.02, 78.98],
      [20.94, 78.98],
    ],
  },
  {
    id: 'adegaon',
    name: 'Adegaon',
    blockId: 'hingna',
    districtId: 'nagpur',
    center: [21.08, 78.90],
    polygon: [
      [21.04, 78.86],
      [21.12, 78.86],
      [21.12, 78.94],
      [21.04, 78.94],
    ],
  },

  // Kamptee Block
  {
    id: 'kanhan',
    name: 'Kanhan',
    blockId: 'kamptee',
    districtId: 'nagpur',
    center: [21.23, 79.24],
    polygon: [
      [21.19, 79.20],
      [21.27, 79.20],
      [21.27, 79.28],
      [21.19, 79.28],
    ],
  },
  {
    id: 'yerkheda',
    name: 'Yerkheda',
    blockId: 'kamptee',
    districtId: 'nagpur',
    center: [21.20, 79.18],
    polygon: [
      [21.16, 79.14],
      [21.24, 79.14],
      [21.24, 79.22],
      [21.16, 79.22],
    ],
  },
  {
    id: 'gorewada',
    name: 'Gorewada',
    blockId: 'kamptee',
    districtId: 'nagpur',
    center: [21.21, 79.13],
    polygon: [
      [21.17, 79.09],
      [21.25, 79.09],
      [21.25, 79.17],
      [21.17, 79.17],
    ],
  },
  {
    id: 'bhilgaon',
    name: 'Bhilgaon',
    blockId: 'kamptee',
    districtId: 'nagpur',
    center: [21.23, 79.15],
    polygon: [
      [21.19, 79.11],
      [21.27, 79.11],
      [21.27, 79.19],
      [21.19, 79.19],
    ],
  },

  // Katol Block
  {
    id: 'paradsinga',
    name: 'Paradsinga',
    blockId: 'katol',
    districtId: 'nagpur',
    center: [21.32, 78.63],
    polygon: [
      [21.28, 78.59],
      [21.36, 78.59],
      [21.36, 78.67],
      [21.28, 78.67],
    ],
  },
  {
    id: 'kondhali',
    name: 'Kondhali',
    blockId: 'katol',
    districtId: 'nagpur',
    center: [21.17, 78.64],
    polygon: [
      [21.13, 78.60],
      [21.21, 78.60],
      [21.21, 78.68],
      [21.13, 78.68],
    ],
  },
  {
    id: 'metpanjra',
    name: 'Metpanjra',
    blockId: 'katol',
    districtId: 'nagpur',
    center: [21.29, 78.53],
    polygon: [
      [21.25, 78.49],
      [21.33, 78.49],
      [21.33, 78.57],
      [21.25, 78.57],
    ],
  },
  {
    id: 'ridhora',
    name: 'Ridhora',
    blockId: 'katol',
    districtId: 'nagpur',
    center: [21.24, 78.56],
    polygon: [
      [21.20, 78.52],
      [21.28, 78.52],
      [21.28, 78.60],
      [21.20, 78.60],
    ],
  },

  // Kalmeshwar Block
  {
    id: 'dhapewada',
    name: 'Dhapewada',
    blockId: 'kalmeshwar',
    districtId: 'nagpur',
    center: [21.28, 78.94],
    polygon: [
      [21.24, 78.90],
      [21.32, 78.90],
      [21.32, 78.98],
      [21.24, 78.98],
    ],
  },
  {
    id: 'mohpa',
    name: 'Mohpa',
    blockId: 'kalmeshwar',
    districtId: 'nagpur',
    center: [21.32, 78.88],
    polygon: [
      [21.28, 78.84],
      [21.36, 78.84],
      [21.36, 78.92],
      [21.28, 78.92],
    ],
  },
  {
    id: 'brahmani',
    name: 'Brahmani',
    blockId: 'kalmeshwar',
    districtId: 'nagpur',
    center: [21.20, 78.89],
    polygon: [
      [21.16, 78.85],
      [21.24, 78.85],
      [21.24, 78.93],
      [21.16, 78.93],
    ],
  },
  {
    id: 'ghorad',
    name: 'Ghorad',
    blockId: 'kalmeshwar',
    districtId: 'nagpur',
    center: [21.25, 78.85],
    polygon: [
      [21.21, 78.81],
      [21.29, 78.81],
      [21.29, 78.88],
      [21.21, 78.88],
    ],
  },

  // Saoner Block
  {
    id: 'kelod',
    name: 'Kelod',
    blockId: 'saoner',
    districtId: 'nagpur',
    center: [21.46, 78.88],
    polygon: [
      [21.42, 78.84],
      [21.50, 78.84],
      [21.50, 78.92],
      [21.42, 78.92],
    ],
  },
  {
    id: 'khapa',
    name: 'Khapa',
    blockId: 'saoner',
    districtId: 'nagpur',
    center: [21.42, 79.02],
    polygon: [
      [21.38, 78.98],
      [21.46, 78.98],
      [21.46, 79.06],
      [21.38, 79.06],
    ],
  },
  {
    id: 'bichwa',
    name: 'Bichwa',
    blockId: 'saoner',
    districtId: 'nagpur',
    center: [21.36, 78.96],
    polygon: [
      [21.32, 78.92],
      [21.40, 78.92],
      [21.40, 79.00],
      [21.32, 79.00],
    ],
  },

  // Umred Block
  {
    id: 'makardhokada',
    name: 'Makardhokada',
    blockId: 'umred',
    districtId: 'nagpur',
    center: [20.88, 79.25],
    polygon: [
      [20.84, 79.21],
      [20.92, 79.21],
      [20.92, 79.29],
      [20.84, 79.29],
    ],
  },
  {
    id: 'sirsi',
    name: 'Sirsi',
    blockId: 'umred',
    districtId: 'nagpur',
    center: [20.82, 79.37],
    polygon: [
      [20.78, 79.33],
      [20.86, 79.33],
      [20.86, 79.41],
      [20.78, 79.41],
    ],
  },
  {
    id: 'belgaon',
    name: 'Belgaon',
    blockId: 'umred',
    districtId: 'nagpur',
    center: [20.89, 79.35],
    polygon: [
      [20.85, 79.31],
      [20.93, 79.31],
      [20.93, 79.39],
      [20.85, 79.39],
    ],
  },

  // Ramtek Block
  {
    id: 'mansar',
    name: 'Mansar',
    blockId: 'ramtek',
    districtId: 'nagpur',
    center: [21.39, 79.28],
    polygon: [
      [21.35, 79.24],
      [21.43, 79.24],
      [21.43, 79.32],
      [21.35, 79.32],
    ],
  },
  {
    id: 'nagardhan',
    name: 'Nagardhan',
    blockId: 'ramtek',
    districtId: 'nagpur',
    center: [21.35, 79.31],
    polygon: [
      [21.31, 79.27],
      [21.39, 79.27],
      [21.39, 79.35],
      [21.31, 79.35],
    ],
  },
  {
    id: 'deolapar',
    name: 'Deolapar',
    blockId: 'ramtek',
    districtId: 'nagpur',
    center: [21.55, 79.38],
    polygon: [
      [21.51, 79.34],
      [21.59, 79.34],
      [21.59, 79.42],
      [21.51, 79.42],
    ],
  },
  {
    id: 'musewadi',
    name: 'Musewadi',
    blockId: 'ramtek',
    districtId: 'nagpur',
    center: [21.43, 79.36],
    polygon: [
      [21.39, 79.32],
      [21.47, 79.32],
      [21.47, 79.40],
      [21.39, 79.40],
    ],
  },

  // Narkhed Block
  {
    id: 'mowad',
    name: 'Mowad',
    blockId: 'narkhed',
    districtId: 'nagpur',
    center: [21.42, 78.47],
    polygon: [
      [21.38, 78.43],
      [21.46, 78.43],
      [21.46, 78.51],
      [21.38, 78.51],
    ],
  },
  {
    id: 'sawargaon',
    name: 'Sawargaon',
    blockId: 'narkhed',
    districtId: 'nagpur',
    center: [21.35, 78.58],
    polygon: [
      [21.31, 78.54],
      [21.39, 78.54],
      [21.39, 78.62],
      [21.31, 78.62],
    ],
  },
  {
    id: 'jalalkheda',
    name: 'Jalalkheda',
    blockId: 'narkhed',
    districtId: 'nagpur',
    center: [21.30, 78.43],
    polygon: [
      [21.26, 78.39],
      [21.34, 78.39],
      [21.34, 78.47],
      [21.26, 78.47],
    ],
  },
]

export interface FullPanchayatForecast {
  id: string
  name: string
  blockName: string
  districtName: string
  date: string
  rainfall: {
    value: number
    unit: string
    risk: RiskLevel
    probability: number
    intensityDesc: string
  }
  temperature: {
    current: number
    min: number
    max: number
    feelsLike: number
    unit: string
    risk: RiskLevel
    condition: string
  }
  humidity: {
    value: number
    dewPoint: number
    unit: string
    risk: RiskLevel
    condition: string
  }
  wind: {
    speed: number
    gusts: number
    direction: string
    unit: string
    condition: string
  }
  advisory: {
    title: string
    action: string
    urgency: 'routine' | 'alert' | 'urgent'
  }
  dailyForecast: Array<{
    day: string
    temp: number
    rainfall: number
    condition: string
  }>
}

export const panchayatWeatherProfiles: Record<string, FullPanchayatForecast> = {
  // Existing Sinnar Profiles
  dubera: {
    id: 'dubera',
    name: 'Dubera',
    blockName: 'Sinnar',
    districtName: 'Nashik',
    date: '22 Sep 2026',
    rainfall: {
      value: 16,
      unit: 'mm',
      risk: 'moderate',
      probability: 74,
      intensityDesc: 'Moderate Showers',
    },
    temperature: {
      current: 31.0,
      min: 21.0,
      max: 32.5,
      feelsLike: 32.8,
      unit: '°C',
      risk: 'moderate',
      condition: 'Partly Cloudy',
    },
    humidity: {
      value: 74,
      dewPoint: 20.8,
      unit: '%',
      risk: 'moderate',
      condition: 'Optimal Moisture',
    },
    wind: {
      speed: 10.0,
      gusts: 16.0,
      direction: 'WSW (245°)',
      unit: 'km/h',
      condition: 'Gentle Breeze',
    },
    advisory: {
      title: 'Topsoil Recharge Active',
      action: 'Safe for post-shower inter-cultivation; check field drainage bunds.',
      urgency: 'alert',
    },
    dailyForecast: [
      { day: 'Today', temp: 31.0, rainfall: 16, condition: 'Showers' },
      { day: 'Wed', temp: 30.5, rainfall: 18, condition: 'Rain' },
      { day: 'Thu', temp: 32.0, rainfall: 7, condition: 'Partly Cloudy' },
      { day: 'Fri', temp: 29.5, rainfall: 22, condition: 'Heavy Rain' },
      { day: 'Sat', temp: 31.0, rainfall: 10, condition: 'Scattered' },
    ],
  },
  panchale: {
    id: 'panchale',
    name: 'Panchale',
    blockName: 'Sinnar',
    districtName: 'Nashik',
    date: '22 Sep 2026',
    rainfall: {
      value: 23,
      unit: 'mm',
      risk: 'high',
      probability: 88,
      intensityDesc: 'Heavy Rainfall Warning',
    },
    temperature: {
      current: 29.8,
      min: 20.4,
      max: 31.0,
      feelsLike: 31.4,
      unit: '°C',
      risk: 'low',
      condition: 'Overcast & Heavy Showers',
    },
    humidity: {
      value: 82,
      dewPoint: 22.4,
      unit: '%',
      risk: 'high',
      condition: 'High Moisture / Fungus Risk',
    },
    wind: {
      speed: 14.5,
      gusts: 22.0,
      direction: 'SW (230°)',
      unit: 'km/h',
      condition: 'Moderate Breeze',
    },
    advisory: {
      title: 'High Runoff Warning',
      action: 'Open furrows and clear field drainage; hold all pesticide sprays.',
      urgency: 'urgent',
    },
    dailyForecast: [
      { day: 'Today', temp: 29.8, rainfall: 23, condition: 'Heavy Rain' },
      { day: 'Wed', temp: 29.0, rainfall: 25, condition: 'Heavy Rain' },
      { day: 'Thu', temp: 30.5, rainfall: 12, condition: 'Showers' },
      { day: 'Fri', temp: 31.0, rainfall: 8, condition: 'Scattered' },
      { day: 'Sat', temp: 32.0, rainfall: 4, condition: 'Partly Cloudy' },
    ],
  },
  konambe: {
    id: 'konambe',
    name: 'Konambe',
    blockName: 'Sinnar',
    districtName: 'Nashik',
    date: '22 Sep 2026',
    rainfall: {
      value: 12,
      unit: 'mm',
      risk: 'low',
      probability: 58,
      intensityDesc: 'Light Intermittent Rain',
    },
    temperature: {
      current: 31.8,
      min: 21.2,
      max: 33.0,
      feelsLike: 33.2,
      unit: '°C',
      risk: 'moderate',
      condition: 'Scattered Clouds',
    },
    humidity: {
      value: 68,
      dewPoint: 19.5,
      unit: '%',
      risk: 'low',
      condition: 'Favorable Microclimate',
    },
    wind: {
      speed: 8.5,
      gusts: 13.0,
      direction: 'W (270°)',
      unit: 'km/h',
      condition: 'Light Breeze',
    },
    advisory: {
      title: 'Optimal Spray Window',
      action: 'Good conditions for prophylactic nutrient sprays before 11 AM.',
      urgency: 'routine',
    },
    dailyForecast: [
      { day: 'Today', temp: 31.8, rainfall: 12, condition: 'Scattered' },
      { day: 'Wed', temp: 31.2, rainfall: 14, condition: 'Showers' },
      { day: 'Thu', temp: 32.5, rainfall: 5, condition: 'Partly Cloudy' },
      { day: 'Fri', temp: 30.8, rainfall: 15, condition: 'Rain' },
      { day: 'Sat', temp: 31.5, rainfall: 8, condition: 'Passing Rain' },
    ],
  },

  // Key Wardha Profiles
  sevagram: {
    id: 'sevagram',
    name: 'Sevagram',
    blockName: 'Wardha',
    districtName: 'Wardha',
    date: '22 Sep 2026',
    rainfall: {
      value: 19,
      unit: 'mm',
      risk: 'moderate',
      probability: 78,
      intensityDesc: 'Moderate Convective Showers',
    },
    temperature: {
      current: 33.2,
      min: 23.5,
      max: 34.6,
      feelsLike: 36.8,
      unit: '°C',
      risk: 'moderate',
      condition: 'Humid & Overcast',
    },
    humidity: {
      value: 72,
      dewPoint: 22.0,
      unit: '%',
      risk: 'moderate',
      condition: 'Warm Humid',
    },
    wind: {
      speed: 9.8,
      gusts: 16.2,
      direction: 'SW (225°)',
      unit: 'km/h',
      condition: 'Gentle Breeze',
    },
    advisory: {
      title: 'Cotton & Soybean Advisory',
      action: 'Drain standing water from cotton black soil furrows; monitor boll development.',
      urgency: 'alert',
    },
    dailyForecast: [
      { day: 'Today', temp: 33.2, rainfall: 19, condition: 'Showers' },
      { day: 'Wed', temp: 32.8, rainfall: 22, condition: 'Rain' },
      { day: 'Thu', temp: 33.5, rainfall: 10, condition: 'Partly Cloudy' },
      { day: 'Fri', temp: 34.0, rainfall: 6, condition: 'Sunny' },
      { day: 'Sat', temp: 33.6, rainfall: 14, condition: 'Scattered' },
    ],
  },
  pawanar: {
    id: 'pawanar',
    name: 'Pawanar',
    blockName: 'Wardha',
    districtName: 'Wardha',
    date: '22 Sep 2026',
    rainfall: {
      value: 15,
      unit: 'mm',
      risk: 'moderate',
      probability: 70,
      intensityDesc: 'Passing Rain',
    },
    temperature: {
      current: 33.5,
      min: 23.8,
      max: 35.0,
      feelsLike: 37.2,
      unit: '°C',
      risk: 'moderate',
      condition: 'Scattered Clouds',
    },
    humidity: {
      value: 70,
      dewPoint: 21.6,
      unit: '%',
      risk: 'moderate',
      condition: 'Optimal Growth Moisture',
    },
    wind: {
      speed: 10.2,
      gusts: 17.0,
      direction: 'WSW (240°)',
      unit: 'km/h',
      condition: 'Gentle Breeze',
    },
    advisory: {
      title: 'Dham River Catchment Flow',
      action: 'Safe for field fertilization after morning showers pass.',
      urgency: 'routine',
    },
    dailyForecast: [
      { day: 'Today', temp: 33.5, rainfall: 15, condition: 'Scattered' },
      { day: 'Wed', temp: 33.0, rainfall: 18, condition: 'Showers' },
      { day: 'Thu', temp: 34.2, rainfall: 8, condition: 'Partly Cloudy' },
      { day: 'Fri', temp: 34.8, rainfall: 4, condition: 'Sunny' },
      { day: 'Sat', temp: 33.4, rainfall: 12, condition: 'Passing Rain' },
    ],
  },
  wadner: {
    id: 'wadner',
    name: 'Wadner',
    blockName: 'Hinganghat',
    districtName: 'Wardha',
    date: '22 Sep 2026',
    rainfall: {
      value: 14,
      unit: 'mm',
      risk: 'low',
      probability: 65,
      intensityDesc: 'Light Showers',
    },
    temperature: {
      current: 34.2,
      min: 24.2,
      max: 35.5,
      feelsLike: 38.0,
      unit: '°C',
      risk: 'moderate',
      condition: 'Partly Sunny',
    },
    humidity: {
      value: 65,
      dewPoint: 20.8,
      unit: '%',
      risk: 'low',
      condition: 'Comfortable Moisture',
    },
    wind: {
      speed: 11.0,
      gusts: 18.0,
      direction: 'SSW (205°)',
      unit: 'km/h',
      condition: 'Gentle Breeze',
    },
    advisory: {
      title: 'Hinganghat Cotton Belt Outlook',
      action: 'Warm conditions favor cotton boll formation; inspect for pink bollworm traps.',
      urgency: 'routine',
    },
    dailyForecast: [
      { day: 'Today', temp: 34.2, rainfall: 14, condition: 'Passing Rain' },
      { day: 'Wed', temp: 33.8, rainfall: 16, condition: 'Showers' },
      { day: 'Thu', temp: 35.0, rainfall: 6, condition: 'Sunny' },
      { day: 'Fri', temp: 35.4, rainfall: 2, condition: 'Clear' },
      { day: 'Sat', temp: 34.5, rainfall: 9, condition: 'Partly Cloudy' },
    ],
  },

  // Key Nagpur Profiles
  wadi: {
    id: 'wadi',
    name: 'Wadi',
    blockName: 'Nagpur Rural',
    districtName: 'Nagpur',
    date: '22 Sep 2026',
    rainfall: {
      value: 18,
      unit: 'mm',
      risk: 'moderate',
      probability: 76,
      intensityDesc: 'Localized Showers',
    },
    temperature: {
      current: 33.0,
      min: 23.2,
      max: 34.4,
      feelsLike: 36.2,
      unit: '°C',
      risk: 'moderate',
      condition: 'Partly Cloudy',
    },
    humidity: {
      value: 69,
      dewPoint: 21.0,
      unit: '%',
      risk: 'moderate',
      condition: 'Moderate Humidity',
    },
    wind: {
      speed: 9.6,
      gusts: 15.5,
      direction: 'W (270°)',
      unit: 'km/h',
      condition: 'Gentle Breeze',
    },
    advisory: {
      title: 'Peri-urban Agro Advisory',
      action: 'Optimal conditions for cauliflower, brinjal and coriander harvesting for Nagpur mandi.',
      urgency: 'routine',
    },
    dailyForecast: [
      { day: 'Today', temp: 33.0, rainfall: 18, condition: 'Showers' },
      { day: 'Wed', temp: 32.5, rainfall: 20, condition: 'Rain' },
      { day: 'Thu', temp: 33.8, rainfall: 9, condition: 'Partly Cloudy' },
      { day: 'Fri', temp: 34.4, rainfall: 5, condition: 'Sunny' },
      { day: 'Sat', temp: 33.2, rainfall: 15, condition: 'Showers' },
    ],
  },
  besa: {
    id: 'besa',
    name: 'Besa',
    blockName: 'Nagpur Rural',
    districtName: 'Nagpur',
    date: '22 Sep 2026',
    rainfall: {
      value: 16,
      unit: 'mm',
      risk: 'moderate',
      probability: 72,
      intensityDesc: 'Moderate Rain',
    },
    temperature: {
      current: 33.4,
      min: 23.6,
      max: 34.8,
      feelsLike: 36.6,
      unit: '°C',
      risk: 'moderate',
      condition: 'Scattered Clouds',
    },
    humidity: {
      value: 67,
      dewPoint: 20.6,
      unit: '%',
      risk: 'low',
      condition: 'Comfortable',
    },
    wind: {
      speed: 10.0,
      gusts: 16.0,
      direction: 'WSW (250°)',
      unit: 'km/h',
      condition: 'Gentle Breeze',
    },
    advisory: {
      title: 'Soybean Moisture Check',
      action: 'Maintain drainage furrows; field access good for mechanical weed management.',
      urgency: 'routine',
    },
    dailyForecast: [
      { day: 'Today', temp: 33.4, rainfall: 16, condition: 'Scattered' },
      { day: 'Wed', temp: 32.8, rainfall: 18, condition: 'Showers' },
      { day: 'Thu', temp: 34.0, rainfall: 7, condition: 'Partly Cloudy' },
      { day: 'Fri', temp: 34.6, rainfall: 3, condition: 'Sunny' },
      { day: 'Sat', temp: 33.5, rainfall: 11, condition: 'Passing Rain' },
    ],
  },
  paradsinga: {
    id: 'paradsinga',
    name: 'Paradsinga',
    blockName: 'Katol',
    districtName: 'Nagpur',
    date: '22 Sep 2026',
    rainfall: {
      value: 22,
      unit: 'mm',
      risk: 'high',
      probability: 84,
      intensityDesc: 'Heavy Orographic Showers',
    },
    temperature: {
      current: 31.8,
      min: 22.4,
      max: 33.0,
      feelsLike: 34.5,
      unit: '°C',
      risk: 'moderate',
      condition: 'Overcast with Showers',
    },
    humidity: {
      value: 75,
      dewPoint: 22.2,
      unit: '%',
      risk: 'moderate',
      condition: 'Humid Citrus Valley',
    },
    wind: {
      speed: 11.8,
      gusts: 19.4,
      direction: 'SW (220°)',
      unit: 'km/h',
      condition: 'Moderate Breeze',
    },
    advisory: {
      title: 'Katol Orange Belt Alert',
      action: 'Heavier downpour in Katol foothills; clear drainage in citrus orchards to avoid root rot.',
      urgency: 'alert',
    },
    dailyForecast: [
      { day: 'Today', temp: 31.8, rainfall: 22, condition: 'Heavy Rain' },
      { day: 'Wed', temp: 31.2, rainfall: 24, condition: 'Showers' },
      { day: 'Thu', temp: 32.5, rainfall: 12, condition: 'Passing Showers' },
      { day: 'Fri', temp: 33.2, rainfall: 6, condition: 'Partly Cloudy' },
      { day: 'Sat', temp: 32.0, rainfall: 16, condition: 'Rain' },
    ],
  },
  mansar: {
    id: 'mansar',
    name: 'Mansar',
    blockName: 'Ramtek',
    districtName: 'Nagpur',
    date: '22 Sep 2026',
    rainfall: {
      value: 28,
      unit: 'mm',
      risk: 'high',
      probability: 90,
      intensityDesc: 'Heavy Foothill Showers',
    },
    temperature: {
      current: 31.2,
      min: 21.8,
      max: 32.4,
      feelsLike: 33.8,
      unit: '°C',
      risk: 'low',
      condition: 'Overcast & Rain',
    },
    humidity: {
      value: 79,
      dewPoint: 23.0,
      unit: '%',
      risk: 'high',
      condition: 'High Moisture Reservoir Buffer',
    },
    wind: {
      speed: 12.4,
      gusts: 21.0,
      direction: 'SW (235°)',
      unit: 'km/h',
      condition: 'Breezy',
    },
    advisory: {
      title: 'Pench Foothills Torrent Alert',
      action: 'High rainfall around Pench National Park buffer; keep cattle away from swollen nalas.',
      urgency: 'urgent',
    },
    dailyForecast: [
      { day: 'Today', temp: 31.2, rainfall: 28, condition: 'Heavy Rain' },
      { day: 'Wed', temp: 30.6, rainfall: 30, condition: 'Heavy Rain' },
      { day: 'Thu', temp: 32.0, rainfall: 14, condition: 'Showers' },
      { day: 'Fri', temp: 32.8, rainfall: 8, condition: 'Partly Cloudy' },
      { day: 'Sat', temp: 31.5, rainfall: 20, condition: 'Rain' },
    ],
  },
}

// Risk Evaluation Engine
export function getRiskLevel(panchayatId: string, layer: MapWeatherLayer): RiskLevel {
  const data = getPanchayatFullForecast(panchayatId)
  if (!data) return 'low'

  if (layer === 'rainfall') {
    return data.rainfall.risk
  } else if (layer === 'temperature') {
    return data.temperature.risk
  } else {
    return data.humidity.risk
  }
}

export function getRiskStyles(risk: RiskLevel) {
  switch (risk) {
    case 'high':
      return {
        badge: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
        fill: '#ef4444',
        border: '#dc2626',
        label: 'High Risk',
      }
    case 'moderate':
      return {
        badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
        fill: '#f59e0b',
        border: '#d97706',
        label: 'Moderate Risk',
      }
    case 'low':
    default:
      return {
        badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
        fill: '#10b981',
        border: '#059669',
        label: 'Low Risk',
      }
  }
}

export function getLayerLegend(layer: MapWeatherLayer) {
  switch (layer) {
    case 'rainfall':
      return {
        layerName: 'Precipitation',
        unit: 'mm',
        low: '< 15 mm',
        lowDesc: 'Normal / Light Showers',
        moderate: '15 – 20 mm',
        moderateDesc: 'Moderate Field Moisture',
        high: '> 20 mm',
        highDesc: 'Heavy Rainfall Warning',
      }
    case 'temperature':
      return {
        layerName: 'Temperature',
        unit: '°C',
        low: '< 31.5 °C',
        lowDesc: 'Optimal Comfort Range',
        moderate: '31.5 – 33.0 °C',
        moderateDesc: 'Elevated Heat Load',
        high: '> 33.0 °C',
        highDesc: 'Thermal Stress Risk',
      }
    case 'humidity':
      return {
        layerName: 'Humidity',
        unit: '%',
        low: '< 72 %',
        lowDesc: 'Comfortable Moisture',
        moderate: '72 – 80 %',
        moderateDesc: 'Elevated Moisture',
        high: '> 80 %',
        highDesc: 'High Fungal Infection Risk',
      }
  }
}

export function getPanchayatFullForecast(panchayatId: string): FullPanchayatForecast {
  // If explicitly listed, return it
  if (panchayatWeatherProfiles[panchayatId]) {
    return panchayatWeatherProfiles[panchayatId]
  }

  // Generate realistic deterministic profile for any panchayat in any district
  const p = panchayats.find((item) => item.id === panchayatId)
  if (p) {
    const b = blocks.find((item) => item.id === p.blockId)
    const bProf = b ? blockWeatherProfiles[b.id] : null
    const baseTemp = bProf?.avgTemp ?? 32.5
    const baseRain = bProf?.avgRainfall ?? 16.0
    const baseHum = bProf?.avgHumidity ?? 70
    const baseWind = bProf?.avgWind ?? 10.5

    // Seeded variation by name
    const hash = p.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    const tempOffset = ((hash % 11) - 5) * 0.25
    const rainOffset = ((hash % 13) - 6) * 0.75
    const temp = Number((baseTemp + tempOffset).toFixed(1))
    const rain = Math.max(0, Number((baseRain + rainOffset).toFixed(1)))
    const humidity = Math.min(95, Math.max(45, baseHum + ((hash % 9) - 4)))
    const wind = Math.max(5, Number((baseWind + ((hash % 7) - 3) * 0.4).toFixed(1)))

    return {
      id: p.id,
      name: p.name,
      blockName: b?.name ?? 'Block',
      districtName: p.districtId.charAt(0).toUpperCase() + p.districtId.slice(1),
      date: '22 Sep 2026',
      rainfall: {
        value: rain,
        unit: 'mm',
        risk: rain > 20 ? 'high' : rain > 12 ? 'moderate' : 'low',
        probability: Math.min(95, Math.round(rain * 3.5 + 20)),
        intensityDesc: rain > 20 ? 'Heavy Showers' : rain > 12 ? 'Moderate Rain' : 'Light Showers',
      },
      temperature: {
        current: temp,
        min: Number((temp - 9.5).toFixed(1)),
        max: Number((temp + 2.2).toFixed(1)),
        feelsLike: Number((temp + 2.0).toFixed(1)),
        unit: '°C',
        risk: temp > 34 ? 'high' : temp > 31 ? 'moderate' : 'low',
        condition: rain > 18 ? 'Heavy Overcast' : rain > 8 ? 'Passing Clouds' : 'Partly Sunny',
      },
      humidity: {
        value: humidity,
        dewPoint: Number((temp - (100 - humidity) / 5).toFixed(1)),
        unit: '%',
        risk: humidity > 78 ? 'high' : 'moderate',
        condition: humidity > 74 ? 'High Humidity' : 'Optimal Moisture',
      },
      wind: {
        speed: wind,
        gusts: Number((wind * 1.5).toFixed(1)),
        direction: 'WSW (240°)',
        unit: 'km/h',
        condition: wind > 13 ? 'Moderate Breeze' : 'Gentle Breeze',
      },
      advisory: {
        title: `${p.name} Agromet Advisory`,
        action: bProf?.advisory ?? 'Safe for regular farming operations; check field bunds and drainage.',
        urgency: rain > 20 ? 'alert' : 'routine',
      },
      dailyForecast: [
        { day: 'Today', temp, rainfall: rain, condition: rain > 15 ? 'Rain' : 'Partly Cloudy' },
        { day: 'Wed', temp: temp - 0.4, rainfall: Math.max(0, rain - 3), condition: 'Scattered' },
        { day: 'Thu', temp: temp + 0.8, rainfall: Math.max(0, rain - 6), condition: 'Sunny' },
        { day: 'Fri', temp: temp - 1.0, rainfall: rain + 5, condition: 'Showers' },
        { day: 'Sat', temp, rainfall: Math.max(0, rain - 2), condition: 'Passing Rain' },
      ],
    }
  }

  return (panchayatWeatherProfiles['dubera'] ?? Object.values(panchayatWeatherProfiles)[0]) as FullPanchayatForecast
}

export function getLayerMetric(panchayatId: string, layer: MapWeatherLayer) {
  const p = getPanchayatFullForecast(panchayatId)
  if (layer === 'rainfall') {
    return {
      value: `${p.rainfall.value} ${p.rainfall.unit}`,
      num: p.rainfall.value,
      unit: p.rainfall.unit,
      label: 'Precipitation',
      status: p.rainfall.intensityDesc,
      risk: p.rainfall.risk,
    }
  } else if (layer === 'temperature') {
    return {
      value: `${p.temperature.current} ${p.temperature.unit}`,
      num: p.temperature.current,
      unit: p.temperature.unit,
      label: 'Temperature',
      status: p.temperature.condition,
      risk: p.temperature.risk,
    }
  } else {
    return {
      value: `${p.humidity.value} ${p.humidity.unit}`,
      num: p.humidity.value,
      unit: p.humidity.unit,
      label: 'Relative Humidity',
      status: p.humidity.condition,
      risk: p.humidity.risk,
    }
  }
}

export const forecast: Forecast[] = [
  { date: '22 Sep', rainfall: 12, maxTemp: 31, minTemp: 22, humidity: 78, wind: 11 },
  { date: '23 Sep', rainfall: 18, maxTemp: 30, minTemp: 21, humidity: 82, wind: 14 },
  { date: '24 Sep', rainfall: 7, maxTemp: 32, minTemp: 22, humidity: 74, wind: 10 },
  { date: '25 Sep', rainfall: 24, maxTemp: 29, minTemp: 21, humidity: 86, wind: 16 },
  { date: '26 Sep', rainfall: 10, maxTemp: 31, minTemp: 22, humidity: 79, wind: 12 },
  { date: '27 Sep', rainfall: 4, maxTemp: 33, minTemp: 23, humidity: 70, wind: 9 },
  { date: '28 Sep', rainfall: 15, maxTemp: 30, minTemp: 21, humidity: 81, wind: 13 },
]

export const historical = Array.from({ length: 12 }, (_, i) => ({
  month: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'][i],
  actual: 24 + Math.sin(i / 2) * 6,
  predicted: 23.5 + Math.sin(i / 2) * 5.6,
  rainfall: [68, 22, 8, 4, 7, 12, 18, 34, 146, 218, 201, 132][i],
}))

export const alerts: AlertItem[] = [
  {
    id: '1',
    type: 'Heavy Rainfall',
    panchayat: 'Mansar (Ramtek)',
    expected: 'Rainfall exceeds 28 mm in 24 hours',
    period: 'Sample forecast window',
    severity: 'Watch',
    status: 'Active Alert',
  },
  {
    id: '2',
    type: 'Extreme Heat & Orange Care',
    panchayat: 'Katol',
    expected: 'Daytime temperature approaching 34.5°C with high humidity',
    period: 'Sample forecast window',
    severity: 'Advisory',
    status: 'Active Advisory',
  },
  {
    id: '3',
    type: 'Heavy Runoff Alert',
    panchayat: 'Panchale',
    expected: 'Rainfall exceeds 20 mm in 24 hours',
    period: 'Sample forecast window',
    severity: 'Watch',
    status: 'Active Alert',
  },
  {
    id: '4',
    type: 'Soybean Pod Topsoil Saturation',
    panchayat: 'Sevagram (Wardha)',
    expected: 'Precipitation exceeding 19 mm; ensure field drain clearance',
    period: 'Sample forecast window',
    severity: 'Advisory',
    status: 'Active Advisory',
  },
]

export const variableLabels: Record<WeatherVariable, string> = {
  rainfall: 'Rainfall',
  maxTemp: 'Maximum Temperature',
  minTemp: 'Minimum Temperature',
  humidity: 'Relative Humidity',
  wind: 'Wind Speed',
}

export const valueFor = (p: Panchayat, v: WeatherVariable) => {
  const profile = getPanchayatFullForecast(p.id)
  if (profile) {
    if (v === 'rainfall') return profile.rainfall.value
    if (v === 'maxTemp') return profile.temperature.max
    if (v === 'minTemp') return profile.temperature.min
    if (v === 'humidity') return profile.humidity.value
    if (v === 'wind') return profile.wind.speed
  }
  const n = p.id.length
  return v === 'rainfall'
    ? 10 + n
    : v === 'maxTemp'
      ? 28 + n / 2
      : v === 'minTemp'
        ? 19 + n / 3
        : v === 'humidity'
          ? 68 + n
          : v === 'wind'
            ? 7 + n / 2
            : 0
}
