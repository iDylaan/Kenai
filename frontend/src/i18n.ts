// src/i18n.ts
import { createI18n } from "vue-i18n";
import en from "@/lang/en.json";
import es from "@/lang/es.json";
import type { PrimeVueLocaleOptions } from '@/lang/types';

const messages = {
  en,
  es,
};

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
});

export function getLocale(): PrimeVueLocaleOptions {
  return (i18n.global.t('prime-ui') as unknown) as PrimeVueLocaleOptions;
}

export default i18n;
