import { createI18n } from 'vue-i18n'
import en from '@/lang/en.json';
import es from '@/lang/es.json';

const messages = {
  en,
  es,
};

const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'es',
  messages,
});

export function getLocale() {
  return i18n.global.t('prime_ui');
}

export default i18n;
