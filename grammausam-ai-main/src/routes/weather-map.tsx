import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState, useEffect } from 'react'
import { meta } from '@/components/grammausam/common'

const WeatherMapCanvas = lazy(() =>
  import('@/components/grammausam/weather-map').then((m) => ({
    default: m.WeatherMapCanvas,
  }))
)

export const Route = createFileRoute('/weather-map')({
  head: () =>
    meta(
      'Panchayat Climate Studio · AI Spatial Downscaling',
      'Interactive AI spatial downscaling GIS canvas with fluid atmospheric streamlines, Panchayat micro-climate forecasting, and coarse vs. 1km comparison.'
    ),
  component: WeatherMapPage,
})

function WeatherMapPage() {
  // Only render the Leaflet map on the client to avoid SSR window-is-not-defined errors
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#e8eef5]">
      {isMounted ? (
        <Suspense
          fallback={
            <div className="flex h-screen w-screen items-center justify-center bg-[#e8eef5] text-slate-700">
              <div className="flex flex-col items-center gap-3">
                <div className="size-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Initializing VataVaran Climate Canvas...
                </p>
              </div>
            </div>
          }
        >
          <WeatherMapCanvas />
        </Suspense>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center bg-[#e8eef5] text-slate-700">
          <div className="flex flex-col items-center gap-3">
            <div className="size-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Initializing VataVaran Climate Canvas...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

