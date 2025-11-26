"use client"

import { Languages } from "lucide-react"
import { useTransition } from "react"

export function LanguageToggle() {
  const [isPending, startTransition] = useTransition()

  const toggleLanguage = () => {
    startTransition(() => {
      const currentLocale = document.cookie
        .split('; ')
        .find(row => row.startsWith('NEXT_LOCALE='))
        ?.split('=')[1] || 'es';

      const newLocale = currentLocale === 'es' ? 'en' : 'es';
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
      window.location.reload();
    })
  }

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
      aria-label="Toggle language"
    >
      <Languages className="h-5 w-5" />
    </button>
  )
}