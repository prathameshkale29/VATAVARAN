import { alerts,blocks,districts,forecast,historical,panchayats } from '@/data/mock-weather'
// Replace this adapter with fetch(`${FASTAPI_BASE_URL}/api/...`) when the model API is ready.
const wait=<T,>(data:T)=>Promise.resolve(data)
export const weatherApi={getDistricts:()=>wait(districts),getBlocks:()=>wait(blocks),getPanchayats:()=>wait(panchayats),getForecast:()=>wait(forecast),getHistorical:()=>wait(historical),getAlerts:()=>wait(alerts)}
export const futureEndpoints=['GET /api/weather','GET /api/panchayats','GET /api/blocks','GET /api/forecast','GET /api/historical','GET /api/model-performance','GET /api/alerts','POST /api/prediction','POST /api/upload','POST /api/train']
