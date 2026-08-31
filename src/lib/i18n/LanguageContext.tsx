'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useParams, useRouter, usePathname } from 'next/navigation'
import { translations, Locale, TranslationKey } from './translations'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()
  
  // Extract locale from params, fallback to 'id' if not found or invalid
  const paramLang = typeof params?.lang === 'string' ? params.lang : 'id'
  const locale: Locale = ['en', 'id', 'ms'].includes(paramLang) ? (paramLang as Locale) : 'id'

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return
    
    // Simpan preferensi bahasa ke cookie agar middleware ingat di kunjungan berikutnya
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`

    // Replace the current locale in the URL path with the new one
    const currentPath = pathname || `/${locale}`
    let newPath = currentPath
    
    if (currentPath.startsWith(`/${locale}`)) {
      newPath = currentPath.replace(`/${locale}`, `/${newLocale}`)
    } else {
      newPath = `/${newLocale}${currentPath}`
    }
    
    router.push(newPath)
  }

  const t = (key: TranslationKey): string => {
    return translations[locale]?.[key] ?? translations['en'][key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
