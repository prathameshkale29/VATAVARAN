import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, Map, X, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { VatavaranIcon } from '@/components/grammausam/vatavaran-logo'
import { useLanguage } from '@/lib/i18n'
import { LanguageSwitcher } from '@/components/grammausam/language-switcher'

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const path = useRouterState({ select: (s) => s.location.pathname })
  const isWeatherMap = path === '/weather-map'
  const { t, language } = useLanguage()

  const links = [
    ['/', t('nav.home', 'Home')],
    ['/weather-map', t('nav.weatherMap', 'Weather Map')],
    ['/crop-advisory', t('nav.cropAdvisory', 'Crop Advisory')],
    ['/forecast', t('nav.forecast', 'Forecast')],
    ['/ai-downscaling', t('nav.aiDownscaling', 'AI Downscaling')],
    ['/historical', t('nav.historical', 'Historical')],
    ['/methodology', t('nav.methodology', 'Methodology')],
    ['/alerts', t('nav.alerts', 'Alerts')],
  ] as const

  if (isWeatherMap) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-[#1e2124] text-white">
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1480px] items-center gap-4 sm:gap-6 px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2.5 font-bold text-foreground group">
            <VatavaranIcon size={36} className="transition-transform group-hover:scale-105" />
            <span className="text-xl font-bold tracking-tight">
              Vata<b className="text-primary font-bold">Varan</b>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
            {links.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  path === to
                    ? 'bg-accent text-accent-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Controls: Language Switcher, Explore Map, Dashboard, Mobile Hamburger */}
          <div className="ml-auto flex items-center gap-2">
            {/* Prominent Language Switcher */}
            <LanguageSwitcher variant="pill" className="hidden sm:inline-flex" />

            <Button asChild className="hidden md:inline-flex">
              <Link to="/weather-map">
                <Map />
                {t('nav.exploreMap', 'Explore Map')}
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hidden xl:inline-flex"
              aria-label="Model dashboard"
              title={t('nav.dashboard', 'Model Dashboard')}
            >
              <Link to="/dashboard">
                <LayoutDashboard />
              </Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation"
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Drawer */}
        {open && (
          <nav className="border-t bg-background px-4 py-4 xl:hidden space-y-3">
            {/* Language Switcher in Mobile Drawer */}
            <div className="pb-2 border-b">
              <LanguageSwitcher variant="drawer" />
            </div>

            <div className="space-y-1">
              {[...links, ['/dashboard', t('nav.dashboard', 'Model Dashboard')] as const].map(
                ([to, label]) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
                  >
                    {label}
                  </Link>
                )
              )}
            </div>

            <div className="pt-2">
              <Button asChild className="w-full">
                <Link to="/weather-map" onClick={() => setOpen(false)}>
                  <Map />
                  {t('nav.exploreMap', 'Explore Map')}
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </header>

      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-primary py-10 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <VatavaranIcon size={38} className="rounded-lg shadow-md ring-1 ring-white/20 mt-0.5" />
            <div>
              <p className="font-bold text-lg leading-tight">
                {language === 'mr' ? 'वातावरण (VataVaran)' : 'VataVaran'}
              </p>
              <p className="mt-1 text-sm opacity-80">
                {t(
                  'brand.subtitle',
                  'Panchayat-level climate intelligence · Demonstration platform'
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm opacity-90">
            <LanguageSwitcher variant="pill" className="bg-primary/40 border-white/20 text-white" />
            <Link to="/methodology" className="hover:underline">
              {t('common.methodologyFooter', 'Methodology')}
            </Link>
            <Link to="/dashboard" className="hover:underline">
              {t('common.modelDashboardFooter', 'Model dashboard')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
