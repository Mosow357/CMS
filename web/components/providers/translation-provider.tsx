"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import en from "@/i18n/en";
import es from "@/i18n/es";

type Locale = "es" | "en";

type Translations = Record<string, string>;

const all: Record<Locale, Translations> = {
  en,
  es,
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const match = document.cookie.match(/NEXT_LOCALE=(\w+)/);
    const current = (match?.[1] as Locale) || "es";
    setLocaleState(current);
  }, []);

  const setLocale = (l: Locale) => {
    document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000`;
    setLocaleState(l);
  };

  const value: I18nContextValue = {
    locale,
    setLocale,
    t: all[locale] || all.en,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within TranslationProvider");
  return ctx;
}

export default TranslationProvider;
