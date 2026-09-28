import React from 'react'
import { Globe, Check } from 'lucide-react'
import { useLanguage, type Language } from '@/lib/i18n'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface LanguageSwitcherProps {
  variant?: 'pill' | 'button' | 'compact' | 'drawer'
  className?: string
}

export function LanguageSwitcher({ variant = 'pill', className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage, toggleLanguage } = useLanguage()

  // 1. Sleek 3-Language Pill (मराठी | हिंदी | English)
  if (variant === 'pill') {
    return (
      <div
        className={`inline-flex items-center rounded-full border border-border/80 bg-background/80 p-0.5 shadow-xs backdrop-blur-md ${className}`}
        role="group"
        aria-label="Language Selector"
      >
        <button
          type="button"
          onClick={() => setLanguage('mr')}
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
            language === 'mr'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          title="मराठी निवडा"
        >
          मराठी
        </button>
        <button
          type="button"
          onClick={() => setLanguage('hi')}
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
            language === 'hi'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          title="हिंदी चुनें"
        >
          हिंदी
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          title="Switch to English"
        >
          English
        </button>
      </div>
    )
  }

  // 2. Compact single toggle button with Globe (for tight headers)
  if (variant === 'compact') {
    const nextLangTitle =
      language === 'mr'
        ? 'हिंदी किंवा इंग्रजी भाषा निवडा'
        : language === 'hi'
          ? 'अंग्रेजी या मराठी भाषा चुनें'
          : 'Switch to Marathi / Hindi'

    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/90 px-2.5 text-xs font-bold text-slate-200 shadow-md backdrop-blur-md transition-all hover:border-emerald-500 hover:text-white cursor-pointer active:scale-95 ${className}`}
        title={nextLangTitle}
        aria-label="Toggle language"
      >
        <Globe className="size-3.5 text-emerald-400" />
        <span>{language === 'mr' ? 'मराठी' : language === 'hi' ? 'हिंदी' : 'English'}</span>
      </button>
    )
  }

  // 3. Drawer option (for mobile menus or bottom sheets)
  if (variant === 'drawer') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Globe className="size-3.5 text-primary" />
          <span>
            {language === 'mr'
              ? 'भाषा निवडा (Language)'
              : language === 'hi'
                ? 'भाषा चुनें (Language)'
                : 'Select Language'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setLanguage('mr')}
            className={`flex items-center justify-between rounded-lg border p-2 text-xs font-semibold transition-all ${
              language === 'mr'
                ? 'border-emerald-600 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'border-border bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>मराठी</span>
            {language === 'mr' && <Check className="size-3.5 text-emerald-600" />}
          </button>
          <button
            type="button"
            onClick={() => setLanguage('hi')}
            className={`flex items-center justify-between rounded-lg border p-2 text-xs font-semibold transition-all ${
              language === 'hi'
                ? 'border-amber-600 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                : 'border-border bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>हिंदी</span>
            {language === 'hi' && <Check className="size-3.5 text-amber-600" />}
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`flex items-center justify-between rounded-lg border p-2 text-xs font-semibold transition-all ${
              language === 'en'
                ? 'border-primary bg-primary/10 text-primary font-bold'
                : 'border-border bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>English</span>
            {language === 'en' && <Check className="size-3.5 text-primary" />}
          </button>
        </div>
      </div>
    )
  }

  // 4. Dropdown variant
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`h-9 gap-1.5 font-semibold ${className}`}
          aria-label="Select language"
        >
          <Globe className="size-3.5 text-primary" />
          <span>
            {language === 'mr' ? 'मराठी' : language === 'hi' ? 'हिंदी' : 'English'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={() => setLanguage('mr')}
          className="flex items-center justify-between font-medium cursor-pointer"
        >
          <span>मराठी (Marathi)</span>
          {language === 'mr' && <Check className="size-4 text-emerald-600" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('hi')}
          className="flex items-center justify-between font-medium cursor-pointer"
        >
          <span>हिंदी (Hindi)</span>
          {language === 'hi' && <Check className="size-4 text-amber-600" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className="flex items-center justify-between font-medium cursor-pointer"
        >
          <span>English</span>
          {language === 'en' && <Check className="size-4 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * Floating language switcher for permanent, high-convenience access anywhere on the screen
 */
export function FloatingLanguageButton() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <aside
      className="fixed bottom-5 right-5 z-[9999] pointer-events-auto"
      aria-label="Language quick switcher"
    >
      <button
        type="button"
        onClick={toggleLanguage}
        className="group flex items-center gap-2 rounded-full border border-emerald-500/40 bg-slate-900/95 px-3.5 py-2 text-xs font-bold text-white shadow-2xl backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:border-emerald-400 hover:bg-slate-800 active:scale-95 cursor-pointer ring-2 ring-emerald-500/20"
        title={
          language === 'mr'
            ? 'हिंदी / इंग्रजीत बदलण्यासाठी दाबा'
            : language === 'hi'
              ? 'मराठी / अंग्रेजी में बदलने के लिए दबाएं'
              : 'Click to switch language (मराठी / हिंदी / English)'
        }
      >
        <Globe className="size-4 text-emerald-400 transition-transform duration-300 group-hover:rotate-45" />
        <span className="flex items-center gap-1 text-[11px]">
          <span className={language === 'mr' ? 'text-emerald-300 font-black' : 'text-slate-400'}>
            मराठी
          </span>
          <span className="text-slate-600">/</span>
          <span className={language === 'hi' ? 'text-amber-300 font-black' : 'text-slate-400'}>
            हिंदी
          </span>
          <span className="text-slate-600">/</span>
          <span className={language === 'en' ? 'text-sky-300 font-black' : 'text-slate-400'}>
            EN
          </span>
        </span>
      </button>
    </aside>
  )
}
